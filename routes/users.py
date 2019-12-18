from flask import Blueprint, send_from_directory, render_template

users_blueprint = Blueprint('users_server',
                            __name__,
                            static_folder='../client',
                            template_folder='../client/public/users')


@users_blueprint.route('/users/<path:name>', methods=["GET", "POST"])
def render_users(name):
    return render_template('/{}.html'.format(name))