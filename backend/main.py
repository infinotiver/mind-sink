from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .models import SinkModel, SinkCreate, ItemCreate, ItemModel
from .crud import (
    create_board,
    get_boards,
    get_board,
    delete_board,
    create_item,
    get_items_by_board,
    get_items_by_user,
    get_all_items,
    delete_item,
    update_item,
    update_sink,
)
from .auth import *
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()


async def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    token = credentials.credentials
    user_id = verify_jwt(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user_id


app = FastAPI()
origins = [
    "http://127.0.0.1:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/sinks", response_model=SinkModel)
async def api_create_board(
    board: SinkCreate, user_id: str = Depends(get_current_user_id)
):
    try:
        created = await create_board(board, user_id)
        return created
    except Exception as e:

        raise HTTPException(status_code=400, detail=str(e))


@app.get("/sinks", response_model=List[SinkModel])
async def api_get_boards(user_id: str = Depends(get_current_user_id)):
    return await get_boards(user_id)


@app.get("/sinks/{board_id}", response_model=SinkModel)
async def api_get_board(board_id: str, user_id: str = Depends(get_current_user_id)):
    board = await get_board(board_id, user_id)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    return board


@app.delete("/sinks/{board_id}")
async def api_delete_board(board_id: str, user_id: str = Depends(get_current_user_id)):
    await delete_board(board_id, user_id)
    return {"message": "Board deleted"}




@app.get("/items/by-sink/{sink_id}", response_model=List[ItemModel])
async def api_get_items_by_sink(
    sink_id: str, user_id: str = Depends(get_current_user_id)
):
    return await get_items_by_board(sink_id, user_id)


@app.get("/items/by-user", response_model=List[ItemModel])
async def api_get_items_by_user(user_id: str = Depends(get_current_user_id)):
    return await get_items_by_user(user_id)


@app.get("/items", response_model=List[ItemModel])
async def api_get_all_items():
    return await get_all_items()

@app.get("/sinks/{board_id}/items", response_model=List[ItemModel])
async def api_get_items(board_id: str, user_id: str = Depends(get_current_user_id)):
    return await get_items_by_board(board_id, user_id)


@app.delete("/items/{item_id}")
async def api_delete_item(item_id: str, user_id: str = Depends(get_current_user_id)):
    await delete_item(item_id, user_id)
    return {"message": "Item deleted"}


@app.put("/items/{item_id}", response_model=ItemModel)
async def api_update_item(
    item_id: str, item: ItemCreate, user_id: str = Depends(get_current_user_id)
):
    try:
        updated_item = await update_item(item_id, item, user_id)
        if not updated_item:
            raise HTTPException(status_code=404, detail="Item not found")
        return updated_item
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.put("/sinks/{board_id}", response_model=SinkModel)
async def api_update_sink(
    board_id: str, board: SinkCreate, user_id: str = Depends(get_current_user_id)
):
    try:
        updated_board = await update_sink(board_id, board, user_id)
        if not updated_board:
            raise HTTPException(status_code=404, detail="Board not found")
        return updated_board
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


app.include_router(router)
