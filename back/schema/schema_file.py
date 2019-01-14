from models import db
from schema.seed.seed_file import Seed
from models.user import User

from sqlalchemy import create_engine

class Schema:
    @staticmethod
    def migration():
        db.create_all()
