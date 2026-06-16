from pydantic import BaseModel


class ResourceCreate(BaseModel):
    title: str
    description: str
    resource_type: str
    url: str
    user_id: int


class ResourceResponse(BaseModel):
    id: int
    title: str
    description: str
    resource_type: str
    url: str
    is_active: bool
    user_id: int

    class Config:
        from_attributes = True
        
class ResourceWithAuthor(BaseModel):
    id: int
    title: str
    description: str
    resource_type: str
    url: str
    is_active: bool

    author: str