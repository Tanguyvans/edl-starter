"""
TaskFlow Backend - FastAPI Task Management Service

A RESTful API for task management with TDD approach.

TP 1 & 2: Uses in-memory storage for simplicity
TP 3: Will introduce PostgreSQL database (see migration guide)
"""

from typing import List, Optional, Dict
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from enum import Enum
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("taskflow")


# =============================================================================
# ENUMS & MODELS
# =============================================================================

class TaskStatus(str, Enum):
    """Task status enum - simpler than SQLAlchemy version."""
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class TaskPriority(str, Enum):
    """Task priority enum - simpler than SQLAlchemy version."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class TaskCreate(BaseModel):
    """Model for creating a new task."""
    title: str = Field(..., min_length=1, max_length=200, description="Task title")
    description: Optional[str] = Field(None, max_length=1000, description="Task description")
    status: TaskStatus = Field(default=TaskStatus.TODO, description="Task status")
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM, description="Task priority")
    assignee: Optional[str] = Field(None, max_length=100, description="Assigned user")
    due_date: Optional[datetime] = Field(None, description="Due date")


class TaskUpdate(BaseModel):
    """Model for updating a task - all fields optional for partial updates."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    assignee: Optional[str] = Field(None, max_length=100)
    due_date: Optional[datetime] = None


class Task(TaskCreate):
    """Model for a task with ID and timestamps."""
    id: int  # Integer ID instead of UUID string - simpler!
    created_at: datetime
    updated_at: datetime


# =============================================================================
# IN-MEMORY STORAGE (for Atelier 1 & 2)
# =============================================================================

# Simple dictionary to store tasks
# In Atelier 3, this will be replaced with PostgreSQL database
tasks_db: Dict[int, Task] = {}
next_id = 1


def get_next_id() -> int:
    """Get next available task ID."""
    global next_id
    current_id = next_id
    next_id += 1
    return current_id


def clear_tasks():
    """Clear all tasks - useful for testing."""
    global tasks_db, next_id
    tasks_db = {}
    next_id = 1


# =============================================================================
# FASTAPI APP
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Runs once at startup (before yield) and once at shutdown (after yield)."""
    logger.info("🚀 TaskFlow backend starting up...")
    logger.info("Using in-memory storage (no database)")
    yield
    logger.info("🛑 TaskFlow backend shutting down...")


app = FastAPI(
    title="TaskFlow API",
    description="Simple task management API for learning unit testing and CI/CD",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)


# =============================================================================
# ENDPOINTS
# =============================================================================

@app.get("/")
async def root():
    """API root endpoint."""
    return {
        "message": "Welcome to TaskFlow API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    return {
        "status": "healthy",
        "tasks_count": len(tasks_db)
    }


@app.get("/tasks", response_model=List[Task])
async def get_tasks(
    status: Optional[TaskStatus] = None,
    priority: Optional[TaskPriority] = None,
    assignee: Optional[str] = None
) -> List[Task]:
    """
    Get all tasks with optional filtering.

    Query parameters:
    - status: Filter by task status (todo, in_progress, done)
    - priority: Filter by priority (low, medium, high)
    - assignee: Filter by assignee email
    """
    tasks = list(tasks_db.values())

    # Apply filters
    if status:
        tasks = [t for t in tasks if t.status == status]
    if priority:
        tasks = [t for t in tasks if t.priority == priority]
    if assignee:
        tasks = [t for t in tasks if t.assignee == assignee]

    return tasks


@app.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: int) -> Task:
    """Get a single task by ID."""
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found")
    return tasks_db[task_id]


@app.post("/tasks", response_model=Task, status_code=201)
async def create_task(task_data: TaskCreate) -> Task:
    """Create a new task."""
    # Validate title is not empty
    if not task_data.title or not task_data.title.strip():
        raise HTTPException(status_code=422, detail="Title cannot be empty")

    # Create new task with auto-generated ID
    task_id = get_next_id()
    now = datetime.now(timezone.utc)

    task = Task(
        id=task_id,
        title=task_data.title,
        description=task_data.description,
        status=task_data.status,
        priority=task_data.priority,
        assignee=task_data.assignee,
        due_date=task_data.due_date,
        created_at=now,
        updated_at=now
    )

    tasks_db[task_id] = task
    logger.info(f"Task created successfully: {task_id}")
    return task


@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, updates: TaskUpdate) -> Task:
    """
    Update an existing task (partial update supported).

    TODO (TP 1 - Exercice 2) : écrire cette fonction.

    Comportement attendu (voir les tests test_update_* dans tests/test_api.py) :
    - 404 si la tâche n'existe pas (même message que get_task) ;
    - seuls les champs envoyés par le client sont modifiés, les autres restent identiques ;
    - created_at ne change pas, updated_at prend la date actuelle ;
    - renvoie la tâche mise à jour.

    Indices :
    - create_task() montre comment construire une Task ;
    - updates.model_dump(exclude_unset=True) renvoie un dictionnaire contenant
      uniquement les champs envoyés, par exemple {"status": "done"}.
    """
    # TODO: Votre code ici
    raise HTTPException(status_code=501, detail="Update not implemented yet - complete this function!")


@app.delete("/tasks/{task_id}", status_code=204)
async def delete_task(task_id: int):
    """
    Delete a task by ID.

    TODO (TP 1 - Exercice 1) : écrire cette fonction.

    Comportement attendu (voir test_delete_task et test_delete_nonexistent_task) :
    - 404 si la tâche n'existe pas (même message que get_task) ;
    - sinon, la tâche est retirée de tasks_db et la réponse est vide (204).

    Indice : get_task() vérifie déjà si une tâche existe.
    """
    # TODO: Votre code ici
    raise HTTPException(status_code=501, detail="Delete not implemented yet - complete this function!")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)