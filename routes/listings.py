# Listings Route
# Holds endpoints for GET listings functionality

from flask import Blueprint, request, jsonify, send_from_directory, render_template
import datetime
# import os

from model.listing import Listing
from model import db

listings_blueprint = Blueprint('listings',
                               __name__,
                               static_folder='../client',
                               template_folder='../client/public/listings')


@listings_blueprint.route('/listings', methods=['GET'])
def get_listings():
    """
    Gets listings based off query and category
    @:param query: Search query
    @:param category: Search category
    :return: JSON Objects of serialized listings
    """
    query = request.args.get('query')
    category = request.args.get('category')
    sort_by = request.args.get('sort_by')

    if query and len(query) > 40:
        return jsonify({"error": "Query too long"})
    if query and (not query.replace(' ', '').isalnum()):
        return jsonify({"error": "Query contains symbols"})
    search = "%{}%".format(query)

    if query and category:
        result = Listing.query.filter(Listing.title.ilike(search),
                                      Listing.type == category,
                                      Listing.approved == True)
    elif query:
        result = Listing.query.filter(Listing.title.ilike(search), Listing.approved == True)
    elif category:
        result = Listing.query.filter(Listing.type == category, Listing.approved == True)
    else:
        result = Listing.query.filter_by(approved=True)

    if sort_by and (sort_by == "price_ascending"):
        result = result.order_by(Listing.price.asc())
    elif sort_by and (sort_by == "price_descending"):
        result = result.order_by(Listing.price.desc())
    else:
        result = result.all()

    return jsonify({
        'listings': [r.serialize for r in result]
    })


@listings_blueprint.route('/pending_listings', methods=['GET'])
def get_pending_listings():
    """
    Gets pending listings for a user
    :param user_id
    :return:
    """
    user_id = request.args.get('user_id')
    pending_listings = []

    if user_id:
        pending_listings = Listing.query.filter_by(approved=None, created_by=user_id)
    else:
        pending_listings = Listing.query.filter_by(approved=None)

    return jsonify({
        "listings": [listing.serialize for listing in pending_listings]
    })


@listings_blueprint.route('/approved_listings', methods=['GET'])
def get_approved_listings():
    """
    Gets pending listings for a user
    :param user_id
    :return:
    """
    user_id = request.args.get('user_id')
    approved_listings = []

    if user_id:
        approved_listings = Listing.query.filter_by(approved=True, created_by=user_id)
    else:
        approved_listings = Listing.query.filter_by(approved=True)

    return jsonify({
        "listings": [listing.serialize for listing in approved_listings]
    })

@listings_blueprint.route('/denied_listings', methods=['GET'])
def get_denied_listings():
    """
    Gets pending listings for a user
    :param user_id
    :return:
    """
    denied_listings = Listing.query.filter_by(approved=False)

    return jsonify({
        "listings": [listing.serialize for listing in denied_listings]
    })


@listings_blueprint.route('/listings', methods=['POST'])
def post_listing():
    """
    Creates listing and stores image in the filesystem

    :return: Success
    """
    if request.method == 'POST':
        listing_id = request.form.get('listing_id')
        title = request.form.get('title')
        description = request.form.get('description')
        type = request.form.get('type')
        price = request.form.get('price')
        thumbnail = request.form.get('thumbnail')
        created_on = datetime.datetime.now()
        last_edited_on = request.form.get('last_edited_on')
        created_by = request.form.get('created_by')

        new_listing = Listing(listing_id=listing_id,
                              title=title,
                              description=description,
                              type=type,
                              price=price,
                              thumbnail=thumbnail,
                              created_on=created_on,
                              last_edited_on=last_edited_on,
                              created_by=created_by)

        db.session.add(new_listing)
        db.session.commit()
    return jsonify(success=True)


@listings_blueprint.route('/recommended_listings', methods=['GET'])
def get_recommended_listings():
    """
    Gets students recommended listings based off their major

    :return: Recommended listings
    """
    user_id = request.args.get('user_id')
    major_search = '%{}%'.format(_get_user_major(user_id))

    print('major_search: ', major_search)

    recommended_listings = []
    recommended_listings = Listing.query.filter(
        (Listing.title.ilike(major_search) | Listing.description.ilike(major_search)),
        Listing.approved == True)

    print(recommended_listings)

    return jsonify({
        'listings': [listing.serialize for listing in recommended_listings]
    })


@listings_blueprint.route('/categories', methods=['GET'])
def get_categories():
    """
    Gets listing category types to send to front

    :return: categories, list of string
    """
    with open("./routes/categories.txt") as file:
        categories_string = file.read()
        categories = categories_string.split(',')
        return jsonify({
            'categories': categories
        })


def _get_user_major(user_id):
    """
    Gets the students major

    :param user_id:
    :return: major of student
    """
    from model.user import User
    return User.query.get(user_id).major
