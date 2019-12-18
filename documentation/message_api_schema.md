`TODO:` Wondering how we're going to handle "me" type requests. My listings. My messages. 
My profile. Etc. For now I'll just send `user_id`.
#### [GET] /my_messages
Query string param: `user_id: int`<br>
Response: 
```
{
    "messages": [{
        "message_id": int,
        "sent_by": int,
        "message_body": str,
        "sender_email": str,
        "sender_phone_number": str,
        "type": str,
        "timestamp": datetime
    },
    ...]
}
```
_____________
#### [GET] /message
Query string param: `message_id: int`<br>
Response: 
```
{
    "message": {
        "message_id": int,
        "sent_by": int,
        "message_body": str,
        "sender_email": str,
        "sender_phone_number": str,
        "type": str,
        "timestamp": datetime
    }
}
```
_______________
#### [POST] /message
Body request params:
```
{
    "message": {
        "sent_from": int,
        "sent_by": int,
        "message_body": str,
        "from_admin": boolean,
    }
}
```
