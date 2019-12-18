/*
 * @Author: aadityac15
 * @Date: 2019-12-07 23:45:46
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-16 20:20:49
 * @Description: Fetch the listings from the backend and populate individual listing.
 */

// Press Enter to search.

let count = 0;
let filterCount = 0;
// To see if the filter has to be done.
let filterFlag = false;
// To check if the response is empty.
let errorFlag = false;
let sort_by = "";
let query = "";
let category = "";
let ERROR_URL = "listings?query=&category=&sort_by=";

const sortListings = () => {
  filterFlag = true;
  filterCount += 1;
  fetchData();
};

const fetchData = async () => {
  // Transfer values from index to result.
  // Get the category from the localStorage.
  category = localStorage.getItem("category");
  let noResultTag = document.getElementById("noResultTag");
  let ulResult = document.getElementById("resultList");
  const filterDropDownElement = document.getElementById("filterDropDown");
  let sort_by =
    filterDropDownElement.options[filterDropDownElement.selectedIndex].value;

  if (filterFlag) {
    // Clear rows to show new data.
    ulResult = await clearRows(ulResult);
    filterFlag = false;

    sort_by =
      filterDropDownElement.options[filterDropDownElement.selectedIndex].value;
    ulResult.classList.add("list-group");

    if (errorFlag) {
      // Generate empty url with just the sort.
      generateErrorURL("", "", sort_by);
    }
    fetchData();
  }


  // If it has id and title.
  localStorage.removeItem("id");
  localStorage.removeItem("title");
  let query = localStorage.getItem("query");

  if (category === "All Categories") {
    category = "";
  }

  // handle refrersh i.e show everything if after refresh either of the parameters are null.
  if (category === null) {
    category = "";
  }

  if (query === null) {
    query = "";
  }

  let LISTINGS_URL = "";
  if (!errorFlag) {

    LISTINGS_URL = `listings?query=${query}&category=${category}&sort_by=${sort_by}`;
  } else {
    LISTINGS_URL = ERROR_URL;
  }

  await fetch(LISTINGS_URL, {
    method: "GET",
    withCredentials: true
  })
    .then(response => {
      if (response === undefined) {
        alert("something is wrong.");
        window.location.pathname = "/";
      } else {
        return response.text();
      }
    })
    .then(data => {
      /* If the query tag contains non alphanumeric character. */
      if (JSON.parse(data).error) {
        let textNode = document.createTextNode(
          "Please try another Search query with only alphanumeric characters. Here are some featured items."
        );
        noResultTag.appendChild(textNode);
        errorFlag = true;
        fetchData();
      }

      let dataJson = JSON.parse(data);
      let dummyData = dataJson["listings"];
      // If the result is empty.
      if (dummyData.length === 0) {
        count += 1;

        /* if the date is empty the second time. To stop it from going in an infinite loop. */
        if (count >= 2) {
          noResultTag.innerText = "";
          let textNode = document.createTextNode(
            "Please wait for the items to be approved if you have created a listing."
          );
          // Show result error message.
          noResultTag.appendChild(textNode);
        } else {
          let textNode = document.createTextNode(
            "Your search did not match any of the items. Please try another Search query. Here are some featured items:"
          );
          noResultTag.appendChild(textNode);

          if (category !== "" || category !== null) {
            localStorage.setItem("wrongCategory", category); // keep the current category persistent.
          } else {
            localStorage.setItem("wrongCategory", "All Categories");
          }
          errorFlag = true;
          fetchData();
        }
      }

      if (noResultTag.innerText === "") {
        let dataLength = dummyData.length;
        document.getElementById("displayCount").textContent = dataLength;
        document.getElementById("resultCount").textContent = dataLength;
      } else {
        // Show 0 count if the response is empty.
        document.getElementById("displayCount").textContent = 0;
        document.getElementById("resultCount").textContent = 0;
      }

      //As the data would be an object
      // TO ensure the same data isn't shown twice.
      if (ulResult.innerText === "") {
        localStorage.setItem("wrongCategory", localStorage.getItem("category"));
        category = localStorage.getItem("wrongCategory");
        dummyData.map(indList => {
          //  Creation of the elements.
          const titleDiv = createDomElement("div");
          const titleBTag = createDomElement("b"); // Bold Tag
          const h2Tag = createDomElement("h2"); // h2 Tag for text
          const h4Tag = createDomElement("h4"); // h4 tag for text
          const imgDivTag = createDomElement("div"); // Div tag to hold the elements.
          const buttonSpanTag = createDomElement("span"); // span tag for the buttons
          const imgTag = createDomElement("img"); // Image tag in the DOM
          imgTag.classList.add("img-fluid", "img-thumbnail");
          const typeTag = createDomElement("p");
          const descriptionTag = createDomElement("p");
          const listingTag = createDomElement("p");
          const priceTag = createDomElement("p");
          const titleTag = createDomElement("p");
          const descriptionDiv = createDomElement("div");
          const buttonTag = createDomElement("button"); // Button tag in the DOM.
          const divTag = createDomElement("div");
          let liTag = createDomElement("li");
          styleLi(liTag);

          buttonTag.innerText = "See More";
          buttonTag.style["margin-right"] = "10px";
          buttonSpanTag.style["width"] = "80%";

          // Redirect to the details page.
          buttonTag.onclick = () => {
            redirectToIndividualListing(
              indList["listing_id"],
              indList["title"]
            );
          };
          /* Styling button */
          buttonSpanTag.classList.add("flex-display-row", "make-responsive");
          buttonTag.classList.add("btn", "btn-warning");

          // Add Image / Thumbnails src if present, else show placeholder image.
          if (indList["thumbnail"] !== null) {
            imgTag.src = indList["thumbnail"];
            imgTag.width = 150;
            imgTag.height = 150;
          } else {
            imgTag.src = "https://via.placeholder.com/150";
          }

          /* Style image div */
          imgDivTag.appendChild(imgTag);
          imgDivTag.style["flex-grow"] = 1;
          imgDivTag.style["cursor"] = "pointer";

          // Redirect to details page on image click.
          imgDivTag.onclick = () => {
            redirectToIndividualListing(
              indList["listing_id"],
              indList["title"]
            );
          };

          // Title Tag and  styling
          titleTag.innerText = indList["title"];
          h2Tag.appendChild(titleTag);
          titleBTag.appendChild(h2Tag);

          // Description and other tags.
          descriptionTag.innerText = indList["description"];
          descriptionDiv.appendChild(descriptionTag);

          // Styling description tag.
          styleDescriptionDiv(descriptionDiv);

          // Description for the item.
          listingTag.innerText = indList["listing_id"];
          listingTag.hidden = true;
          priceTag.innerText = "$" + indList["price"];
          typeTag.innerText = indList["type"];
          h4Tag.appendChild(typeTag);

          // Style tags to remvove padding
          styleTags([listingTag, descriptionTag, titleTag, priceTag]);
          titleDiv.appendChild(titleBTag);

          // Appending elements to the div tag.
          divTag.appendChild(titleDiv);
          divTag.appendChild(listingTag);
          divTag.appendChild(descriptionDiv);
          divTag.appendChild(priceTag);
          buttonSpanTag.appendChild(buttonTag);
          divTag.appendChild(buttonSpanTag);
          styleDiv(divTag);

          // Injecting div tag and image div to the DOM.
          liTag.appendChild(imgDivTag);
          liTag.appendChild(divTag);
          liTag.classList.add("list-group-item");

          // Injecting each li tag to the parent ul tag.
          ulResult.appendChild(liTag);
        });
      }
      // Checking if categories are null. If null replace with empty string.
      if (
        localStorage.getItem("category") !== null ||
        localStorage.getItem("category") !== ""
      ) {
        if (
          localStorage.getItem("wrongCategory") !== null ||
          localStorage.getItem("wrongCategory") !== ""
        ) {
          document.getElementById(
            "selectDropDown"
          ).value = localStorage.getItem("wrongCategory");
        } else {
          document.getElementById(
            "selectDropDown"
          ).value = localStorage.getItem("category");
        }
      } else {
        document.getElementById("selectDropDown").value = "All Categories";
      }
      document.getElementById("queryTag").value = localStorage.getItem("query");
    });
};

const styleTags = element => {
  element.map(elem => {
    elem.classList.add("remove-margin");
  });
};

const styleLi = liTag => {
  liTag.style["display"] = "flex";
  liTag.style["flex-direction"] = "row";
  liTag.style["justify-content"] = "space-around";
};

const styleDiv = divTag => {
  divTag.style["display"] = "flex";
  divTag.style["flex-direction"] = "column";
  divTag.style["justify-content"] = "flex-start";
  divTag.style["width"] = "80%";
  divTag.style["flex-grow"] = 1;
};

// Redirects to the detail.html page showing details about the individual listing.

const redirectToIndividualListing = (id, title) => {
  localStorage.setItem("id", id);
  localStorage.setItem("title", title);
  // Open in a new window.
  window.open(`/details?item=${title}`, "_blank");
};

const styleImgTag = () => {
  imgTag.classList.add("img-fluid", "img-thumbnail");
};

const styleDescriptionDiv = descriptionDiv => {
  descriptionDiv.style["overflow-wrap"] = "break-word";

  descriptionDiv.style["width"] = "100%";
  descriptionDiv.style["height"] = "25%";
};

const clearRows = ulResult => {
  if (ulResult.innerHTML !== null) {
    while (ulResult.firstChild) {
      ulResult.removeChild(ulResult.firstChild);
    }
  }
  return ulResult;
};

const fetchRecommendedListings = async () => {
  let noResultTag = document.getElementById("noResultTag");
  const ulResult = document.getElementById("resultList");
  ulResult.classList.add("list-group");
  let user_id = sessionStorage.getItem("user_id");

  await fetch(`/recommended_listings?user_id=${user_id}`, {
    method: "GET",
    withCredentials: true
  })
    .then(response => {
      if (response === undefined) {
      } else {
        return response.text();
      }
    })
    .then(data => {
      let recommendedListingsObject = JSON.parse(data);
      let recommendedListings = recommendedListingsObject["listings"];
      if (recommendedListings.length == 0) {
        let textNode = document.createTextNode(
          "Your search did not match any of the items. Please try another Search query. You can also take a look at some of these items:"
        );
        noResultTag.appendChild(textNode);
        return;
      }

      recommendedListings.map(indList => {
        //  Creation of the elements.
        const titleDiv = createDomElement("div");
        const titleBTag = createDomElement("b"); // Bold Tag
        const h2Tag = createDomElement("h2"); // h2 Tag for text
        const h4Tag = createDomElement("h4"); // h4 tag for text
        const imgDivTag = createDomElement("div"); // Div tag to hold the elements.
        const buttonSpanTag = createDomElement("span"); // span tag for the buttons
        const imgTag = createDomElement("img"); // Image tag in the DOM
        const brTag = createDomElement("br");
        imgTag.classList.add("img-fluid", "img-thumbnail");
        const typeTag = createDomElement("p");
        const descriptionDiv = createDomElement("div");
        const descriptionTag = createDomElement("p");
        const listingTag = createDomElement("p");
        const priceTag = createDomElement("p");
        const titleTag = createDomElement("p");
        const buttonTag = createDomElement("button"); // Button tag in the DOM.
        buttonTag.innerText = "See More";
        buttonTag.style["margin-right"] = "10px";
        buttonSpanTag.style["width"] = "80%";

        // Redirect to the details page.

        buttonTag.onclick = () => {
          redirectToIndividualListing(indList["listing_id"], indList["title"]);
        };

        buttonSpanTag.classList.add("flex-display-row", "make-responsive");

        buttonTag.classList.add("btn", "btn-warning");
        const divTag = createDomElement("div");
        let liTag = createDomElement("li");
        styleLi(liTag);

        // Add Image / Thumbnails src if present, else show placeholder image.
        if (indList["thumbnail"] !== null) {
          imgTag.src = indList["thumbnail"];
          imgTag.width = 150;
          imgTag.height = 150;
        } else {
          imgTag.src = "https://via.placeholder.com/150";
        }

        imgDivTag.appendChild(imgTag);
        imgDivTag.style["flex-grow"] = 1;
        liTag.appendChild(imgDivTag);

        // Title Tag and  styling
        titleTag.innerText = indList["title"];
        h2Tag.appendChild(titleTag);
        titleBTag.appendChild(h2Tag);

        // Description and other tags.
        descriptionTag.innerText = indList["description"];
        descriptionDiv.appendChild(descriptionTag);
        // Styling description tag.
        styleDescriptionDiv(descriptionDiv);

        listingTag.innerText = indList["listing_id"];
        listingTag.hidden = true;
        priceTag.innerText = "$" + indList["price"];
        typeTag.innerText = indList["type"];
        h4Tag.appendChild(typeTag);

        // Style tags to remvove padding
        styleTags([listingTag, descriptionTag, titleTag, priceTag]);
        titleDiv.appendChild(titleBTag);

        // Injecting elements to the DOM.
        divTag.appendChild(titleDiv);

        divTag.appendChild(listingTag);
        divTag.appendChild(descriptionDiv);
        divTag.appendChild(priceTag);
        buttonSpanTag.appendChild(buttonTag);
        divTag.appendChild(buttonSpanTag);
        styleDiv(divTag);
        divTag.style["flex-grow"] = 1;
        liTag.appendChild(divTag);
        liTag.classList.add("list-group-item");
        ulResult.appendChild(liTag);
      });
    });
};

const generateErrorURL = (query, category, sort_by) => {
  ERROR_URL = `listings?query=${query}&category=${category}&sort_by=${sort_by}`;
};

fetchData();
