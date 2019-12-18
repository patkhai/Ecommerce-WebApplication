const PENDING_LISTINGS_URL = "/pending_listings?user_id=";
const APPROVED_LISTINGS_URL = "/approved_listings?user_id=";
const MESSAGES_URL = "/my_messages?user_id=";

const getPendingListings = async () => {
  let pendingListings = await getListings(
    PENDING_LISTINGS_URL + sessionStorage.getItem("user_id")
  );

  const listingTableBody = document
    .getElementById("remove_row")
    .getElementsByTagName("tbody")[0];

  pendingListings.forEach(listing => listingTableBody.append(listing));
};

const getApprovedListings = async () => {
  let approvedListings = await getListings(
    APPROVED_LISTINGS_URL + sessionStorage.getItem("user_id")
  );

  const listingTableBody = document
    .getElementById("remove_row")
    .getElementsByTagName("tbody")[0];

  approvedListings.forEach(listing => listingTableBody.append(listing));
};

const getMessages = async () => {
  let messages = await fetch(MESSAGES_URL + sessionStorage.getItem("user_id"), {
    method: "GET",
    withCredentials: true
  })
    .then(response => {
      if (response === undefined);
      else {
        return response.text();
      }
    })
    .then(data => {
      let messages = [];

      try {
        let messagesObject = JSON.parse(data);
        console.log(messages);
        messages = messagesObject["messages"];
        if (messages.length == 0) {
          // TODO: Create table row that says "No messages at the moment."
          document.getElementById("message-table").innerHTML =
            "There are no messages at the moment.";
        }
        messages = messages.map(listing => createMessagesTableRow(listing));

        return messages;
      } catch (e) {
        document.getElementById("message-table").innerHTML =
          "There are no messages at the moment.";

        // TODO: Create table row with "No messages at the moment"
        console.log(e);
      }

      return messages;
    });

  const messageTableBody = document
    .getElementById("message-table")
    .getElementsByTagName("tbody")[0];

  messages.forEach(message => messageTableBody.append(message));
};

const getListings = async url => {
  return fetch(url, {
    method: "GET",
    withCredentials: true
  })
    .then(response => {
      if (response === undefined);
      else {
        return response.text();
      }
    })
    .then(data => {
      let listings = [];

      try {
        let listingsObject = JSON.parse(data);
        listings = listingsObject["listings"];
        if (listings.length == 0) {
          // TODO: Create table row that says "No listings at the moment."
        }

        listings = listings.map(listing => createListingTableRow(listing));

        return listings;
      } catch (e) {
        // TODO: Create table row with "No listings at the moment"
        console.log(e);
      }

      return listings;
    });
};

let createListingTableRow = listing => {
  let tableRow = createDomElement("tr");
  let listingImageData = createDomElement("td");
  let listingTitleData = createDomElement("td");
  let listingDateData = createDomElement("td");

  let listingImage = createDomElement("img");

  listingImage.src = "https://via.placeholder.com/100";
  if (listing.thumbnail != null) {
    listingImage.src = listing.thumbnail.includes("http")
      ? listing.thumbnail
      : "../" + listing.thumbnail;
  }

  listingImage.alt = listing.title;
  listingImage.height = 100;
  listingImage.width = 100;
  listingImageData.appendChild(listingImage);

  listingTitleData.innerText = listing.title;
  listingDateData.innerText = listing.last_edited_on;

  tableRow.appendChild(listingImageData);
  tableRow.appendChild(listingTitleData);
  tableRow.appendChild(listingDateData);
  return tableRow;
};

let createMessagesTableRow = message => {
  let tableRow = createDomElement("tr");
  let messageItemData = createDomElement("td");
  let messageMessageData = createDomElement("td");
  let messageSenderData = createDomElement("td");
  let messageDateData = createDomElement("td");

  messageItemData.innerText = message.listing_name;
  messageMessageData.innerText = message.message_body;
  messageSenderData.innerText = message.sender_username;
  messageDateData.innerText = message.timestamp;

  tableRow.appendChild(messageItemData);
  tableRow.appendChild(messageMessageData);
  tableRow.appendChild(messageSenderData);
  tableRow.appendChild(messageDateData);

  return tableRow;
};
