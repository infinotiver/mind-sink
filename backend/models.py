from pydantic import (
    BaseModel,
    Field,
    field_validator,
    ConfigDict,
    ValidationInfo,
    GetCoreSchemaHandler,
)
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import CoreSchema
from typing import Optional, List, Any
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime

def validate_object_id(id_str: str):
    try:
        return ObjectId(id_str)
    except InvalidId:
        raise ValueError("Invalid ID format")


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v: Any, info: ValidationInfo) -> Any:
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type: Any, handler: GetCoreSchemaHandler
    ) -> CoreSchema:
        return JsonSchemaValue(type="str", format="objectid")


class SinkModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: Optional[str] = None
    user_id: str  # Discord user ID
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    visibility: Optional[str] = Field(default="private")  # public, private
    tags: Optional[List[str]] = []
    model_config = ConfigDict(validate_by_name=True)

    @field_validator("id", mode="before")
    def validate_object_id(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str):
            return v
        raise TypeError("Must be str or ObjectId")

    @field_validator("title")
    def title_must_not_be_empty(cls, v: Any, info: ValidationInfo) -> Any:
        if not v.strip():
            raise ValueError("title cannot be empty")
        return v

    @field_validator("visibility")
    def validate_visibility(cls, v: Any, info: ValidationInfo) -> Any:
        allowed_visibilities = {"private", "public"}
        if v not in allowed_visibilities:
            raise ValueError(f"visibility must be one of {allowed_visibilities}")
        return v


class ItemModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    sink_id: PyObjectId
    content: str
    type: str
    tags: Optional[List[str]] = []

    @field_validator("id", "sink_id", mode="before")
    def validate_object_id(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str):
            return v
        raise TypeError("Must be str or ObjectId")

    @field_validator("content")
    def content_must_not_be_empty(cls, v: Any, info: ValidationInfo) -> Any:
        if not v.strip():
            raise ValueError("content cannot be empty ")
        return v

    @field_validator("type")
    def type_must_be_valid(cls, v: Any, info: ValidationInfo) -> Any:
        allowed_types = {"link", "embed"}
        if v not in allowed_types:
            raise ValueError(f"type must be one of {allowed_types}")
        return v

    model_config = ConfigDict(json_encoders={ObjectId: str}, validate_by_name=True)


class SinkCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(None, max_length=300)
    visibility: Optional[str] = Field(default="private")
    tags: Optional[List[str]] = []

    @field_validator("title")
    def title_not_empty(cls, v: Any, info: ValidationInfo) -> Any:
        if not v.strip():
            raise ValueError("title cannot be empty or whitespace")
        return v


class ItemCreate(BaseModel):
    sink_id: str
    content: str = Field(..., min_length=1)
    type: str
    tags: Optional[List[str]] = []

    @field_validator("sink_id")
    def validate_sink_id(cls, v: Any, info: ValidationInfo) -> Any:
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid sink_id format")
        return v

    @field_validator("type")
    def type_must_be_valid(cls, v: Any, info: ValidationInfo) -> Any:
        allowed_types = {"link", "embed"}
        if v not in allowed_types:
            raise ValueError(f"type must be one of {allowed_types}")
        return v



class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    discord_id: str  # From OAuth2
    username: str
    avatar_url: Optional[str] = None
    email: str

    model_config = ConfigDict(populate_by_name=True, json_encoders={ObjectId: str})

    @field_validator("discord_id", "username")
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError("Field cannot be empty")
        return v

    @field_validator("email")
    def validate_email(cls, v):
        if v and "@" not in v:
            raise ValueError("Invalid email format")
        return v


class UserCreate(BaseModel):
    discord_id: str
    username: str
    avatar_url: Optional[str] = None
    email: str

    @field_validator("discord_id", "username")
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError("Field cannot be empty")
        return v
    
    @field_validator("email")     
    def validate_email(cls, v):
        if v and "@" not in v:
            raise ValueError("Invalid email format")
        return v

