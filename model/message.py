from model import db


class Message(db.Model):
    message_id = db.Column("message_id", db.INT, primary_key=True, nullable=False, autoincrement=True)
    sent_by = db.Column("sent_by", db.INT, db.ForeignKey("user.user_id"), nullable=False)
    sent_to = db.Column("sent_to", db.INT, db.ForeignKey("user.user_id"), nullable=False)
    message_body = db.Column("message_body", db.VARCHAR(length=1000), nullable=False)
    timestamp = db.Column("timestamp", db.DATETIME, nullable=False)
    from_admin = db.Column("from_admin", db.BOOLEAN, nullable=False)
    listing_id = db.Column("listing_id", db.INT, db.ForeignKey("listing.listing_id"), nullable=True)

    @property
    def serialize(self):
        return {
            "message_id": self.message_id,
            "sent_by": self.sent_by,
            "sent_to": self.sent_to,
            "message_body": self.message_body,
            "timestamp": self.timestamp,
            "from_admin": self.from_admin,
            "listing_id": self.listing_id
        }
