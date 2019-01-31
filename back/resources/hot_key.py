from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.hot_key import HotKey


class HotKeyResource(Resource):
    def get(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(
            request.headers['Authorization'], [
                'student', 'instructor'])
        if auth is False:
            return {}, 401

        if 'name' in request.args:
            hot_key = HotKey.filter_by_name(request.args['name'])

            if hot_key is None:
                return {}, 400

            return {
                'value': hot_key.id,
                'label': hot_key.name
            }
        else:
            # List all HotKeys
            hot_keys = HotKey.list()

            if hot_keys is None:
                return {}, 400

            return list(map(lambda hot_key: {
                'value': hot_key.id,
                'label': hot_key.name
            }, hot_keys))

    def post(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(
            request.headers['Authorization'], [
                'student', 'instructor'])
        if auth is False:
            return {}, 401

        data = request.get_json()
        name = data['name']

        if 'id' not in data:
            hot_key = HotKey()
            hot_key.name = name
            hot_key.save()
            return {}, 200
        else:
            hot_key = HotKey.get(data['id'])
            hot_key.name = name
            hot_key.save()
            return {}, 200

        return {}, 400
