from flask import request
from flask_jwt_simple import create_jwt
from flask_restful import Resource
from models.user import User

class UserResource(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        role = data['role']
        name = data['name']
        social_name = data['social_name']
        
        new_user = User()
        new_user.email = email
        new_user.name = name
        new_user.social_name = social_name
        new_user.password = password
        new_user.roles = [role]

        if new_user.save():
            return 200
        else:
            return 400
