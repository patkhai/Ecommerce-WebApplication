const PENDING_LISTINGS_URL = '/pending_listings';
const APPROVED_LISTINGS_URL = '/approved_listings';
const DENIED_LISTINGS_URL = '/denied_listings';
const ALL_LISTINGS_URL = '/listings';
const EDIT_LISTING_APPROVAL_URL = '/edit_listing_approval';

if (sessionStorage.getItem("is_admin") !== 'true') {
    alert("You do not have permission to view this.")
    location.replace("/");
}

const getPendingListings = async () => {
    let pendingListings = await getListings(PENDING_LISTINGS_URL);

    const listingTableBody = document.getElementById("pending-listings-table")
        .getElementsByTagName('tbody')[0];

    pendingListings.forEach(listing => listingTableBody.append(listing));
};


const getApprovedListings = async () => {
    let approvedListings = await getListings(APPROVED_LISTINGS_URL);

    const listingTableBody = document.getElementById("approved-listings-table")
        .getElementsByTagName('tbody')[0];

    approvedListings.forEach(listing => listingTableBody.append(listing));
};


const getDeniedListings = async () => {
    let deniedListings = await getListings(DENIED_LISTINGS_URL);

    const listingTableBody = document.getElementById("denied-listings-table")
        .getElementsByTagName('tbody')[0];

    deniedListings.forEach(listing => listingTableBody.append(listing));
};


const getAllListings = async () => {
    let allListings = await getListings(ALL_LISTINGS_URL);

    const listingTableBody = document.getElementById("all-listings-table")
        .getElementsByTagName('tbody')[0];

    allListings.forEach(listing => listingTableBody.append(listing));
};

const getListings = async (url) => {
    return fetch(url, {
        method: "GET",
        withCredentials: true
    }).then(response => {
        if (response === undefined);
        else {
            return response.text();
        }
    }).then(data => {
        let listings = [];

        try {
            let listingsObject = JSON.parse(data);
            listings = listingsObject['listings'];
            if (listings.length == 0) {
                // TODO: Create table row that says "No listings at the moment."
            }

            listings = listings.map((listing) => createListingTableRow(listing));

            return listings;
        } catch (e) {
            // TODO: Create table row with "No listings at the moment"
            console.log(e);
        }

        return listings;
    });
};

let editListingApprovalStatus = (listing_id, approval_status) => {
    let response = fetch(EDIT_LISTING_APPROVAL_URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listing_id, approval_status, }),
        credentials: 'same-origin'
    }).then(res => {
        document.getElementById(listing_id).remove();
    });
};


let createListingTableRow = (listing) => {
    let tableRow = createDomElement("tr");
    let listingImageData = createDomElement("td");
    let listingTitleData = createDomElement("td");
    let listingDescriptionData = createDomElement("td");
    let listingApprovalData = createDomElement("td");

    let listingImage = createDomElement("img");
    listingImage.src = "https://via.placeholder.com/100";
    if (listing.thumbnail != null) {
        listingImage.src = (listing.thumbnail.includes('http')) ? listing.thumbnail : "../" + listing.thumbnail;
    }
    listingImage.alt = listing.title;
    listingImage.height = 100;
    listingImage.width = 100;
    listingImageData.appendChild(listingImage);

    listingTitleData.innerText = listing.title;
    listingDescriptionData.innerText = listing.description;


    if (listing.approved == false || listing.approved == null) {
        let approveButton = createDomElement("button");
        approveButton.id = "approveButton";
        approveButton.className = "approveButton remove";
        approveButton.innerText = "Approve";
        approveButton.onclick = () => {
            editListingApprovalStatus(listing.listing_id, true)
        };

        listingApprovalData.appendChild(approveButton);
    }

    if (listing.approved == true || listing.approved == null) {
        let denyButton = createDomElement("button");
        denyButton.id = "denyButton";
        denyButton.className = "denyButton remove";
        denyButton.innerText = "Deny";
        denyButton.onclick = () => {
            editListingApprovalStatus(listing.listing_id, false)
        };

        listingApprovalData.appendChild(denyButton);
    }

    tableRow.id = "" + listing.listing_id;
    tableRow.appendChild(listingImageData);
    tableRow.appendChild(listingTitleData);
    tableRow.appendChild(listingDescriptionData);
    tableRow.appendChild(listingApprovalData);

    return tableRow;
};
