//filter students
const students = [
  {
    id: 1,
    name: "Hermione Granger",
    house: "Ravenclaw",
  },
  {
    id: 2,
    name: "Ron Weasley",
    house: "Hufflepuff",
  },
  {
    id: 3,
    name: "Draco Malfoy",
    house: "Slytherin",
  },

  {
    id: 4,
    name: "Harry Potter",
    house: "Gryffindor",
  },
{
  id: 5,
  name: "Ginny Weasley",
  house: "Slytherin",
}
];

const hogwartsHouses = ["Gryffindor", "Hufflepuff", "Slytherin", "Ravenclaw"];
const expelledStudents = [];

//render to DOM utility function
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

//cards on DOM
const cardsOnDom = (array) => {
  let domString = "";
  for (const item of array) {
    domString += 
    `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <h5>${item.house}</h5>
    </div>
    <button class="btn btn-danger" id="expel--${item.id}">Expel!</button>
  </div>`
  }
 renderToDom("#first-years", domString);
};

const expelledOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += 
    `<div class="card mb-3" style="width: 14rem;">
      <div class="card-body">
        <h5 class="card-tite">Sadly, ${student.name} has moved to the dark side</h5>
        <button id="redeem--${student.id}" class="btn btn-primary">Bring Back!</button>
      </div>
    </div>`
  }
  renderToDom("#dark-side", domString);
};

//filter students via houses
const filter = (students, typeString) => {
  const houseArray = []
  for (const student of students) {
    if (student.house === typeString) {
      houseArray.push(student);
    }}
  return houseArray;
};

//student buttons event listner
const showAllButton = document.querySelector("#all");
const showGryffindorButton = document.querySelector("#gryffindor");
const showHufflepuffButton = document.querySelector("#hufflepuff");
const showRavenclawButton = document.querySelector("#ravenclaw");
const showSlytherinButton = document.querySelector("#slytherin");
//click event to show cards
showAllButton.addEventListener("click", () => {
  cardsOnDom(students);
});
showGryffindorButton.addEventListener("click", () => {
  const gryffindorHouse = filter(students, "Gryffindor");
  cardsOnDom(gryffindorHouse);
});
showHufflepuffButton.addEventListener("click", () => {
  const hufflepuffHouse = filter(students, "Hufflepuff");
  cardsOnDom(hufflepuffHouse);
});
showRavenclawButton.addEventListener("click", () => {
  const ravenclawHouse = filter(students, "Ravenclaw");
  cardsOnDom(ravenclawHouse);
});
showSlytherinButton.addEventListener("click", () => {
  const slytherinHouse = filter(students, "Slytherin");
  cardsOnDom(slytherinHouse);
});

//create new students function
const createStudent = (e) => {
  e.preventDefault();
  const studentName = document.getElementById("student");
  const newStudent = {
    name: studentName.value,
    house: hogwartsHouses[Math.floor(Math.random()*hogwartsHouses.length)],
  };
  students.push(newStudent);
  cardsOnDom(students);
};

//button for sorting new students
const sortButton = document.querySelector("#form-submit");
sortButton.addEventListener("click", createStudent);

//expel button function
document.querySelector("#first-years").addEventListener("click", (e) => {
      if (e.target.id.includes("expel")) {
        const [, int] = e.target.id.split("--");
        const index = students.findIndex(
          (student) => student.id === Number(int)
        );

        const expelledStudent = students.splice(index, 1)[0];
        expelledStudents.push(expelledStudent);
        expelledOnDom(expelledStudents);
        cardsOnDom(students);
      }
    });

  document.querySelector("#dark-side").addEventListener("click", (e) => {
      if (e.target.id.includes("redeem")) {
        const [, int] = e.target.id.split("--");
        const index = expelledStudents.findIndex(
          (student) => student.id === Number(int)
        );

        const redeemedStudent = expelledStudents.splice(index, 1)[0];
        students.push(redeemedStudent);
        cardsOnDom(students);
        expelledOnDom(expelledStudents);
      }
    });


//function to make everything work!
const startApp = () => {
  expelledOnDom(expelledStudents);
  cardsOnDom(students);
  eventListeners();
};

startApp();
