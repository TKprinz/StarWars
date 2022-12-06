// If statements for singleview
// Takes the value of button previously given in listview.
// An eventlistener is waiting for the "More" button to be clicked.
// When clicked, the correct data will be shown for the correct category.
// (For people, an API request is sent for homeworld name information)

const renderSingleview = (chosenCategory, printOut) => {
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
};
