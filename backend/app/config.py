from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://personalos:personalos_dev@localhost:5432/personalos"
    app_name: str = "Personal OS API"
    debug: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
