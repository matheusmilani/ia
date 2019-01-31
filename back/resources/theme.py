from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.theme import Theme


class ThemeResource(Resource):
    def get(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(
            request.headers['Authorization'], [
                'student', 'instructor'])
        if auth is False:
            return {}, 401

        if 'name' in request.args:
            theme = Theme.filter_by_name(request.args['name'])

            if theme is None:
                return {}, 400

            return {
                'value': theme.id,
                'label': theme.name
            }
        else:
            # List all Themes
            themes = Theme.list()

            if themes is None:
                return {}, 400

            return list(map(lambda theme: {
                'value': theme.id,
                'label': theme.name
            }, themes))

    def post(self):
        auth = require_roles(request.headers['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        data = request.get_json()
        name = data['name']

        if 'id' not in data:
            theme = Theme()
            theme.name = name
            theme.save()
            return {}, 200
        else:
            theme = Theme.get(data['id'])
            theme.name = name
            theme.save()
            return {}, 200

        return {}, 400
