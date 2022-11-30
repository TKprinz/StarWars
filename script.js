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
let categories

fetch(starWars_api_url)
  .then(res => res.json())
  .then(result => {
    categories = result
    for (const category in result) {
      $("#selectValue").append(
        `<option value="${category}">${category}:</Option>`
      );
    }
  })

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

  $(".forSingleView").click(function () {
    if ($("#singleView").hasClass("singleview-hidden")) {
      document
        .getElementById("singleView")
        .classList.remove("singleview-hidden");
    }

    // Clear old singleview data
    $("#singleView").text("");

    // Hide listview
    document.getElementById("resultsTable").classList.add("listview-hidden");

    var clicked_button = $(this).val();
    console.log(clicked_button);
    $("#singleView").append(`
    <p> ${JSON.stringify(printOut[clicked_button])} </p>`);

    $("#singleView").append(`
    <button id="goBack" class="btn btn-warning btn-block mx-auto">Back</button>`);

    // Go back from singleview, button eventlistener
    $("#goBack").click(function () {
      // Showing listview, hiding singleview
      document
        .getElementById("resultsTable")
        .classList.remove("listview-hidden");
      document.getElementById("singleView").classList.add("singleview-hidden");

      console.log("clicked goback button");
    });
  });
});

//starWarsApi();
