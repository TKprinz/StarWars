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

  let chosenCategory = `${$("#selectValue").val()}`; // Get chsoen category
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
    // If statements for listview, depending on what category is choosen
    // For-loops are used for printing out either 1 or 99 answers.
    // Buttons recieves the value of "i" and uses that value to open singleview later.
    if (chosenCategory == "people") {
      $("#resultsTable").append(`
        <tr >
          <th>Name</th>
          <th>Birth Year</th>
          <th>Gender</th>
        </tr>`);

      for (let i = 0; i < printOut.length; i++) {
        $("#resultsTable").append(`
          <tr>
            <td>${printOut[i].name}</td>
            <td>${printOut[i].birth_year}</td>
            <td>${printOut[i].gender}</td>
            <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td> 
          </tr>}}`);
      }
    }
    if (chosenCategory == "planets") {
      $("#resultsTable").append(`
      <tr>
        <th>Name</th>
        <th>Population</th>
        <th>Terrain</th>
      </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#resultsTable").append(`
      <tr>
        <td>${printOut[i].name}</td>
        <td>${printOut[i].population}</td>
        <td>${printOut[i].terrain}</td>
        <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td>
      </tr>}}
      `);
      }
    }
    if (chosenCategory == "films") {
      $("#resultsTable").append(`
    <tr>
      <th>Title</th>
      <th>Director</th>
      <th>Release Date</th>
    </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#resultsTable").append(`
    <tr>
      <td>${printOut[i].title}</td>
      <td>${printOut[i].director}</td>
      <td>${printOut[i].release_date}</td>
      <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td>
    </tr>}}
    `);
      }
    }
    if (chosenCategory == "species") {
      $("#resultsTable").append(`
          <tr>
            <th>Name</th>
            <th>Classification</th>
            <th>Language</th>
          </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#resultsTable").append(`
          <tr>
            <td>${printOut[i].name}</td>
            <td>${printOut[i].classification}</td>
            <td>${printOut[i].language}</td>
            <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td>
          </tr>}}
          `);
      }
    }
    if (chosenCategory == "vehicles") {
      $("#resultsTable").append(`
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Vehicle Class</th>
            </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#resultsTable").append(`
            <tr>
              <td>${printOut[i].name}</td>
              <td>${printOut[i].model}</td>
              <td>${printOut[i].vehicle_class}</td>
              <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td>
            </tr>}}
            `);
      }
    }
    if (chosenCategory == "starships") {
      $("#resultsTable").append(`
            <tr>
              <th>Name</th>
              <th>Crew</th>
              <th>Starship Class</th>
            </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#resultsTable").append(`
            <tr>
              <td>${printOut[i].name}</td>
              <td>${printOut[i].crew}</td>
              <td>${printOut[i].starship_class}</td>
              <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td>
            </tr>}}
            `);
      }
    }
    // If statements for singleview
    // Takes the value of button previously given in listview.
    // An eventlistener is waiting for the "More" button to be clicked.
    // (For people, an API request is sent for homeworld name information)
    if (chosenCategory == "people") {
      $(".forSingleView").click(async function () {
        var buttonValue = $(this).val();
        let world = await fetch(`${printOut[buttonValue].homeworld}`);
        let printWorld = await world.json();
        $("#choosenItem").prepend(`
            <tr>
              <td>${printOut[buttonValue].name}</td>
              <td>${printOut[buttonValue].birth_year}</td>
              <td>${printOut[buttonValue].gender}</td>
              <td>${printOut[buttonValue].eye_color}</td>
              <td>${printOut[buttonValue].height}</td>
              <td>${printWorld.name}</td>
              <td>${printOut[buttonValue].starships.length}</td>
            </tr>}}
            `);
        $("#choosenItem").prepend(`
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Birth</th>
        <th scope="col">Gender</th>
        <th scope="col">Eye Color</th>
        <th scope="col">Height</th>
        <th scope="col">Homeworld</th>
        <th scope="col">Starships</th>
      </tr>`);
      });
    }
    if (chosenCategory == "planets") {
      $(".forSingleView").click(function () {
        var buttonValue = $(this).val();
        $("#choosenItem").prepend(`
          <tr>
            <td>${printOut[buttonValue].name}</td>
            <td>${printOut[buttonValue].climate}</td>
            <td>${printOut[buttonValue].diameter}</td>
            <td>${printOut[buttonValue].population}</td>
            <td>${printOut[buttonValue].terrain}</td>
            <td>${printOut[buttonValue].gravity}</td>
            <td>${printOut[buttonValue].orbital_period}</td>
          </tr>}}
          `);
        $("#choosenItem").prepend(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Climate</th>
      <th scope="col">Size</th>
      <th scope="col">Population</th>
      <th scope="col">Terrain</th>
      <th scope="col">Gravity</th>
      <th scope="col">Period</th>
    </tr>`);
      });
    }
    if (chosenCategory == "films") {
      $(".forSingleView").click(function () {
        var buttonValue = $(this).val();
        $("#choosenItem").prepend(`
          <tr>
            <td>${printOut[buttonValue].title}</td>
            <td>${printOut[buttonValue].director}</td>
            <td>${printOut[buttonValue].release_date}</td>
            <td>${printOut[buttonValue].episode_id}</td>
            <td>${printOut[buttonValue].producer}</td>
            <td>${printOut[buttonValue].characters.length}</td>
          </tr>}}
          `);
        $("#choosenItem").prepend(`
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Director</th>
      <th scope="col">Release Date</th>
      <th scope="col">Episode</th>
      <th scope="col">Producers</th>
      <th scope="col">Characters</th>
    </tr>`);
      });
    }
    if (chosenCategory == "species") {
      $(".forSingleView").click(function () {
        var buttonValue = $(this).val();
        $("#choosenItem").prepend(`
          <tr>
            <td>${printOut[buttonValue].name}</td>
            <td>${printOut[buttonValue].classification}</td>
            <td>${printOut[buttonValue].language}</td>
            <td>${printOut[buttonValue].average_height}</td>
            <td>${printOut[buttonValue].average_lifespan}</td>
            <td>${printOut[buttonValue].designation}</td>
            <td>${printOut[buttonValue].eye_colors}</td>
            <td>${printOut[buttonValue].skin_colors}</td>
          </tr>}}
          `);
        $("#choosenItem").prepend(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Classification</th>
      <th scope="col">Language</th>
      <th scope="col">Avg Height</th>
      <th scope="col">Avg Lifespan</th>
      <th scope="col">Designation</th>
      <th scope="col">Eye Colors</th>
      <th scope="col">Skin Colors</th>
    </tr>`);
      });
    }
    if (chosenCategory == "vehicles") {
      $(".forSingleView").click(function () {
        var buttonValue = $(this).val();
        $("#choosenItem").prepend(`
          <tr>
            <td>${printOut[buttonValue].name}</td>
            <td>${printOut[buttonValue].model}</td>
            <td>${printOut[buttonValue].vehicle_class}</td>
            <td>${printOut[buttonValue].length}</td>
            <td>${printOut[buttonValue].manufacturer}</td>
            <td>${printOut[buttonValue].passengers}</td>
            <td>${printOut[buttonValue].cargo_capacity}</td>
          </tr>}}
          `);
        $("#choosenItem").prepend(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Model</th>
      <th scope="col">Vehicle Class</th>
      <th scope="col">Length</th>
      <th scope="col">Manufacturer</th>
      <th scope="col">Passengers</th>
      <th scope="col">Cargo Capacity</th>
    </tr>`);
      });
    }
    if (chosenCategory == "starships") {
      $(".forSingleView").click(function () {
        var buttonValue = $(this).val();
        $("#choosenItem").prepend(`
          <tr>
            <td>${printOut[buttonValue].name}</td>
            <td>${printOut[buttonValue].crew}</td>
            <td>${printOut[buttonValue].starship_class}</td>
            <td>${printOut[buttonValue].manufacturer}</td>
            <td>${printOut[buttonValue].model}</td>
            <td>${printOut[buttonValue].passengers}</td>
            <td>${printOut[buttonValue].length}</td>
          </tr>}}
          `);
        $("#choosenItem").prepend(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Crew</th>
      <th scope="col">Starship Class</th>
      <th scope="col">Manufacturer</th>
      <th scope="col">Model</th>
      <th scope="col">Passengers</th>
      <th scope="col">Length</th>
    </tr>`);
      });
    }

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
