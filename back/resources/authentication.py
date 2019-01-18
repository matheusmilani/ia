from flask import request
from flask_jwt_simple import create_jwt
from flask_restful import Resource
from models.user import User

class AuthenticationResource(Resource):
    def post(self):
        data = request.get_json()
        email = data['username']
        password = data['password']

        if email == '':
            return 'Empty username', 401

        if password == '':
            return 'Empty password', 401

        user = User.authenticate(email, password)
        
        if user is not None:
            access_token = create_jwt({
                'id_user': user.id,
                'email': user.email,
                'name': user.name,
                'roles': user.roles
            })

            return {
                'id': user.id,
                'name': user.name,
                'access_token': access_token,
                'roles': user.roles
            }
        else:
            return {'message': 'Invalid credentials'}, 401
