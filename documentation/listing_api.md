#### [GET] /listings <br>
Query string params:
```
query: str [OPT]
category: str [OPT]
```

Response:
```
{
   "listings": [
     {
        "listing_id": int,
        "title": string,
        "description": string,
        "type": string,
        "price": float,
        "thumbnail": string,
        "approved_by": int,
        "approved_on": datetime,
        "created_on": datetime,
        "last_edited_on": datetime,
        "created_by": datetime,
     },
     ...]
}
``` 
________________________
#### [GET] /listing <br>
Query string params: `listing_id: int` <br>
Response: 
```
{
    "listing": {
        "listing_id": int,
        "title": string,
        "description": string,
        "type": string,
        "price": float,
        "thumbnail": string,
        "approved_by": int,
        "approved_on": datetime,
        "created_on": datetime,
        "last_edited_on": datetime,
        "created_by": datetime,
    }
}
```
____________________
#### [POST] /listing
Body request params:
```
{
    "listing": {
        "title": string,
        "description": string [OPTIONAL],
        "type": string [OPTIONAL],
        "price": float,
        "thumbnail": string [OPTIONAL],
    }
}
```
Response:
```
{
    "listing_id": int,
    "created_on": datetime
}
```

_________
#### [PUT] /listing
Body request params:
```
{
    "listing": {
        "listing_id": int,
        "title": string [OPTIONAL],
        "description": string [OPTIONAL],
        "type": string [OPTIONAL],
        "price": float [OPTIONAL],
        "thumbnail": string [OPTIONAL],
    }
}
```
Response:
```
{
    "listing_id": int,
    "last_edited_on": datetime
}
```
__________
#### [GET] /mylistings
Query string params: `user_id: int`<br>
Response:
```
{
   "listings": [
     {
        "listing_id": int,
        "title": string,
        "description": string,
        "type": string,
        "price": float,
        "thumbnail": string,
        "approved_by": int,
        "approved_on": datetime,
        "created_on": datetime,
        "last_edited_on": datetime,
        "created_by": datetime,
     },
     ...]
}
```
