from urllib.request import urlopen
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from . import create_test_app, app, client
import pytest
import json

@pytest.fixture(scope="session", autouse=True)
def before_all():
    create_test_app()

class TestEndpoint:
    def test_home_endpoint(self, client):
        res = client.get('/')

        assert res.status_code == 200


    def test_non_exists_endpoint(self, client):
        res = client.get('/usernonblah')

        assert res.status_code == 404

    def test_endpoint_without_authorization(self, client):
        res = client.get('/api/user')

        assert res.status_code == 401


class TestStudentEndpoint:
    def test_authentication_as_student(self, client):
        auth = client.post('/api/authentication', json={'username': 'student@student.com' ,'password':'1234'})
        access_decode = json.loads(auth.data.decode())

        assert access_decode['id'] == 1
        assert access_decode['roles'] == ['student']
        assert access_decode['name'] == 'Estudante'


    def test_user_endpoint_with_authorization_as_student(self, client):
        auth = client.post('/api/authentication', json={'username': 'student@student.com' ,'password':'1234'})
        access_decode = json.loads(auth.data.decode())
        res = client.get('/api/user?id=1', headers={'Authorization': access_decode['access_token']})

        assert res.status_code == 200


class TestInstructorEndpoint:
    def test_user_endpoint_with_authorization_as_instructor(self, client):
        auth = client.post('/api/authentication', json={'username': 'instructor@instructor.com' ,'password':'1234'})
        access_decode = json.loads(auth.data.decode())
        res = client.get('/api/user?id=2', headers={'Authorization': access_decode['access_token']})

        assert res.status_code == 200

    def test_authentication_as_instructor(self, client):
        auth = client.post('/api/authentication', json={'username': 'instructor@instructor.com' ,'password':'1234'})
        access_decode = json.loads(auth.data.decode())

        assert access_decode['id'] == 2
        assert access_decode['roles'] == ['instructor']
        assert access_decode['name'] == 'Instrutor'
