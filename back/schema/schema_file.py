from models import db
from schema.seed.seed_file import Seed
from models.user import User
from models.course import Course
from models.theme import Theme
from models.hot_key import HotKey
from models.module import Module
from models.lesson import Lesson
from sqlalchemy import create_engine


class Schema:
    @staticmethod
    def migration():
        # engine = create_engine('
        # postgresql://global:123abc@localhost:5432/ai_teacher', echo=False)
        # Course.__table__.drop(engine)
        # Theme.__table__.drop(engine)
        # Module.__table__.drop(engine)
        # HotKey.__table__.drop(engine)
        # User.__table__.drop(engine)

        db.create_all()
        Schema.prepare_db()

    def prepare_db():
        Seed.user_student()
        Seed.user_instructor()
        Seed.theme_initial()
        Seed.course_initial()
        Seed.module_initial()
        Seed.lesson_initial()
