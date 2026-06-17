
from fastapi import APIRouter
import socket

router = APIRouter(tags=["System"])

@router.get("/server-info")
def server_info():
    return {
        "status": "UP",
        "server": socket.gethostname()
    }