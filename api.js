const starWars_api_url = `https://swapi.dev/api`; // Bygger ihop url för anrop

async function starWarsApi() {
  // Skapar funktion för att kunna hämta StarWars

  // Gör ett API-samtal (begäran)
  // och får svaret tillbaka
  const response = await fetch(starWars_api_url);

  // Parsing till JSON-format
  const categoryAnswer = await response.json();

  console.log(categoryAnswer);

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
    console.log(finalCategoryAnswer);
  });

}
starWarsApi();
