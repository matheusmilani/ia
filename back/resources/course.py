from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.course import Course

class CourseResource(Resource):
    def get(self):
        auth = require_roles(request.headers['Authorization'], ['student', 'instructor'])
        if auth is False:
            return {}, 401

        # Get all courses
        courses = Course.list()

        if courses is None:
            return {}, 400

        return list(map(lambda course: {
                'id': course.id,
                'name': course.name,
                'photo': course.icon_photo_url
            }, courses))


    def post(self):
        auth = require_roles(request.headers['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        data = request.get_json()
        name = data['name']
        description = data['description']
        user_id = data['user_id']
        theme_id = data['theme_id']
        photo = data['photo']
        hot_keys = data['hot_keys']

        if 'id' not in data:
            course = Course()
            course.name = name
            course.description = description
            course.responsible = User.get(user_id)
            course.theme = Theme.get(theme_id)
            course.icon_photo_url = photo
            course.hot_keys = hot_keys
            course.save()
            return {}, 200
        else:
            course = Course.get(data['id'])
            course.name = name
            course.description = description
            course.responsible = User.get(user_id)
            course.theme = Theme.get(theme_id)
            course.icon_photo_url = photo
            course.hot_keys = hot_keys
            course.save()
            return {}, 200

        return {}, 400
