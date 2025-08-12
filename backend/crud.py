from .database import boards_collection, items_collection
from .models import SinkModel, SinkCreate, ItemCreate, ItemModel
from bson import ObjectId
from typing import List
from textblob import TextBlob


async def create_board(board_data: SinkCreate, user_id: str) -> dict:
    board_dict = board_data.model_dump()
    board_dict["user_id"] = user_id  # tie board to user

    result = await boards_collection.insert_one(board_dict)
    created_board = await boards_collection.find_one({"_id": result.inserted_id})

    if created_board:
        created_board["id"] = str(created_board["_id"])
        del created_board["_id"]

    return SinkModel(**created_board)


async def get_boards(user_id: str) -> List[SinkModel]:
    boards = []
    async for board in boards_collection.find({"user_id": user_id}):
        boards.append(SinkModel(**board))
    return boards


async def get_board(sink_id: str, user_id: str) -> SinkModel:
    board = await boards_collection.find_one(
        {"_id": ObjectId(sink_id), "user_id": user_id}
    )
    if board:
        return SinkModel(**board)


async def delete_items_by_board(sink_id: str):
    await items_collection.delete_many({"sink_id": ObjectId(sink_id)})


async def delete_board(sink_id: str, user_id: str):
    # Delete all items associated with the board
    await delete_items_by_board(sink_id)
    # Delete the board itself
    await boards_collection.delete_one({"_id": ObjectId(sink_id), "user_id": user_id})


async def create_item(item: ItemCreate, user_id: str) -> ItemModel:
    item_doc = item.model_dump()
    item_sink_id = item_doc["sink_id"]
    validation = check_sink_belongs_to_user(item_sink_id, user_id)
    if validation:
        # Generate tags for text content
        tags = []

        def generate_tags(content: str, item_type: str) -> List[str]:
            tags = []
            if item_type == "text":
                print(f"Generating tags for text content: {content}")
                blob = TextBlob(content)
                tags = list(set(blob.noun_phrases))
                print(f"Generated tags: {tags}")
            return tags

        tags = generate_tags(item.content, item.type)

        item_doc["sink_id"] = ObjectId(item.sink_id)
        item_doc["tags"] = tags
        result = await items_collection.insert_one(item_doc)
        created = await items_collection.find_one({"_id": result.inserted_id})
        return ItemModel(**created)
    else:
        raise ValueError("Sink does not belong to the user.")


async def get_items_by_board(sink_id: str, user_id: str) -> List[ItemModel]:
    items = []
    async for item in items_collection.find(
        {"sink_id": ObjectId(sink_id), "user_id": user_id}
    ):
        items.append(ItemModel(**item))
    return items


async def delete_item(item_id: str, user_id: str):
    await items_collection.delete_one({"_id": ObjectId(item_id), "user_id": user_id})


async def check_sink_belongs_to_user(sink_id: str, user_id: str) -> bool:
    sink = await boards_collection.find_one(
        {"_id": ObjectId(sink_id), "user_id": user_id}
    )
    return sink is not None


async def update_sink(sink_id: str, user_id: str, update_data: dict) -> SinkModel:
    # Ensure the sink belongs to the user
    if not await check_sink_belongs_to_user(sink_id, user_id):
        raise ValueError("Sink does not belong to the user.")

    # Update the sink
    result = await boards_collection.update_one(
        {"_id": ObjectId(sink_id), "user_id": user_id}, {"$set": update_data}
    )

    if result.modified_count == 0:
        raise ValueError("Failed to update the sink.")

    updated_sink = await boards_collection.find_one(
        {"_id": ObjectId(sink_id), "user_id": user_id}
    )
    return SinkModel(**updated_sink)


async def update_item(item_id: str, user_id: str, update_data: dict) -> ItemModel:
    # Ensure the item belongs to the user
    item = await items_collection.find_one(
        {"_id": ObjectId(item_id), "user_id": user_id}
    )
    if not item:
        raise ValueError("Item does not belong to the user.")

    # Update the item
    result = await items_collection.update_one(
        {"_id": ObjectId(item_id), "user_id": user_id}, {"$set": update_data}
    )

    if result.modified_count == 0:
        raise ValueError("Failed to update the item.")

    updated_item = await items_collection.find_one(
        {"_id": ObjectId(item_id), "user_id": user_id}
    )
    return ItemModel(**updated_item)
