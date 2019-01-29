from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.module import Module
from models.lesson import Lesson

class LessonResource(Resource):
    def get(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(request.headers['Authorization'], ['student', 'instructor'])
        if auth is False:
            return {}, 401

        id_module = request.args['module']

        # Get all lessons by module
        lessons = Lesson.list_by_module(id_module)

        if lessons is None:
            return {}, 400

        return list(map(lambda lesson: {
                'id': lesson.id,
                'name': lesson.name,
                'description': lesson.description,
                'module_name': lesson.module.name,
                'module_id': lesson.module.id,
                'required': lesson.required,
                'position': lesson.position
            }, lessons))


    def post(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(request.headers['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        data = request.get_json()
        name = data['name']
        description = data['description']
        module_id = data['module_id']
        required = data['required']
        position = data['position']

        if 'id' not in data:
            lesson = Lesson()
            lesson.name = name
            lesson.description = description
            lesson.module = Module.get(module_id)
            lesson.position = position
            lesson.required = required
            lesson.save()
            return {}, 200
        else:
            lesson = Lesson.get(data['id'])
            lesson.name = name
            lesson.description = description
            lesson.module = Module.get(module_id)
            lesson.position = position
            lesson.required = required
            lesson.save()
            return {}, 200

        return {}, 400

    def delete(self):
        data = request.get_json()

        auth = require_roles(data['headers']['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        if 'id' in data:
            Lesson.delete(data['id'])
            return {}, 200
        else:
            return {}, 400

        return {}, 400
