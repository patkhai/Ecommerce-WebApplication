from flask import Blueprint, send_from_directory, render_template

about_blueprint = Blueprint('about_server',
                            __name__,
                            static_folder='../client',
                            template_folder='../client/public/about')


# @about_blueprint.route('/about/<path:name>', methods=['GET'])
# def render_about(name):
#     return render_template('{}.html'.format(name))


@about_blueprint.route('/about/<path:name>', methods=['GET'])
def render_about(name):
    return render_template('/{}.html'.format(name))
