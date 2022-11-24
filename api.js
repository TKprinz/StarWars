const starWars_api_url = `https://swapi.dev/api`; // Bygger ihop url för anrop
const starWarsFinalAnswer_api_url = `https://swapi.dev/api/${categoryAnswer}/?/${searchAnswer}}`;
let searchAnswer = skywalker;


async function starWarsApi() { // Skapar funktion för att kunna hämta StarWars

    // Gör ett API-samtal (begäran)
    // och får svaret tillbaka
    const response = await fetch (starWars_api_url);

    // Parsing till JSON-format
    const categoryAnswer = await response.json(); 


    console.log(categoryAnswer);


    // Gör ett API-samtal (begäran)
    // och får svaret tillbaka
    const response_ = await fetch(starWarsFinalAnswer_api_url);
        
    // Parsing till JSON-format
    const categoryAnswer_ = await response_.json();

    console.log(categoryAnswer_);


    // append Categories from API Root answer
    for (const category in categoryAnswer){
    $('#testCategory').append(`<option value="${category}">${category}:</Option>`)
    }
    $('#testButton').on('click',()=> {
    let answer= (`${$('#testCategory').val()}`) 
    let finalCategory = (categoryAnswer[answer])
    console.log (finalCategory)
    })

}

starWarsApi();


