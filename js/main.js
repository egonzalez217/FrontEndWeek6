//class for a car and constructor to create a new car with properties of a make and a model
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

//class for a garage and constructor to create a new garage with properties of an id, name, and array of cars
class Garage {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.cars = [];
  }

  //Add car to array of cars
  addCar(car) {
    this.cars.push(car);
  }

  //delete car from array of cars based of the index and only remove one using splice(index, 1)
  deleteCar(car) {
    let index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
  }
}

let garages = [];
let garageId = 0;

//Push a new garage and increment the id of the garage automatically upon clicking on component that utilizes onClick
onClick("new-garage", () => {
  garages.push(new Garage(garageId++, getValue("new-garage-name")));
  drawDOM();
});

//Get html component based off its html id upon click action
function onClick(id, action) {
  let element = document.getElementById(id);
  element.addEventListener("click", action);
  return element;
}

//Get Value from html component based off its html id
function getValue(id) {
  return document.getElementById(id).value;
}

// essnetialy creating the contents of the webpage with relation to the table of garages and the necessary organization of the html elements for the given data
//  assoicated with cars of the given garage
function drawDOM() {
  let garageDiv = document.getElementById("garages");
  clearElement(garageDiv);
  for (garage of garages) {
    let table = createGarageTable(garage);
    let title = document.createElement("h2");
    title.innerHTML = garage.name;
    title.appendChild(createDeleteGarageButton(garage));
    garageDiv.appendChild(title);
    garageDiv.appendChild(table);
    for (car of garage.cars) {
      createCarRow(garage, table, car);
    }
  }
}

//creates a new row for a car with the buttons necessary to take action on the row for deleting or editing
function createCarRow(garage, table, car) {
  let row = table.insertRow(2);
  row.insertCell(0).innerHTML = car.make;
  row.insertCell(1).innerHTML = car.model;
  let actions = row.insertCell(2);
  actions.appendChild(createDeleteRowButton(garage, car));
  actions.appendChild(createEditCarButton(garage, car));
}

// create a delete button inside of a row in a table that then deletes the car from the garage by grabbing its index from within the array and using that position to remove one element (the car)
function createDeleteRowButton(garage, car) {
  let btn = document.createElement("button");
  btn.className = "btn btn-danger";
  btn.innerHTML = "Remove Car";
  btn.onclick = () => {
    let index = garage.cars.indexOf(car);
    garage.cars.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createEditCarButton(garage, car) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary btn-custom";
  btn.innerHTML = "Change Car";
  btn.onclick = () => {
    let index = garage.cars.indexOf(car);
    garage.cars[index].make = getValue("make-input-${garage.id}");
    garage.cars[index].model = getValue("model-input-${garage.id}");
    console.log(garage.cars[index].make);
    console.log(garage.cars[index].model);

    drawDOM();
  };
  return btn;
}

//create the button to delete an entire garage from within the array of given garages
function createDeleteGarageButton(garage) {
  let btn = document.createElement("button");
  btn.className = "btn btn-danger btn-custom";
  btn.innerHTML = "Remove Garage";
  btn.onclick = () => {
    let index = garages.indexOf(garage);
    garages.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createNewCarButton(garage) {
  let btn = document.createElement("button");
  btn.className = "btn btn-success";
  btn.innerHTML = "Add New Car";
  btn.onclick = () => {
    garage.cars.push(
      new Car(
        getValue("make-input-${garage.id}"),
        getValue("model-input-${garage.id}")
      )
    );
    drawDOM();
  };
  return btn;
}

function createGarageTable(garage) {
  let table = document.createElement("table");
  table.setAttribute("class", "table table-dark table-striped");
  let row = table.insertRow(0);

  let makeColumn = document.createElement("th");
  let modelColumn = document.createElement("th");

  makeColumn.innerHTML = "Make";
  modelColumn.innerHTML = "Model";

  row.appendChild(makeColumn);
  row.appendChild(modelColumn);

  let formRow = table.insertRow(1);

  let makeTh = document.createElement("th");
  let modelTh = document.createElement("th");
  let createTh = document.createElement("th");

  let makeInput = document.createElement("input");
  makeInput.setAttribute("id", "make-input-${garage.id}");
  makeInput.setAttribute("type", "text");
  makeInput.setAttribute("class", "form-control");

  let modelInput = document.createElement("input");
  modelInput.setAttribute("id", "model-input-${garage.id}");
  modelInput.setAttribute("type", "text");
  modelInput.setAttribute("class", "form-control");

  let newCarButton = createNewCarButton(garage);

  makeTh.appendChild(makeInput);
  modelTh.appendChild(modelInput);
  createTh.appendChild(newCarButton);

  formRow.appendChild(makeTh);
  formRow.appendChild(modelTh);
  formRow.appendChild(createTh);

  console.log(garage.id);
  return table;
}

//removes element so long as the element exists
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
