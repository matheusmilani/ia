from models import db
from models.user import User
from models.course import Course
from models.theme import Theme
from models.hot_key import HotKey
from models.module import Module
from models.lesson import Lesson

from sqlalchemy import create_engine


class Seed:
    @staticmethod
    def user_student():
        student = User.query.filter_by(email='student@student.com').first()

        if not HotKey.filter_by_name('ruby'):
            Seed.hot_keys_initial()

        if not student:
            student = User()
            student.email = 'student@student.com'
            student.name = 'Estudante'
            student.profile_photo_url = 'http://img.img.com'
            student.social_name = 'Estudante nome social'
            student.password = '1234'
            student.professional_contact = '12341234'
            student.personal_contact = '12341234'
            student.minibio = 'Fusce eu placerat odio. Aenean convallisetr'
            student.interests = [
                HotKey.filter_by_name('ruby').id,
                HotKey.filter_by_name('java').id]
            student.password = '1234'
            student.roles = ['student']
            student.save()

    def user_instructor():
        instructor = User.query.filter_by(
            email='instructor@instructor.com').first()

        if not HotKey.filter_by_name('python'):
            Seed.hot_keys_initial()

        if not instructor:
            instructor = User()
            instructor.email = 'instructor@instructor.com'
            instructor.name = 'Instrutor'
            instructor.profile_photo_url = 'http://img.img.com'
            instructor.social_name = 'Instrutor nome social'
            instructor.password = '1234'
            instructor.professional_contact = '12341234'
            instructor.personal_contact = '12341234'
            instructor.minibio = 'Fusce eu placerat odio. Aenean convallis'
            instructor.interests = [
                HotKey.filter_by_name('python').id,
                HotKey.filter_by_name('java').id]
            instructor.password = '1234'
            instructor.roles = ['instructor']
            instructor.save()

    def theme_initial():
        theme = Theme.query.filter_by(name='web').first()

        if not theme:
            theme = Theme()
            theme.name = 'web'
            theme.save()

    def hot_keys_initial():
        hot_key = HotKey.query.filter_by(name='python').first()

        if not hot_key:
            hot_key = HotKey()
            hot_key.name = 'python'
            hot_key.save()

        hot_key = HotKey.query.filter_by(name='ruby').first()

        if not hot_key:
            hot_key = HotKey()
            hot_key.name = 'ruby'
            hot_key.save()

        hot_key = HotKey.query.filter_by(name='java').first()

        if not hot_key:
            hot_key = HotKey()
            hot_key.name = 'java'
            hot_key.save()

    def course_initial():
        course = Course.query.filter_by(
            responsible=User.query.filter_by(
                email='instructor@instructor.com').first()).first()

        if not User.query.filter_by(email='instructor@instructor.com').first():
            Seed.user_instructor()

        if not Theme.filter_by_name('web'):
            Seed.theme_initial()

        if not HotKey.filter_by_name('python'):
            Seed.hot_keys_initial()

        if not course:
            course = Course()
            course.name = 'Curso 01'
            course.description = 'Fusce eu placerat odio. Aenean convallis'
            course.responsible = User.filter_by_role('instructor')[0]
            course.theme = Theme.filter_by_name('web')
            course.icon_photo_url = 'http://img.img.com'
            course.hot_keys = [HotKey.filter_by_name('python').id]
            course.save()

    def module_initial():
        module = Module.query.filter_by(name="Módulo 01").first()
        course = Course.query.filter_by(
            responsible=User.query.filter_by(
                email='instructor@instructor.com').first()).first()

        if not course:
            Seed.course_initial()

        if not module:
            module = Module()
            module.name = 'Módulo 01'
            module.description = 'Fusce eu placerat odio. Aenean convallis'
            module.required = True
            module.position = 1
            module.course = Course.query.filter_by(
                responsible=User.query.filter_by(
                    email='instructor@instructor.com').first()).first()
            module.save()

    def lesson_initial():
        module = Module.query.filter_by(name="Módulo 01").first()
        lesson = Lesson.query.filter_by(name="Aula 01").first()

        if not module:
            Seed.module_initial()

        if not lesson:
            lesson = Lesson()
            lesson.name = 'Aula 01'
            lesson.description = 'Fusce eu placerat odio. Aenean convallis'
            lesson.required = True
            lesson.position = 1
            lesson.module = Module.query.first()
            lesson.save()
