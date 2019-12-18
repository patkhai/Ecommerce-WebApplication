from model import db


class User(db.Model):
    user_id = db.Column("user_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column("username", db.VARCHAR(length=45), nullable=False, unique=True)
    first_name = db.Column("first_name", db.VARCHAR(length=45), nullable=True)
    last_name = db.Column("last_name", db.VARCHAR(length=45), nullable=True)
    email = db.Column("email", db.VARCHAR(length=255), nullable=False)
    password = db.Column("password", db.VARCHAR(length=255), nullable=False)
    is_admin = db.Column("is_admin", db.BOOLEAN, default=False)
    major = db.Column("major",  db.VARCHAR(length=45), nullable=True)
    token = db.Column("token", db.VARCHAR(length=255), nullable=False, autoincrement=True)

    @property
    def serialize(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "password": self.password,
            "is_admin": self.is_admin,
            "major": self.major
        }