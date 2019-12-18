
# Static Server Routes
# Handles all serving of frontend components

from flask import Blueprint, render_template, request
import os

static_blueprint = Blueprint('static_server',
                             __name__,
                             static_folder='../client',
                             template_folder='../client/public')


@static_blueprint.route("/results", methods=["GET"])
def render_results():
    """
    Renders search results

    :return:
    """
    return render_template("search_result.html")


@static_blueprint.route("/recommended", methods=["GET"])
def render_recommended_results():
    """
    Renders search results

    :return:
    """
    return render_template("recommended_results.html")


@static_blueprint.route("/terms", methods=["GET", "POST"])
def render_terms():
    """
    Renders terms and conditions

    :return:
    """

    return render_template("terms&conditions.html")


@static_blueprint.route('/message/<path:name>', methods=["GET", "POST"])
def render_messages(name):
    """
    Renders all message pages

    :param name:
    :return:
    """
    return render_template('/message/{}.html'.format(name))

@static_blueprint.route('/upload_image', methods=["POST"])
def upload_image():
    """
    Used for uploading image to the database.
    :param name:
    :return:
    """
    if request.files['file'] is not None:
        print('typ of profile_picture', type(request.files['file']))
        print(request.files['file'])
        file = request.files['file']
        name = request.form.get('title')
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, '../images/{}.png'.format(name))
        file.save(filename)
    return "In the post"
    # return render_template('/message/{}.html'.format(name))


@static_blueprint.route('/users/<path:name>', methods=["GET", "POST"])
def render_users(name):
    """
    Renders all user pages

    :param name:
    :return:
    """
    return render_template('/users/{}.html'.format(name))


@static_blueprint.route('/details', methods=['GET', 'POST'])
def render_details():
    """
    Renders individual listing info

    :return:
    """
    return render_template('/listings/detail.html')


@static_blueprint.route('/listings/<path:name>', methods=["GET", "POST"])
def render_listings(name):
    """
    Renders all listings pages

    :param name:
    :return:
    """
    return render_template('/listings/{}.html'.format(name))


@static_blueprint.route('/', methods=['GET'])
def render_home():
    return render_template("/users/landing_page.html")

