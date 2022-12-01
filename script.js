
const starWars_api_url = `https://swapi.dev/api`; // Bygger ihop url för anrop
let categories;

fetch(starWars_api_url)
  .then((res) => res.json())
  .then((result) => {
    categories = result;
    for (const category in result) {
      $("#selectValue").append(
        `<option value="${category}">${category}</Option>`
      );
    }
  });

async function starWarsApi() { // Function for API request and printing Categories in DOM

  const response = await fetch(starWars_api_url); // Makes API-request and awaits response

  const categoryAnswer = await response.json();   // Parsing till JSON-format

  $(".form-select");  // Clear options

  for (const category in categoryAnswer) {   // append Categories from API Root answer
    $("#selectValue").append(
      `<option value="${category}">${category}:</Option>`
    );
  }
  return categoryAnswer;
}

$("#searchButton").on("click", async () => {   // Clear singleview from data and remove hidden class for listview
  $("#choosenItem").text("");
  document.getElementById("resultsTable").classList.remove("hide");

  $(".spinner").removeClass("spinner-hidden"); // Loading starting, showing spinner

  let tableData = document.querySelector("#resultsTable"); //let categoryAnswer = await (fetchCategories);
  tableData.textContent = "";

  const finalArray = []; // Contains all data from all pages in the search
  let currentPage = 1; // Keeping tra4ck of current page for data fetching

  let chosenCategory = `${$("#selectValue").val()}`;
  let categoryUrl = categories[chosenCategory];
  let searchValue = $("#search").val();

  let searchCategoryResult = await fetch(
    `${categoryUrl}?search=${searchValue}`
  );

  let searchCategoryResultJson = await searchCategoryResult.json();

  searchCategoryResultJson.results.forEach((obj) => {     //Adding data from first page to an empty array
    finalArray.push(obj);
  });

  if (searchCategoryResultJson.count > 10) {    // If null, next page doesnt exist
    while (searchCategoryResultJson.next !== null) {
      currentPage++; // Next page;
      let searchCategoryResult = await fetch(
        `${categoryUrl}?search=${searchValue}&page=${currentPage}`
      );
      searchCategoryResultJson = await searchCategoryResult.json();
      searchCategoryResultJson.results.forEach((obj) => {
        finalArray.push(obj); // Push data on current page to "finalArray"
      });
    }
  }

  let printOut = finalArray;

  $(".spinner").addClass("spinner-hidden");   // Loading finished, hiding spinner

  if (finalArray.length == 0) { // Checking if we got any hits on the search
    $("#resultsTable").append(`
    <tr>
      <td>No match!</td>
    </tr>}}`);
  } else {
    //////////////////////////////////////////försökt dela upp funktionen här men lyckas inte.////////////////////////////////////////////

    if (chosenCategory == "people") { // If statements depending on what Category is choosen
      $("#resultsTable").append(`
        <tr >
          <th>Name</th>
          <th>Birth Year</th>
          <th>Gender</th>
        </tr>`);
      for (let i = 0; i < printOut.length; i++) { //For loops for printing out either 1 or 99 answers.
        $("#resultsTable").append(`
          <tr>
            <td>${printOut[i].name}</td>
            <td>${printOut[i].birth_year}</td>
            <td>${printOut[i].gender}</td>
            <td><button class="forSingleView btn btn-dark" value="${i}">More</button</td> 
          </tr>}}`); // Button recieves the value of I and uses that value to open singleview later.
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

    if (chosenCategory == "people") { // IF statements for SINGLEVIEW
      $(".forSingleView").click(async function () {
        var buttonValue = $(this).val(); // Takes the value of button previously given
        let world = await fetch(`${printOut[buttonValue].homeworld}`); // Sends API request for people with a homeworld
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

    $(".forSingleView").click(function () {
      if ($("#choosenItem").hasClass("hide")) {
        document.getElementById("choosenItem").classList.remove("hide");
      }
      document.getElementById("resultsTable").classList.add("hide");       // Hide listview

      //var clicked_button = $(this).val();

      $("#choosenItem").append(`
    <button id="goBack" class="btn btn-warning btn-block m-3">Back</button>`);


      $("#goBack").click(function () { // Go back from singleview, button eventlistener
        // Showing listview, hiding singleview
        document.getElementById("resultsTable").classList.remove("hide");
        document.getElementById("choosenItem").classList.add("hide");

        // Clear old singleview data
        $("#choosenItem").text("");
      });
    });
  }
});
