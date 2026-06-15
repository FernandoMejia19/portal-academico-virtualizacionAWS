from fastapi import FastAPI

from backend.venv.app.routes.users import router as users_router
from backend.venv.app.routes.resources import (
    router as resources_router
)

app = FastAPI()

app.include_router(users_router)
app.include_router(resources_router)

@app.get("/")
def root():
    return {
        "message": "Academic Media API"
    }
