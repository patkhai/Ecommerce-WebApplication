# MyListings Route
# Gets user listings

from flask import Blueprint, request, jsonify
from model.listing import Listing

mylistings_blueprint = Blueprint('mylistings',
                             __name__,
                             static_folder ='../client',
                             template_folder='../client/public/mylistings')


@mylistings_blueprint.route('/mylisting', methods=['GET'])
def get_mylistings():
    """
    Gets listings by user_id

    :param user_id 
    :return: JSON Serialized listing objects
    """
    user_id = request.args.get('user_id')
    result = Listing.query.filter(Listing.created_by == user_id)

    return jsonify({
        'listings': [r.serialize for r in result]
    })
