from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.user import User
from models.hot_key import HotKey

class UserResource(Resource):
    def get(self):
        auth = require_roles(request.headers['Authorization'], ['student', 'instructor'])
        if auth is False:
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
                'interests': list(map(lambda hot_key:{
                                    'value': hot_key.id,
                                    'label': hot_key.name
                                }, HotKey.list_by_ids(user.interests))),
                'minibio': user.minibio
        }



    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password'] if 'password' in data else ''
        role = data['role']
        name = data['name']
        social_name = data['social_name']
        minibio = data['minibio'] if 'minibio' in data else ''
        interests_ids = []

        if 'interests' in data:
            for interest in data['interests']:
                interests_ids.append(interest['value'])
        else:
            interests_ids = ['']

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
            user.interests = interests_ids
            user.minibio = minibio
            user.save()
            return {}, 200

        return {}, 400
