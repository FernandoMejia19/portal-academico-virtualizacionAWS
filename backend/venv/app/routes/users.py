from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from backend.venv.app.dependencies import get_db
from backend.venv.app.models.user import User
from backend.venv.app.schemas.user import UserCreate
from backend.venv.app.schemas.user import UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    new_user = User(
        name=user.name,
        email=user.email
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user

@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return db.query(User).filter(
        User.id == user_id
    ).first()