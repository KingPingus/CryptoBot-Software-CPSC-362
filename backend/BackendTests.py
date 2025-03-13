import pytest
from fastapi.testclient import TestClient
from api import app

test = TestClient(app)

def get_root_pg() :
    response = test.get("/")

    assert response.status_code == 200
    assert response.json() == {"System Message" : "Today's Market"}