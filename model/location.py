from model import db


class Location(db.Model):
    location_id = db.Column("location_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    description = db.Column("description", db.VARCHAR(length=255), nullable=False)
    thumbnail = db.Column("thumbnail", db.VARCHAR(length=255), nullable=True)
    created_by = db.Column("created_by", db.INT, db.FOREIGNKEY("user.user_id"), nullable=False)

    @property
    def serialize(self):
        return {
            "location_id": self.listing_id,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "created_by": self.created_by
        }
