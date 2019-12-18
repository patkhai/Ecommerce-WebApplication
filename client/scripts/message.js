const MESSAGES_URL = '/send_message';
const test = new FormData();
let listingID = document.getElementById('listing_id');
let messageContent = document.getElementById('message_body').value;
let sent_by = document.getElementById('sent_by');
let sent_to = document.getElementById('sent_to');

const checkIfRedirected = () => {
	if (sessionStorage.getItem('user_id') && localStorage.getItem('id')) {
		document.getElementById("listing_id") = localStorage.getItem('id');
		document.getElementById("message_body").value = localStorage.getItem('message_body');
		document.getElementById("sent_to") = localStorage.getItem('listing_author');
		document.getElementById("sent_by") = localStorage.getItem('user_id');

		_clearListingFromLocalStorage();
	}
};

const postMessages = () => {
    listingID = document.getElementById('listing_id');
	messageContent = document.getElementById('message_body').value;
	//let admin = document.getElementById('admin').value;
};

const sendMessages = () => {
    postMessages();
    if (_checkUserLogin()) return;

    test.append("listing_id", localStorage.getItem("id"));
	test.append("message_body", messageContent);
	test.append("sent_by", sessionStorage.getItem('user_id'));
	test.append("sent_to", localStorage.getItem("listing_author"));
	//test.append("from_admin", admin);
	fetch(MESSAGES_URL, {
		method : "POST",
		body : test,
	    credentials: 'same-origin',
	}).then(res => {
	    console.log(res);
		alert("Message Successfully Sent")
	})
};

const _checkUserLogin = () => {
	if (!sessionStorage.getItem("user_id")) {
		alert("You are not logged in!");
		_storeInformationInLocalStorage();
		window.location.replace("/users/login");
		return true;
	}
	return false;
};

const _clearListingFromLocalStorage = () => {
    console.log("CLEAR LISTING");
	localStorage.removeItem('listing_id');
	localStorage.removeItem('message_body');
	localStorage.removeItem('sent_by');
	localStorage.removeItem('sent_to');
	localStorage.removeItem('redirectUrl');
};

const _storeInformationInLocalStorage = () => {
	localStorage.setItem('listing_id', listingID);
	localStorage.setItem('message_body', messageContent);
	localStorage.setItem('sent_by', sent_by);
	localStorage.setItem('sent_to', sent_to);
	localStorage.setItem('redirectUrl', window.location.href)
};
