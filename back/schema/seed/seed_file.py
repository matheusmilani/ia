from models import db
from models.user import User
from models.course import Course
from models.theme import Theme

from sqlalchemy import create_engine

class Seed:
    @staticmethod
    def user_student():
        student = User.query.filter_by(email='student@student.com').first()

        if not student:
            student = User()
            student.email = 'student@student.com'
            student.name = 'Estudante'
            student.profile_photo_url = 'http://img.img.com'
            student.social_name = 'Estudante nome social'
            student.password = '1234'
            student.professional_contact = '12341234'
            student.personal_contact = '12341234'
            student.minibio = 'Fusce eu placerat odio. Aenean convallis pharetra arcu et finibus. Aliquam tempor, enim vel pellentesque efficitur, nunc risus lobortis magna, quis laoreet justo neque a ante. Fusce egestas urna non tincidunt auctor. Curabitur id lobortis tellus. Sed a nisi sed nulla tincidunt sollicitudin eu sit amet eros. Duis eu ex ex. Donec a ullamcorper justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eleifend libero nisi, vitae vulputate nulla condimentum vitae. Aliquam erat volutpat. Pellentesque orci enim, semper vitae sagittis ut, facilisis at elit. Sed in volutpat dolor. Aenean sodales sem et magna tincidunt efficitur. Praesent justo lorem, dignissim quis tellus in, accumsan tempor risus.'
            student.interests = [{"label": 'TI', "value": 'TI'},{"label": 'Web', "value": 'Web'},{"label": 'Bla', "value": 'Bla'},{"label": 'Ok', "value": 'Ok'}]
            student.password = '1234'
            student.roles = ['student']
            student.save()

    def user_instructor():
        instructor = User.query.filter_by(email='instructor@instructor.com').first()

        if not instructor:
            instructor = User()
            instructor.email = 'instructor@instructor.com'
            instructor.name = 'Instrutor'
            instructor.profile_photo_url = 'http://img.img.com'
            instructor.social_name = 'Instrutor nome social'
            instructor.password = '1234'
            instructor.professional_contact = '12341234'
            instructor.personal_contact = '12341234'
            instructor.minibio = 'Fusce eu placerat odio. Aenean convallis pharetra arcu et finibus. Aliquam tempor, enim vel pellentesque efficitur, nunc risus lobortis magna, quis laoreet justo neque a ante. Fusce egestas urna non tincidunt auctor. Curabitur id lobortis tellus. Sed a nisi sed nulla tincidunt sollicitudin eu sit amet eros. Duis eu ex ex. Donec a ullamcorper justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eleifend libero nisi, vitae vulputate nulla condimentum vitae. Aliquam erat volutpat. Pellentesque orci enim, semper vitae sagittis ut, facilisis at elit. Sed in volutpat dolor. Aenean sodales sem et magna tincidunt efficitur. Praesent justo lorem, dignissim quis tellus in, accumsan tempor risus.'
            instructor.interests = [{"label": 'TI', "value": 'TI'},{"label": 'Web', "value": 'Web'},{"label": 'Bla', "value": 'Bla'},{"label": 'Ok', "value": 'Ok'}]
            instructor.password = '1234'
            instructor.roles = ['instructor']
            instructor.save()

    def theme_initial():
        theme = Theme.query.filter_by(name='web').first()

        if not theme:
            theme = Theme()
            theme.name = 'web'
            theme.save()

    def course_initial():
        course = Course.query.filter_by(responsible=User.query.filter_by(email='instructor@instructor.com').first()).first()

        if not User.query.filter_by(email='instructor@instructor.com').first():
            Seed.user_instructor()

        if not Theme.filter_by_name('web'):
            Seed.theme_initial()

        if not course:
            course = Course()
            course.name = 'Curso 01'
            course.description = 'Fusce eu placerat odio. Aenean convallis pharetra arcu et finibus. Aliquam tempor, enim vel pellentesque efficitur, nunc risus lobortis magna, quis laoreet justo neque a ante. Fusce egestas urna non tincidunt auctor. Curabitur id lobortis tellus. Sed a nisi sed nulla tincidunt sollicitudin eu sit amet eros. Duis eu ex ex. Donec a ullamcorper justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In eleifend libero nisi, vitae vulputate nulla condimentum vitae. Aliquam erat volutpat. Pellentesque orci enim, semper vitae sagittis ut, facilisis at elit. Sed in volutpat dolor. Aenean sodales sem et magna tincidunt efficitur. Praesent justo lorem, dignissim quis tellus in, accumsan tempor risus.'
            course.responsible = User.filter_by_role('instructor')[0]
            course.theme = Theme.filter_by_name('web')[0]
            course.icon_photo_url = 'http://img.img.com'
            course.hot_keys = ['python', 'web', 'desenvolvimento', 'programação']
            course.save()
