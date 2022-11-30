// $(document).ready((event) => {
//   $("#searchButton").on("click", () => {
//     renderCharacter($("#testInput").val());
//   });
// });

//? Detta är en fetchfunktion för att inte behöva repetera fetch:es. Får svar och returnerar.
// let getData = async (url) => {
//   let response = await fetch(url);
//   console.log("Fetch returned " + response.status);
//   if (response.ok) {
//     console.log("Fetch gick bra");
//   }
//   let data = await response.json();
//   return data;
// };

const starWars_api_url = `https://swapi.dev/api`; // Bygger ihop url för anrop
let categories;

fetch(starWars_api_url)
  .then((res) => res.json())
  .then((result) => {
    categories = result;
    for (const category in result) {
      $("#selectValue").append(
        `<option value="${category}">${category}:</Option>`
      );
    }
  });

async function starWarsApi() {
  // Skapar funktion för att kunna hämta StarWars

  // Gör ett API-samtal (begäran)
  // och får svaret tillbaka
  const response = await fetch(starWars_api_url);

  // Parsing till JSON-format
  const categoryAnswer = await response.json();

  console.log(categoryAnswer);
  // let categoryAnswer = {
  //   People: "People",
  //   Planets: "Planets",
  //   Starships: "Starships",
  // };

  // Clear options
  $(".form-select");

  // append Categories from API Root answer
  for (const category in categoryAnswer) {
    $("#selectValue").append(
      `<option value="${category}">${category}:</Option>`
    );
  }
  return categoryAnswer;
}

$("#searchButton").on("click", async () => {
  // Clear singleview from data and remove hidden class for listview
  $("#singleView").text("");
  document.getElementById("resultsTable").classList.remove("listview-hidden");

  $(".spinner").removeClass("spinner-hidden"); // Loading starting, showing spinner

  //let categoryAnswer = await (fetchCategories);
  let tableData = document.querySelector("#resultsTable");
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
  console.log(searchCategoryResultJson);
  //console.log(searchCategoryResult);

  searchCategoryResultJson.results.forEach((obj) => {
    //Adding data from first page to an empty array
    finalArray.push(obj);
  });
  console.log(finalArray[0]);
  // Function for multiple pages
  // If counts > 10 means that we need to iterate multiple pages
  if (searchCategoryResultJson.count > 10) {
    // If null, next page doesnt exist
    while (searchCategoryResultJson.next !== null) {
      currentPage++; // Next page
      // console.log(`Current page: ${currentPage}`);
      let searchCategoryResult = await fetch(
        `${categoryUrl}?search=${searchValue}&page=${currentPage}`
      );
      searchCategoryResultJson = await searchCategoryResult.json();
      console.log(searchCategoryResultJson.results);
      searchCategoryResultJson.results.forEach((obj) => {
        finalArray.push(obj); // Push data on current page to "finalArray"
      });
    }
  }

  console.log(finalArray);
  let printOut = finalArray;
  // Loading finished, hiding spinner
  $(".spinner").addClass("spinner-hidden");

  //////////////////////////////////////////försökt dela upp funktionen här men lyckas inte.
  console.log(chosenCategory);

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
            <td><button class="forSingleView" value="${i}">More</button</td>
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
        <td><button class="forSingleView" value="${i}">More</button</td>
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
      <td><button class="forSingleView" value="${i}">More</button</td>
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
            <td><button class="forSingleView" value="${i}">More</button</td>
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
              <td><button class="forSingleView" value="${i}">More</button</td>
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
              <td><button class="forSingleView" value="${i}">More</button</td>
            </tr>}}
            `);
    }
  }

  if (chosenCategory == "people") {
    $(".forSingleView").click(function () {
      $("#choosenItem").append(`
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Birth</th>
        <th scope="col">Gender</th>
        <th scope="col">Eye Color</th>
        <th scope="col">Height</th>
        <th scope="col">Homeworld</th>
        <th scope="col">Starships</th>
      </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#choosenItem").append(`
              <tr>
                <td>${printOut[i].name}</td>
                <td>${printOut[i].birth_year}</td>
                <td>${printOut[i].gender}</td>
                <td>${printOut[i].eye_color}</td>
                <td>${printOut[i].height}</td>
                <td>${printOut[i].homeworld}</td>
                <td>${printOut[i].starships.length}</td>
              </tr>}}
              `);
      }
    });
  }

  if (chosenCategory == "planets") {
    $(".forSingleView").click(function () {
      $("#choosenItem").append(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Climate</th>
      <th scope="col">Size</th>
      <th scope="col">Population</th>
      <th scope="col">Terrain</th>
      <th scope="col">Gravity</th>
      <th scope="col">Period</th>
    </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#choosenItem").append(`
            <tr>
              <td>${printOut[i].name}</td>
              <td>${printOut[i].climate}</td>
              <td>${printOut[i].diameter}</td>
              <td>${printOut[i].population}</td>
              <td>${printOut[i].terrain}</td>
              <td>${printOut[i].gravity}</td>
              <td>${printOut[i].obital_period}</td>
            </tr>}}
            `);
      }
    });
  }
  if (chosenCategory == "films") {
    $(".forSingleView").click(function () {
      $("#choosenItem").append(`
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Director</th>
      <th scope="col">Release Date</th>
      <th scope="col">Episode</th>
      <th scope="col">Producers</th>
      <th scope="col">Characters</th>
      <th scope="col">Period</th>
    </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#choosenItem").append(`
            <tr>
              <td>${printOut[i].title}</td>
              <td>${printOut[i].director}</td>
              <td>${printOut[i].release_date}</td>
              <td>${printOut[i].episode_id}</td>
              <td>${printOut[i].producer}</td>
              <td>${printOut[i].characters.length}</td>
              <td>${printOut[i].obital_period}</td>
            </tr>}}
            `);
      }
    });
  }
  if (chosenCategory == "species") {
    $(".forSingleView").click(function () {
      $("#choosenItem").append(`
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
      for (let i = 0; i < printOut.length; i++) {
        $("#choosenItem").append(`
            <tr>
              <td>${printOut[i].name}</td>
              <td>${printOut[i].classification}</td>
              <td>${printOut[i].language}</td>
              <td>${printOut[i].average_height}</td>
              <td>${printOut[i].average_lifespan}</td>
              <td>${printOut[i].designation}</td>
              <td>${printOut[i].eye_colors}</td>
              <td>${printOut[i].skin_colors}</td>
            </tr>}}
            `);
      }
    });
  }
  if (chosenCategory == "vehicles") {
    $(".forSingleView").click(function () {
      $("#choosenItem").append(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Model</th>
      <th scope="col">Vehicle Class</th>
      <th scope="col">Length</th>
      <th scope="col">Manufacturer</th>
      <th scope="col">Passengers</th>
      <th scope="col">Cargo Capacity</th>
    </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#choosenItem").append(`
            <tr>
              <td>${printOut[i].name}</td>
              <td>${printOut[i].model}</td>
              <td>${printOut[i].vehicle_class}</td>
              <td>${printOut[i].length}</td>
              <td>${printOut[i].manufacturer}</td>
              <td>${printOut[i].passengers}</td>
              <td>${printOut[i].cargo_capacity}</td>
            </tr>}}
            `);
      }
    });
  }
  if (chosenCategory == "starships") {
    $(".forSingleView").click(function () {
      $("#choosenItem").append(`
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Crew</th>
      <th scope="col">Starship Class</th>
      <th scope="col">Manufacturer</th>
      <th scope="col">Model</th>
      <th scope="col">Passengers</th>
      <th scope="col">Length</th>
    </tr>`);
      for (let i = 0; i < printOut.length; i++) {
        $("#choosenItem").append(`
            <tr>
              <td>${printOut[i].name}</td>
              <td>${printOut[i].crew}</td>
              <td>${printOut[i].starship_class}</td>
              <td>${printOut[i].manufacturer}</td>
              <td>${printOut[i].model}</td>
              <td>${printOut[i].passengers}</td>
              <td>${printOut[i].length}</td>
            </tr>}}
            `);
      }
    });
  }

  $(".forSingleView").click(function () {
    if ($("#choosenItem").hasClass("hide")) {
      document.getElementById("choosenItem").classList.remove("hide");
    }

    // Hide listview
    document.getElementById("resultsTable").classList.add("hide");

    var clicked_button = $(this).val();
    console.log(clicked_button);
    // $("#chosenItem").append(`
    // <p> ${JSON.stringify(printOut[clicked_button])} </p>`);

    $("#choosenItem").append(`
    <button id="goBack" class="btn btn-warning btn-block mx-auto">Back</button>`);

    // Go back from singleview, button eventlistener
    $("#goBack").click(function () {
      // Showing listview, hiding singleview
      document.getElementById("resultsTable").classList.remove("hide");
      document.getElementById("choosenItem").classList.add("hide");

      // Clear old singleview data
      $("#choosenItem").text("");

      console.log("clicked goback button");
    });
  });
});

//starWarsApi();
