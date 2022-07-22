"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const btnShowHealthyPet = document.getElementById("healthy-btn");

const petArr = [];
const tableBodyEl = document.getElementById("tbody");
//Clear input
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = "";
  dewormedInput.checked = "";
  sterilizedInput.checked = "";
};
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let pet = petArr[i];
    const row = document.createElement("tr");
    row.innerHTML = `<th>${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.length} cm</td>
    <td>${pet.breed}</td>
    <td><i class = "bi bi-square-fill" style = "color: ${pet.color}"></i></td>
    <td><i class="bi ${
      pet.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td id="bmi-calc">${pet.bmi}</td>
    <td>${pet.date.getDay()} / ${pet.date.getMonth()} / ${pet.date.getFullYear()}</td>
    <td><button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${
      pet.id
    }">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  }
};
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    length: lengthInput.value,
    weight: weightInput.value,
    date: new Date(),
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    name: nameInput.value,
  };
  const validateData = function () {
    let check = true;
    if (data.id !== null) {
      for (let i = 0; i < petArr.length; i++) {
        if (data.id === petArr[i].id) {
          check = false;
          alert("ID must be unique");
        }
      }
    } else {
      check = false;
      alert("Please input for ID");
    }
    if (data.name === "") {
      check = false;
      alert("Please input for name");
    }
    if (data.age === "") {
      check = false;
      alert("Please input for age");
    }
    if (data.type === "Select Type") {
      check = false;
      alert("Please select type");
    }
    if (data.weight === "") {
      check = false;
      alert("Please input for weight");
    }
    if (data.length === "") {
      check = false;
      alert("Please input for length");
    }
    if (data.breed === "Select Breed") {
      check = false;
      alert("Please select breed");
    }
    if (data.age < 1 && data.age > 15) {
      check = false;
      alert("Age must be between 1 and 15");
    }
    if (data.weight < 1 && data.weight > 15) {
      check = false;
      alert("Weight must be between 1 and 15");
    }
    if (data.length < 1 && data.length > 100) {
      check = false;
      alert("Length must be between 1 and 100");
    }
    return check;
  };

  let validate = validateData();
  if (validate) {
    petArr.push(data);
    clearInput();
    for (let i = 0; i < petArr.length; i++) {
      console.log(petArr[i]);
    }
    renderTableData(petArr);
  }
});
//xóa pet
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id == "btn-delete") {
    const Id = e.target.getAttribute("data-id");
    if (!Id) return;
    const isConfirm = confirm("Are you sure to delete this pet?");
    if (!isConfirm) return;
    console.log(`Delete pet with id = ${Id}`);
    for (var i = 0; i < petArr.length; i++) {
      if (petArr[i].id === Id) {
        petArr.splice(i, 1);
      }
    }
  }
  renderTableData(petArr);
});
// show pet khỏe mạnh
let healthyCheck = false;
btnShowHealthyPet.addEventListener("click", function () {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    btnShowHealthyPet.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    btnShowHealthyPet.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});
