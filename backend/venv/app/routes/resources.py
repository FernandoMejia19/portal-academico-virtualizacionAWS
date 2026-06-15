from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.resource import Resource

from app.schemas.resource import (
    ResourceCreate,
    ResourceResponse
)

router = APIRouter(
    prefix="/resources",
    tags=["Resources"]
)

@router.post("/", response_model=ResourceResponse)
def create_resource(
    resource: ResourceCreate,
    db: Session = Depends(get_db)
):

    new_resource = Resource(
        title=resource.title,
        description=resource.description,
        resource_type=resource.resource_type,
        url=resource.url,
        user_id=resource.user_id
    )

    db.add(new_resource)

    db.commit()

    db.refresh(new_resource)

    return new_resource

@router.get("/")
def get_resources(
    db: Session = Depends(get_db)
):

    resources = (
        db.query(Resource)
        .filter(Resource.is_active == True)
        .all()
    )

    result = []

    for resource in resources:
        result.append({
            "id": resource.id,
            "title": resource.title,
            "description": resource.description,
            "resource_type": resource.resource_type,
            "url": resource.url,
            "is_active": resource.is_active,
            "author": resource.user.name
        })

    return result
    
@router.get("/{resource_id}",
            response_model=ResourceResponse)
def get_resource(
    resource_id: int,
    db: Session = Depends(get_db)
):

    return (
        db.query(Resource)
        .filter(Resource.id == resource_id)
        .first()
    )
    
    
@router.delete("/{resource_id}")
def delete_resource(
    resource_id: int,
    db: Session = Depends(get_db)
):

    resource = (
        db.query(Resource)
        .filter(Resource.id == resource_id)
        .first()
    )

    if not resource:
        raise HTTPException(
            status_code=404,
            detail="Resource not found"
        )

    resource.is_active = False

    db.commit()

    return {
        "message": "Resource deactivated successfully"
    }