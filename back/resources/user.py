from flask import request, jsonify
from flask_jwt_simple import jwt_required, get_jwt
from flask_restful import Resource
from models.user import User

class UserResource(Resource):
    # @jwt_required
    def get(self):
        id = request.args['id']
        user = User.get(id)

        if user is None:
            return 404

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
        password = data['password']
        role = data['role']
        name = data['name']
        social_name = data['social_name']

        if 'id' not in data:
            new_user = User()
            new_user.email = email
            new_user.name = name
            new_user.social_name = social_name
            new_user.password = password
            new_user.roles = [role]
        else:
            new_user = User.get(data['id'])
            new_user.email = email
            new_user.name = name
            new_user.social_name = social_name
            new_user.roles = [role]

        if new_user.save():
            return 200
        else:
            return 400
