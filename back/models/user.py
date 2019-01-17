from models import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import String
from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'

    id :int = db.Column(db.Integer, primary_key=True)
    email :str = db.Column(db.String(128), nullable=False)
    password :str = db.Column(db.String(256), nullable=True)
    roles = db.Column(JSONB, nullable=False)
    profile_photo_url :str = db.Column(db.String(256), nullable=True)
    name :str = db.Column(db.String(128), nullable=True)
    social_name :str = db.Column(db.String(150), nullable=True)
    ids_interests = db.Column(JSONB, nullable=True)
    professional_contact :str = db.Column(db.String(50), nullable=True)
    personal_contact :str = db.Column(db.String(50), nullable=True)
    minibio :str = db.Column(db.Text(), nullable=True)
    recovery = db.Column(JSONB, nullable=True)
    timestamp = db.Column(db.DateTime(), nullable=False)

    @staticmethod
    def authenticate(email, password):
        user = User.query.filter_by(email=email).first()
        if user:
            try:
                if sha256.verify(password, user.password):
                    return user
            except:
                return 'User not found'

        return 'User not found'

    @staticmethod
    def get(id):
        return User.query.filter_by(id=id).first()

    @staticmethod
    def list():
        return User.query.all()

    @staticmethod
    def filter_by_name(name):
        return User.query.filter_by(name=name).first()

    @staticmethod
    def filter_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def filter_by_role(role):
        return User.query.filter(User.roles.op('@>')([role])).all()

    def save(self):
        if self.password and self.password.startswith('$pbkdf2-sha256$') == False:
            self.password = sha256.hash(self.password)
        self.timestamp = datetime.now()

        db.session.merge(self)
        db.session.commit()
