// If statements for listview, depending on what category is choosen
// For-loops are used for printing out either 1 or 99 answers.
// Buttons recieves the value of "i" and uses that value to open singleview later.

const renderListview = (chosenCategory, printOut) => {
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
};
