const starWars_api_url = `https://swapi.dev/api`; // Base URL for calls
let categories; // This will hold categories that will be rendered in the dropdown select menu

// Init - fetching categories
const init = () => {
  fetch(starWars_api_url) // API call for fetching categories
    .then((res) => res.json()) // Parsing from JSON string to javascript object
    .then((result) => {
      categories = result;
      // Populating options in dropdown select menu
      for (const category in result) {
        $("#selectValue").append(
          `<option value="${category}">${category}</Option>`
        );
      }
    });
};
init();

// Eventlistener for searchbutton - Clear singleview from data and remove hidden class for listview
$("#searchButton").on("click", async () => {
  $("#choosenItem").text(""); // Hiding singleview
  document.getElementById("resultsTable").classList.remove("hide"); // Showing listview

  $(".spinner").removeClass("spinner-hidden"); // Loading starting, showing spinner

  let tableData = document.querySelector("#resultsTable");
  tableData.textContent = ""; // Clear listview from data

  const finalArray = []; // Contains all data from all pages in the search
  let currentPage = 1; // Keeping track of current page for data fetching

  let chosenCategory = `${$("#selectValue").val()}`; // Get chosen category
  let categoryUrl = categories[chosenCategory];
  let searchValue = $("#search").val(); // Get searchstring

  let searchCategoryResult = await fetch(
    // Get searchresult
    `${categoryUrl}?search=${searchValue}`
  );

  let searchCategoryResultJson = await searchCategoryResult.json(); // Parsing from JSON string to javascript object

  //Adding data from first page to an empty array
  searchCategoryResultJson.results.forEach((obj) => {
    finalArray.push(obj);
  });

  // If result contains more than 10 answers, we iterate through all pages with data.
  // While next page isn´t null, push data from current page to "finalArray" that contains all data
  if (searchCategoryResultJson.count > 10) {
    while (searchCategoryResultJson.next !== null) {
      currentPage++; // Next page;
      let searchCategoryResult = await fetch(
        `${categoryUrl}?search=${searchValue}&page=${currentPage}`
      );
      searchCategoryResultJson = await searchCategoryResult.json();
      searchCategoryResultJson.results.forEach((obj) => {
        finalArray.push(obj);
      });
    }
  }

  let printOut = finalArray; // Copy and renaming

  $(".spinner").addClass("spinner-hidden"); // Loading finished, hiding spinner

  // Checking if we got any hits on the search. If not, a notification is shown
  if (finalArray.length == 0) {
    $("#resultsTable").append(`
    <tr>
      <td>No match!</td>
    </tr>}}`);
  } else {
    // Send categorydata to renderlistview and renderSingleview functions
    renderListview(chosenCategory, printOut);
    renderSingleview(chosenCategory, printOut);

    // Eventlistener for "More" button.
    // Hides listview, shows singleview
    $(".forSingleView").click(function () {
      if ($("#choosenItem").hasClass("hide")) {
        document.getElementById("choosenItem").classList.remove("hide");
      }
      document.getElementById("resultsTable").classList.add("hide");

      $("#choosenItem").append(`
    <button id="goBack" class="btn btn-warning btn-block m-3">Back</button>`); // Adding "Back" button

      // Eventlistener for "Back" button.
      // Showing listview, hiding singleview and clears old singleview data
      $("#goBack").click(function () {
        document.getElementById("resultsTable").classList.remove("hide");
        document.getElementById("choosenItem").classList.add("hide");

        $("#choosenItem").text("");
      });
    });
  }
});
