from models import db
from schema.seed.seed_file import Seed
from models.user import User
from sqlalchemy import create_engine

class Schema:
    @staticmethod
    def migration():
        # engine = create_engine('postgresql://global:123abc@localhost:5432/ai_teacher', echo=False)
        # User.__table__.drop(engine)

        db.create_all()
        Seed.user_student()
        Seed.user_instructor()
