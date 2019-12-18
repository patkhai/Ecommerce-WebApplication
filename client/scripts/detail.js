/*
 * @Author: aadityac15
 * @Date:   2019-11-17 22:31:21
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-15 22:34:47
 * @Description: Individual Listing for each item. Can also contact the seller.
 */

const titleTag = document.getElementById("titleTag");
const descriptionTag = document.getElementById("description");
const category = document.getElementById("category");
const listingImage = document.getElementById("listingImage");
const priceTag = document.getElementById("priceTag");

const fetchIndividualListing = async () => {
	let query = localStorage.getItem("id");
	const FETCH_URL = `/listing?listing_id=${query}`;

	await fetch(FETCH_URL, {
		method: "GET"
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			let dataJson = JSON.parse(data);
			let dummyData = dataJson["listing"];

            localStorage.setItem("listing_author", dummyData["created_by"])

            titleTag.textContent = dummyData["title"];
            descriptionTag.textContent = dummyData["description"];
            category.textContent = dummyData["type"];
            listingImage.style["margin-right"] = "20px";

            if (dummyData["thumbnail"] !== null) {
                listingImage.src = dummyData["thumbnail"];
            } else {
                listingImage.src = "https://via.placeholder.com/300";
            }

            priceTag.textContent = '$' + dummyData["price"];
		});
	};

fetchIndividualListing();



