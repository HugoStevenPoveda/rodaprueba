import os
from dotenv import load_dotenv
from pydantic import BaseModel
from urllib.parse import quote

load_dotenv()

##varaibles para definir url a bd
user = "developer"
password = quote('5Om"Q3D0U:DXH[q@')  # codifica caracteres especiales
host = "35.196.20.95"
port = "5432"
db = "roda-db"
#db_url = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db}"
db_url = f"postgresql://{user}:{password}@{host}:{port}/{db}"

print("DATABSE ", db_url)
class Settings(BaseModel):
    DATABASE_URL: str = os.getenv("DATABASE_URL", db_url )
    # Otros settings de la aplicación pueden ir aquí

settings = Settings()