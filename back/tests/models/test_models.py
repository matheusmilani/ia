import pytest
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from . import create_test_app
from . import db

from models.user import User
from models.theme import Theme
from models.module import Module
from models.lesson import Lesson
from models.hot_key import HotKey
from models.course import Course


@pytest.fixture(scope="session", autouse=True)
def before_all():
    create_test_app()


class TestUser:
    def test_get_user(self):
        student = User.get('1')
        assert student.email == 'student@student.com'
        assert student.name == 'Estudante'
        assert student.social_name == 'Estudante nome social'
        assert student.roles == ['student']

        instructor = User.get('2')
        assert instructor.email == 'instructor@instructor.com'
        assert student.profile_photo_url == 'http://img.img.com'
        assert instructor.name == 'Instrutor'
        assert instructor.roles == ['instructor']

    def test_list_user(self):
        users = User.list()
        assert len(users) == 2

    def test_find_user_by_email(self):
        instructor = User.filter_by_email('instructor@instructor.com')
        assert instructor.email == 'instructor@instructor.com'
        assert instructor.name == 'Instrutor'
        assert instructor.roles == ['instructor']

        student = User.filter_by_email('student@student.com')
        assert student.email == 'student@student.com'
        assert student.name == 'Estudante'
        assert student.roles == ['student']

    def test_find_user_by_name(self):
        instructor = User.filter_by_name('Instrutor')
        assert instructor.email == 'instructor@instructor.com'
        assert instructor.name == 'Instrutor'
        assert instructor.roles == ['instructor']

        student = User.filter_by_name('Estudante')
        assert student.email == 'student@student.com'
        assert student.name == 'Estudante'
        assert student.roles == ['student']

    def test_find_user_by_role(self):
        instructor = User.filter_by_role('instructor')
        assert instructor[0].email == 'instructor@instructor.com'
        assert instructor[0].name == 'Instrutor'
        assert instructor[0].roles == ['instructor']

        student = User.filter_by_role('student')
        assert student[0].email == 'student@student.com'
        assert student[0].name == 'Estudante'
        assert student[0].roles == ['student']

    def test_save_user(self):
        count_user = User.query.count()

        new_user = User()
        new_user.email = 'new_user@new_user.com'
        new_user.name = 'New User'
        new_user.password = '1234'
        new_user.roles = ['student']
        new_user.save()

        new_user_find = User.filter_by_email('new_user@new_user.com')

        assert User.query.count() == (count_user + 1)
        assert new_user_find.email == 'new_user@new_user.com'
        assert new_user_find.name == 'New User'
        assert new_user_find.roles == ['student']

    def test_authenticate_correct_user(self):
        authenticate = User.authenticate('student@student.com', '1234')
        assert authenticate == User.query.filter_by(
            email='student@student.com').first()

        authenticate = User.authenticate('instructor@instructor.com', '1234')
        assert authenticate == User.query.filter_by(
            email='instructor@instructor.com').first()

    def test_no_authenticate_wrong_user(self):
        authenticate = User.authenticate('wrong_user@wrong_user.com', '1234')
        assert authenticate is None

    def test_no_authenticate_wrong_password(self):
        authenticate = User.authenticate('new_user@new_user.com', 'wrong-pass')
        assert authenticate is None


class TestTheme:
    def test_get_theme(self):
        theme = Theme.get('1')
        assert theme.name == 'web'

    def test_list_theme(self):
        theme = Theme.list()
        assert len(theme) == 1

    def test_filter_by_name_theme_camelcase(self):
        theme = Theme.filter_by_name('Web')
        assert theme.name == 'web'

    def test_filter_by_name_theme_lowercase(self):
        theme = Theme.filter_by_name('web')
        assert theme.name == 'web'

    def test_filter_by_name_theme_uppercase(self):
        theme = Theme.filter_by_name('WEB')
        assert theme.name == 'web'

    def test_filter_by_name_theme_does_not_exists(self):
        theme = Theme.filter_by_name('Not exists')
        assert theme is None

    def test_filter_by_name_theme(self):
        count_initial = len(Theme.list())

        theme = Theme()
        theme.name = "New Theme"
        theme.save()

        assert len(Theme.list()) == (count_initial + 1)
        assert Theme.filter_by_name('new theme').name == "new theme"


class TestHotKey:
    def test_get_hot_key(self):
        hot_key = HotKey.get('1')
        assert hot_key.name == 'python'

    def test_list_hot_key(self):
        hot_key = HotKey.list()
        assert len(hot_key) == 3

    def test_list_by_ids_hot_key(self):
        hot_key = HotKey.list_by_ids([1])
        assert len(hot_key) == 1

    def test_list_by_ids_hot_key(self):
        hot_key = HotKey.list_by_ids([1, 2])
        assert len(hot_key) == 2

    def test_list_by_ids_hot_key(self):
        hot_key = HotKey.list_by_ids([1, 2, 3])
        assert len(hot_key) == 3

    def test_filter_by_name_hot_key_camelcase(self):
        hot_key = HotKey.filter_by_name('Python')
        assert hot_key.name == 'python'

    def test_filter_by_name_hot_key_lowercase(self):
        hot_key = HotKey.filter_by_name('python')
        assert hot_key.name == 'python'

    def test_filter_by_name_hot_key_uppercase(self):
        hot_key = HotKey.filter_by_name('PYTHON')
        assert hot_key.name == 'python'

    def test_filter_by_name_hot_key_does_not_exists(self):
        hot_key = HotKey.filter_by_name('Not exists')
        assert hot_key is None

    def test_filter_by_name_hot_key(self):
        count_initial = len(HotKey.list())

        hot_key = HotKey()
        hot_key.name = "New HotKey"
        hot_key.save()

        assert len(HotKey.list()) == (count_initial + 1)
        assert HotKey.filter_by_name('new hotkey').name == "new hotkey"


class TestCourse:
    def test_get_course(self):
        course = Course.get('1')
        assert course.name == 'Curso 01'

    def test_list_course(self):
        course = Course.list()
        assert len(course) == 1

    def test_save_course(self):
        initial_count = len(Course.list())

        course = Course()
        course.name = 'Curso 02'
        course.description = 'Fusce eu placerat odio.'
        course.responsible = User.filter_by_role('instructor')[0]
        course.theme = Theme.filter_by_name('web')
        course.icon_photo_url = 'http://img.img.com'
        course.hot_keys = [
            'python',
            'web',
            'desenvolvimento',
            '01',
            'mais',
            'outro',
            'hot_key']
        course.save()

        assert len(Course.list()) == (initial_count + 1)

    def test_filter_by_name(self):
        course = Course.filter_by_name('Curso 02')
        assert len(course) == 1

    def test_filter_by_responsible_course(self):
        course = Course.filter_by_responsible(
            User.filter_by_role('instructor')[0])
        assert len(course) == 2

    def test_filter_by_responsible_course(self):
        course = Course.filter_by_responsible(
            User.filter_by_role('student')[0])
        assert len(course) == 0

    def test_filter_by_theme(self):
        course = Course.filter_by_theme(Theme.filter_by_name('web'))
        assert len(course) == 2

    def test_filter_by_theme(self):
        theme = Theme()
        theme.name = "test"
        theme.save()

        course = Course.filter_by_theme(Theme.filter_by_name('test'))
        assert len(course) == 0

    def test_filter_by_hot_keys(self):
        course = Course.filter_by_hot_keys('python')
        assert len(course) == 2

    def test_filter_by_hot_keys(self):
        course = Course.filter_by_hot_keys('outro')
        assert len(course) == 1

    def test_filter_by_hot_keys(self):
        course = Course.filter_by_hot_keys('blergh')
        assert len(course) == 0


class TestLesson:
    def test_save_lesson(self):
        initial_count = len(Lesson.list_by_module(1))

        lesson = Lesson()
        lesson.name = 'Lesson 02'
        lesson.description = 'Fusce eu placerat odio.'
        lesson.position = 1
        lesson.id_module = 1
        lesson.save()

        assert len(Lesson.list_by_module(1)) == (initial_count + 1)

    def test_get_lesson(self):
        lesson = Lesson.get('1')
        assert lesson.name == 'aula 01'

    def test_list_lessons_by_module(self):
        lesson = Lesson.list_by_module(1)
        assert len(lesson) == 3

    def test_delete_module(self):
        initial_count = len(Lesson.list_by_module(1))

        Lesson.delete(1)

        assert len(Lesson.list_by_module(1)) == (initial_count - 1)


class TestModule:
    def test_get_module(self):
        module = Module.get('1')
        assert module.name == 'módulo 01'

    def test_list_modules_by_course(self):
        module = Module.list_by_course(1)
        assert len(module) == 1

    def test_list_modules_by_course(self):
        module = Module.filter_by_name_inside_course('Módulo 01', 1)
        assert module is not None
        assert module.name == 'módulo 01'

        module = Module.filter_by_name_inside_course('Módulo Não existe', 1)
        assert module is None

    def test_save_module(self):
        initial_count = len(Module.list_by_course(1))

        module = Module()
        module.name = 'Módulo 02'
        module.description = 'Fusce eu placerat odio.'
        module.position = 1
        module.id_course = 1
        module.save()

        assert len(Module.list_by_course(1)) == (initial_count + 1)

    def test_delete_module(self):
        initial_count = len(Module.list_by_course(1))

        Module.delete(1)

        assert len(Module.list_by_course(1)) == (initial_count - 1)
