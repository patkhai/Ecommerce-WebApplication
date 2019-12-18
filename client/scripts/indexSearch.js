/*
 * @Author: aadityac15
 * @Date:   2019-11-12 02:03:04
 * @Last Modified by: aadityac15
 * @Last Modified time: 2019-12-16 11:32:24
 * @Description : Redirect the page to the result page. The categories are put in from the categories.csv.
 */

// used in landingPage.js

/// used in landingPage.js

const enterToSearch = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    // document.getElementById("searchBtn").click();
    fetchData();
  }
};

const redirectToResult = () => {
  localStorage.removeItem('query');
  const selectDropDownElement = document.getElementById("selectDropDown");
  const category =
    selectDropDownElement.options[selectDropDownElement.selectedIndex].value;
  let query = document.getElementById("queryTag").value;

  // Store the query and the category in the localStorage and redirect to the /results page to display the results.
  localStorage.setItem("query", query);
  localStorage.setItem("category", category);
  window.location.pathname = "/results";
};

const redirectToRecommended = () => {
  window.location.pathname = "/recommended";
};

const loadDropDown = async () => {
  const selectDropDownElement = document.getElementById("selectDropDown");
  const sellListingDropDown = document.getElementById(
    "sellListingSelectDropdown"
  );
  if (selectDropDownElement.length === 0) {
    await fetch("/categories", {
      method: "GET"
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        const jsonData = JSON.parse(data);
        categoryArray = jsonData["categories"];
        categoryArray.map(category => {
          let option = document.createElement("option");
          option.value = category;
          option.text = category;
          selectDropDownElement.add(option);

          // For the categories on the landing page.
          if (document.getElementById(category)) {
            document.getElementById(category).textContent = category;
            document.getElementById(category).addEventListener("click", () => {
              localStorage.setItem("category", category);
              localStorage.setItem("wrongCategory", category);
              localStorage.setItem("query", "");
              window.location.pathname = "/results";
            });
          }
          // For categories in the selling page dropdown.
          if (sellListingDropDown !== null) {
            let option = document.createElement("option");
            option.value = category;
            option.text = category;
            sellListingDropDown.add(option);
          }
        });
      });
  }
};

loadDropDown();
