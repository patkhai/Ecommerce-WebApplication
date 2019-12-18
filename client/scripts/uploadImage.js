/*
 * @Author: aadityac15/ theseanathan
 * @Date:   2019-12-05 21:21:43
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-08 17:08:15
 * @Description: S
 */
const formData = new FormData();
const uploadTag = document.getElementById("image_upload");
let uploadedPicture = undefined;
let itemName = document.getElementById('itemName').value;
let itemPrice = document.getElementById('itemPrice').value;
let itemDescription = document.getElementById('itemDescription').value;
let itemCategory = document.getElementById('sellListingSelectDropdown').value;
const checkIfRedirected = () => {
	if (sessionStorage.getItem('user_id') && localStorage.getItem('itemName')) {
		document.getElementById("itemName").value = localStorage.getItem('itemName');
		document.getElementById("itemPrice").value = localStorage.getItem('itemPrice');
		document.getElementById("itemDescription").value = localStorage.getItem('itemDescription');
		document.getElementById("sellListingSelectDropdown").value = localStorage.getItem('itemCategory');

		_clearListingFromLocalStorage();
	}
};

const populateFormWithListing = () => {
	itemName = document.getElementById('itemName').value;
	itemPrice = document.getElementById('itemPrice').value;
	itemDescription = document.getElementById('itemDescription').value;
	itemCategory = document.getElementById('sellListingSelectDropdown').value;
	uploadedPicture = uploadTag.files[0];
};

const uploadImage = () => {
	populateFormWithListing();
	if (_checkUserLogin()) return;
    formData.append("file", uploadedPicture, "filename");
	formData.append("title", itemName);
	formData.append("price", itemPrice);
	formData.append("description", itemDescription);
	formData.append("type", itemCategory);
	formData.append("created_by", sessionStorage.getItem("user_id"));

	fetch("/create_listing", {
		method : "POST",
		body : formData,
	    credentials: 'same-origin',
	}).then(res => {
		console.log(res);
		location.replace('../listings/createSell_item_success')
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
	localStorage.removeItem('itemName');
	localStorage.removeItem('itemPrice');
	localStorage.removeItem('itemDescription');
	localStorage.removeItem('itemCategory');
	localStorage.removeItem('redirectUrl');
};

const _storeInformationInLocalStorage = () => {
	localStorage.setItem('itemName', itemName);
	localStorage.setItem('itemPrice', itemPrice);
	localStorage.setItem('itemDescription', itemDescription);
	localStorage.setItem('itemCategory', itemCategory);
	localStorage.setItem('redirectUrl', window.location.href)
};

