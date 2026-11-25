#Sqlalchemy makes it so that we dont have to write sql queries. It can be done using python operations

from sqlalchemy import Column, Integer, String, DateTime, Boolean,ForeignKey,JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base


class Story(Base):
  __tablename__="stories"
  #Every story needs to be unique identifier. Columns is piece of data we will store for any individual story
  id= Column(Integer, primary_key=True, index=True)
  title= Column(String,index=True)
  session_id = Column(String, index=True)
  created_at= Column(DateTime(timezone=True),server_default=func.now()) #func.now tells what the current time is.
  nodes= relationship("StoryNode",back_populates="story") #When we want to have relationship between different pieces of data, we create this relationship. It can be 1-1 or one to many or many to many. for this we will have one to many

#Option or the path of the story
class StoryNode(Base):
  __tablename__="story_nodes"
  id = Column(Integer, primary_key=True, index=True)
  story_id = Column(Integer, ForeignKey("stories.id"), index=True) #stores the id of the story= use of foreign key
  content = Column(String)
  is_root = Column(Boolean, default= False)# to know if this is the first node
  is_ending = Column(Boolean, default=False)# to know if this is the ending node
  is_winning_ending= Column(Boolean, default=False)
  options = Column(JSON, default=list)

  story =relationship("Story", back_populates="nodes") #relationships between story and storynode using back_populates

  
