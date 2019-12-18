`TODO`: I'm going to pass in the admin user_id for authentication to access this endpoint.
But I think we can do auth in a few different ways so this is subject to change.
#### [GET] /users
Query string params: `admin_id: int`
Response:
```
{
    "users": [{
        "user_id": int,
        "username": string,
        "first_name": string,
        "last_name": string,
        "email": string,
        "is_admin": boolean,
        "major": string
    },
    ...]
}
```
_____________
#### [GET] /user
Query string params: `user_id: int`<br>
Response:
```
{
    "user": {
        "user_id": int,
        "username": string,
        "first_name": string,
        "last_name": string,
        "major": string
    }
}
```
_____________
#### [POST] /user
Body request params:
```
{
    "user": {
        "username": string,
        "first_name": string [OPTIONAL],
        "last_name": string [OPTIONAL],
        "email": string,
        "password": string,
        "major": string [OPTIONAL]
    }
}
```
Response:
```
{
    "user_id": int,
    "username": string,
    "first_name": string,
    "last_name": string 
}
```
_____________
#### [PUT] /user
Body request params:
```
{
    "user": {
        "user_id": int,
        "username": string [OPTIONAL],
        "first_name": string [OPTIONAL],
        "last_name": string [OPTIONAL],
        "email": string [OPTIONAL],
        "major": string [OPTIONAL]
    }
}
```
Response:
```
{
    "user_id": int,
    "username": string,
    "first_name": string,
    "last_name": string 
}
```
_____________
#### [PUT] /reset-password
Body request params:
```
{
    "user_id": int,
    "current_password": string,
    "new_password": string,
}
```
Response: 
```
{
    "user_id": int
}
```
______________
#### [GET] /me
Query string params: `my_id: int`<br>
Response:
```
{
    "users": {
        "user_id": int,
        "username": string,
        "first_name": string,
        "last_name": string,
        "email": string,
        "is_admin": boolean,
        "major": string
    }
}
```
