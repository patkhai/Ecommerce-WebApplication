from flask import Flask, render_template, send_from_directory

from model import db
from routes.about_me_static import about_blueprint
from routes.listing import listing_blueprint
from routes.listings import listings_blueprint
from routes.message import message_blueprint
from routes.mylistings import mylistings_blueprint
from routes.static_server import static_blueprint
from routes.user import user_blueprint
import databaseconfig as cfg

app = Flask(__name__, static_url_path='', static_folder='client')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{username}:{password}@127.0.0.1:{port}/{database_name}'.format(
    username=cfg.mysql['username'],
    password=cfg.mysql['password'],
    port=cfg.mysql['port'],
    database_name=cfg.mysql['database_name']
)
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = cfg.mysql['port']
# TODO: CHANGE PASSWORD FOR YOUR LOCAL SETUP
app.config['MYSQL_PASSWORD'] = cfg.mysql['password']


db.init_app(app)

# app.register_blueprint(users_blueprint)
app.register_blueprint(about_blueprint)
app.register_blueprint(listings_blueprint)
app.register_blueprint(listing_blueprint)
app.register_blueprint(message_blueprint)
app.register_blueprint(mylistings_blueprint)
app.register_blueprint(user_blueprint)

app.register_blueprint(static_blueprint)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port="5000")
