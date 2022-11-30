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

  // append Categories from API Root answer
  for (const category in categoryAnswer) {
    $("#selectValue").append(
      `<option value="${category}">${category}:</Option>`
    );
  }
  return categoryAnswer
}

  $("#searchButton").on("click", async () => {
    let categoryAnswer = await starWarsApi()
    let tableData = document.querySelector("#resultsTable");
    tableData.textContent = "";

    const finalArray = []; // Contains all data from all pages in the search
    let currentPage = 1; // Keeping track of current page for data fetching

    let answer = `${$("#selectValue").val()}`;
    let finalCategory = categoryAnswer[answer];
    let searchValue = $("#search").val();

    let finalCategoryAnswer = await fetch(
      `${finalCategory}?search=${searchValue}`
    );

    let finalAnswer = await finalCategoryAnswer.json();
    console.log(finalAnswer);
    //console.log(finalCategoryAnswer);

    finalAnswer.results.forEach((obj) => {
      //Adding data from first page to an empty array
      finalArray.push(obj);
    });
    console.log(finalArray[0]);
    // Function for multiple pages
    // If counts > 10 means that we need to iterate multiple pages
    if (finalAnswer.count > 10) {
      // If null, next page doesnt exist
      while (finalAnswer.next !== null) {
        currentPage++; // Next page
        // console.log(`Current page: ${currentPage}`);
        let finalCategoryAnswer = await fetch(
          `${finalCategory}?search=${searchValue}&page=${currentPage}`
        );
        finalAnswer = await finalCategoryAnswer.json();
        console.log(finalAnswer.results);
        finalAnswer.results.forEach((obj) => {
          finalArray.push(obj); // Push data on current page to "finalArray"
        });
      }
    }

    console.log(finalArray);
    let printOut = finalArray;

    //////////////////////////////////////////försökt dela upp funktionen här men lyckas inte.
    console.log(answer);
    
    if (answer == "people") {
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
    if (answer == "planets") {
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
    if (answer == "films") {
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
    if (answer == "species") {
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
    if (answer == "vehicles") {
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
    if (answer == "starships") {
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
    $('button').click(function(){
      var clicked_button= $(this).val();
      console.log(clicked_button)
      $('#singleView').append(`
      <p> ${JSON.stringify(printOut[clicked_button])} </p>`)
    })
  });

starWarsApi();

