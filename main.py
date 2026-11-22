from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

app = FastAPI(
  title="Choose your own Adventure game API",
  description="api to generate cool stories",
  version="0.1.0",
  docs_url="/docs",
  redoc_url="/redoc"
  )

# Allow certain url to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# To run it from this python file
if __name__ == "__main__":
  import uvicorn
  uvicorn.run("main:app", host="0.0.0", port=8000, reload=True)


 