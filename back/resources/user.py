from flask import request, jsonify
from flask_jwt_simple import jwt_required, get_jwt
from flask_restful import Resource
from resources import require_roles
from models.user import User

class UserResource(Resource):
    def get(self):
        auth = require_roles(request.headers['Authorization'], ['student', 'instructor'])
        if auth == False:
            return {}, 401

        id = request.args['id']
        user = User.get(id)

        if user is None:
            return {}, 400

        return {
                'id': user.id,
                'name': user.name,
                'social_name': user.social_name,
                'email': user.email,
                'roles': user.roles,
        }



    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password'] if 'password' in data else ''
        role = data['role']
        name = data['name']
        social_name = data['social_name']

        if 'id' not in data:
            user = User()
            user.email = email
            user.name = name
            user.social_name = social_name
            user.password = password
            user.roles = [role]
            user.save()
            return {}, 200
        else:
            user = User.get(data['id'])
            user.email = email
            user.name = name
            user.social_name = social_name
            user.roles = [role]
            user.save()
            return {}, 200

        return {}, 400
