from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.course import Course
from models.module import Module


class ModuleResource(Resource):
    def get(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(
            request.headers['Authorization'], [
                'student', 'instructor'])
        if auth is False:
            return {}, 401

        id_course = request.args['course']

        # Get all modules by module
        modules = Module.list_by_course(id_course)

        if modules is None:
            return {}, 400

        return list(map(lambda module: {
            'id': module.id,
            'name': module.name,
            'description': module.description,
            'required': module.required,
            'position': module.position
        }, modules))

    def post(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(request.headers['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        data = request.get_json()
        name = data['name']
        description = data['description']
        course_id = data['course_id']
        required = data['required']
        position = data['position']

        if 'id' not in data:
            module = Module()
            module.name = name
            module.description = description
            module.course = Course.get(course_id)
            module.position = position
            module.required = required
            module.save()
            return {}, 200
        else:
            module = Module.get(data['id'])
            module.name = name
            module.description = description
            module.course = Course.get(course_id)
            module.position = position
            module.required = required
            module.save()
            return {}, 200

        return {}, 400

    def delete(self):
        data = request.get_json()
        if 'Authorization' not in data['headers']:
            return {}, 401
        auth = require_roles(data['headers']['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        if 'id' in data:
            Module.delete(data['id'])
            return {}, 200
        else:
            return {}, 400

        return {}, 400
