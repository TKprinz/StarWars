// $(document).ready((event) => {
//   $("#testButton").on("click", () => {
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
    $("#testCategory").append(
      `<option value="${category}">${category}:</Option>`
    );
  }
  $("#testButton").on("click", async () => {
    let answer = `${$("#testCategory").val()}`;
    let finalCategory = categoryAnswer[answer];
    let searchValue = $("#search").val();

    let finalCategoryAnswer = await fetch(
      `${finalCategory}?search=${searchValue}`
    );
    const finalAnswer = await finalCategoryAnswer.json();
    console.log(finalAnswer.results);
    //console.log(finalCategoryAnswer);
    let printOut = finalAnswer.results

    console.log(answer)
    if (answer == "people"){
      $("#testTable").append(`
        <tr>
          <th>Name</th>
          <th>Birth Year</th>
          <th>Gender</th>
        </tr>`)
      for(let i=0; i<printOut.length; i++){
        $("#testTable").append(`
          <tr>
            <td><button class="forSingleView">${printOut[i].name}</button></td>
            <td>${printOut[i].birth_year}</td>
            <td>${printOut[i].gender}</td>
          </tr>}}`)
    }}
    if (answer == "planets"){
      $("#testTable").append(`
      <tr>
        <th>Name</th>
        <th>Population</th>
        <th>Terrain</th>
      </tr>`)
      for(let i=0; i<printOut.length; i++){
      $("#testTable").append
      (`
      <tr>
        <td><button class="forSingleView">${printOut[i].name}</button></td>
        <td>${printOut[i].population}</td>
        <td>${printOut[i].terrain}</td>
      </tr>}}
      `)
      }}
    if (answer == "films"){
      $("#testTable").append(`
    <tr>
      <th>Title</th>
      <th>Director</th>
      <th>Release Date</th>
    </tr>`)
    for(let i=0; i<printOut.length; i++){
    $("#testTable").append
    (`
    <tr>
      <td><button class="forSingleView">${printOut[i].title}</button></td>
      <td>${printOut[i].director}</td>
      <td>${printOut[i].release_date}</td>
    </tr>}}
    `)
    }}
    if (answer == "species"){
          $("#testTable").append(`
          <tr>
            <th>Name</th>
            <th>Classification</th>
            <th>Language</th>
          </tr>`)
          for(let i=0; i<printOut.length; i++){
          $("#testTable").append
          (`
          <tr>
            <td><button class="forSingleView">${printOut[i].name}</button></td>
            <td>${printOut[i].classification}</td>
            <td>${printOut[i].language}</td>
          </tr>}}
          `)
          }}
          if (answer == "vehicles"){
            $("#testTable").append(`
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Vehicle Class</th>
            </tr>`)
            for(let i=0; i<printOut.length; i++){
            $("#testTable").append
            (`
            <tr>
              <td><button class="forSingleView">${printOut[i].name}</button></td>
              <td>${printOut[i].model}</td>
              <td>${printOut[i].vehicle_class}</td>
            </tr>}}
            `)
            } }
            if (answer == "starships"){    $("#testTable").append(`
            <tr>
              <th>Name</th>
              <th>Crew</th>
              <th>Starship Class</th>
            </tr>`)
            for(let i=0; i<printOut.length; i++){
            $("#testTable").append
            (`
            <tr>
              <td><button class="forSingleView">${printOut[i].name}</button></td>
              <td>${printOut[i].crew}</td>
              <td>${printOut[i].starship_class}</td>
            </tr>}}
            `)
            }}
      
  });

  // https://swapi.dev/api/?/&=${finalcategory}
}
starWarsApi();