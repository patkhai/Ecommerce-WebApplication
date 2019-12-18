# Listing Route
# Holds functionality for all get, post and edit individual listings

from flask import Blueprint, request, jsonify
import os, datetime

from model.listing import Listing
from model import db

listing_blueprint = Blueprint('listing',
                              __name__,
                              static_folder ='../client',
                              template_folder='../client/public/listing')

RELATIVE_IMAGES_PATH = 'client/public/images/{}.png'


@listing_blueprint.route('/listing', methods=['GET'])
def get_listing():
    """
    Gets individual listing

    :param listing_id
    :return: JSON Serialized listing object
    """
    listing_id = request.args.get('listing_id')

    result = Listing.query.get(listing_id)

    return jsonify({
        'listing': result.serialize
    })


@listing_blueprint.route('/create_listing', methods=['POST'])
def post_listing():
    """
    Creates listing

    :param title
    :param description
    :param type, category of object
    :param price
    :param thumbnail
    :param created_by, id of user who created listing
    :return: JSON of listing_id and created_on datetime
    """
    title = request.form.get('title')
    description = request.form.get('description')
    type = request.form.get('type')
    price = request.form.get('price')
    thumbnail = request.files['file']
    created_on = datetime.datetime.now()
    last_edited_on = created_on
    created_by = request.form.get('created_by')

    new_listing = Listing(title=title,
                          description=description,
                          type=type,
                          price=price,
                          created_on=created_on,
                          last_edited_on=last_edited_on,
                          created_by=created_by)

    db.session.add(new_listing)
    db.session.commit()

    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, '../{}'.format(RELATIVE_IMAGES_PATH.format(new_listing.listing_id)))
    thumbnail.save(filename)

    new_listing.thumbnail = RELATIVE_IMAGES_PATH.format(new_listing.listing_id)

    db.session.commit()

    return jsonify({
        'listing_id': new_listing.listing_id,
        'created_on': new_listing.created_on
    })


@listing_blueprint.route('/listing', methods=['PUT'])
def put_listing():
    """
    Edits listing

    :param listing_id, REQUIRED
    :params Any other editable field for listing
    :return: JSON listing_id and last_edited_on
    """
    listing_id = request.form.get('listing_id')

    listing = Listing.query.get(listing_id)
    title = request.form.get('title')
    description = request.form.get('description')
    type = request.form.get('type')
    price = request.form.get('price')
    thumbnail = request.form.get('thumbnail')

    if title:
        listing.title = title
    if description:
        listing.description = description
    if type:
        listing.type = type
    if price:
        listing.price = price
    if thumbnail:
        listing.thumbnail = thumbnail

    listing.last_edited_on = datetime.datetime.now()

    db.session.commit()

    return jsonify({
        'listing_id': listing_id,
        'last_edited_on': listing.last_edited_on
    })


@listing_blueprint.route('/edit_listing_approval', methods=['PUT'])
def edit_listing_approval():
    """
    Approves or Denies a listing

    :param listing_id
    :param approval_status
    :return:
    """
    listing_id = request.json.get('listing_id')
    approved = request.json.get('approval_status')

    listing = Listing.query.get(listing_id)
    listing.approved = approved;

    listing.last_edited_on = datetime.datetime.now()

    db.session.commit()

    return jsonify({
        'listing_id': listing_id,
        'last_edited_on': listing.last_edited_on,
        'approved': listing.approved
    })
