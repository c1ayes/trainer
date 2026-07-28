from pydantic import BaseModel, Field, field_validator, ConfigDict

class UserRegister(BaseModel):
    username:str = Field(min_length=3, max_length=20)
    password:str = Field(min_length=8)
    
    @field_validator('username')
    def validate_username(cls, value):
        return value.strip().lower()
    
class UserResponse(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)

class LoginSchema(BaseModel):
    username:str
    password:str
    @field_validator('username')
    def validate_username(cls, value):
        return value.strip().lower()