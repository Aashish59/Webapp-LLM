from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base #Baseclass that all data models need to inherit from so we know which database model we have in our database

from core.config import settings

engine = create_engine(
  settings.DATABASE_URL
)

#Binding session to the engine
SessionLocal= sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base= declarative_base()

#gives access to database session and ensure that we dont have multiple session are open at once
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


def create_tables():
  Base.metadata.createall(binds=engine)


