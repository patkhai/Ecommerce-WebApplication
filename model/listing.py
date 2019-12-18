from model import db


class Listing(db.Model):
    created_by = db.Column("created_by", db.INT, db.ForeignKey("user.user_id"), nullable=False)
    created_on = db.Column("created_on", db.DATETIME, nullable=False)
    description = db.Column("description", db.VARCHAR(length=255), nullable=True)
    last_edited_on = db.Column("last_edited_on", db.DATETIME, nullable=False)
    listing_id = db.Column("listing_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    price = db.Column("price", db.DECIMAL(asdecimal=False), default=0.00, nullable=False)
    thumbnail = db.Column("thumbnail", db.VARCHAR(length=255), nullable=True)
    title = db.Column("title", db.VARCHAR(length=45), nullable=False)
    type = db.Column("type", db.VARCHAR(length=45), nullable=True)
    approved = db.Column("approved", db.BOOLEAN, nullable=True)
    approved_by = db.Column("approved_by", db.INT, db.ForeignKey("user.user_id"), nullable=True)


    @property
    def serialize(self):
        return {
             "listing_id": self.listing_id,
             "title": self.title,
             "description": self.description,
             "type": self.type,
             "price": self.price,
             "thumbnail": self.thumbnail,
             "created_on": self.created_on,
             "last_edited_on": self.last_edited_on,
             "created_by": self.created_by,
             "approved": self.approved,
             "approved_by": self.approved_by,
        }
