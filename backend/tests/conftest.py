import logging

import pytest
from fastapi.testclient import TestClient
from src.app import app, clear_tasks

# N'affiche pas chaque requête HTTP du client de test sous les tests en échec
logging.getLogger("httpx2").setLevel(logging.WARNING)


@pytest.fixture(autouse=True)
def clean_tasks():
    """
    Vide les tâches avant et après chaque test.
    Ainsi, les tests ne se gênent pas entre eux.
    """
    clear_tasks()
    yield
    clear_tasks()


@pytest.fixture
def client():
    """
    Fournit un client HTTP de test pour appeler l'API.

    Utilisation dans un test :
        def test_quelque_chose(client):
            response = client.get("/tasks")
            assert response.status_code == 200
    """
    with TestClient(app) as test_client:
        yield test_client


def pytest_configure(config):
    """Enregistre les markers personnalisés"""
    config.addinivalue_line(
        "markers",
        "e2e: mark test as end-to-end test (slow)"
    )
