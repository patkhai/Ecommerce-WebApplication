# User Route
# Handles all login, account creation and verification logic.

from flask import Blueprint, request, jsonify, abort
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

from model.user import User
from model import db

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/verify', methods=['POST'])
def verify():
    """
    Verifies user token

    :param user_id
    :param token, per specific user
    :return: JSON of success of verification
    """
    user_id = request.form.get('user_id')
    token = request.form.get('token')

    user = User.query.filter_by(user_id=user_id)
    if user.token == token:
        return jsonify(success=True)
    return jsonify(success=False)


@user_blueprint.route('/login', methods=['POST'])
def login():
    """
    Checks user credentials

    :param username
    :param password
    :return: JSON of success
    """
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()
    if check_password_hash(user.password, password):
        return jsonify({
            'user_id': user.user_id,
            'first_name': user.first_name,
            'token': user.token,
            'is_admin': user.is_admin
        })

    abort(403, 'Username and password do not match.')


@user_blueprint.route('/create', methods=['POST'])
def create():
    """
    Creates user

    :param email
    :param username
    :param password
    :param first_name
    :param last_name
    :param major OPTIONAL
    :return: JSON of success
    """
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    major = request.json.get('major') if 'major' in request.json else None

    validation = [first_name, last_name, major]

    for item in validation:
        if item and (not item.replace(' ', '').isalpha()):
            return jsonify({"error": "Query contains symbols or numbers"})

    new_user = User(
        email=email,
        username=username,
        password=generate_password_hash(password),
        first_name=first_name,
        last_name=last_name,
        major=major,
        is_admin=None,
        token=secrets.token_urlsafe()
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'user_id': new_user.user_id,
        'first_name': new_user.first_name,
        'token': new_user.token,
        'is_admin': new_user.is_admin
    })
