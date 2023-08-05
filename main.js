const students = [
  {
    id: 1,
    name: "Hermione Granger",
    house: "Ravenclaw",
    imageUrl: "https://i0.wp.com/the-art-of-autism.com/wp-content/uploads/2022/12/Hermione-Granger.jpg?fit=450%2C600&ssl=1",
  },
  {
    id: 2,
    name: "Ron Weasley",
    house: "Hufflepuff",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNW_nfEhzU_JKMI1y_QlbgjcOiaFtiOgKS0Q&usqp=CAU",
  },
  {
    id: 3,
    name: "Draco Malfoy",
    house: "Slytherin",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Draco_Mal.JPG/220px-Draco_Mal.JPG",
  },

  {
    id: 4,
    name: "Harry Potter",
    house: "Gryffindor",
    imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/17/potter.jpg",
  },
{
  id: 5,
  name: "Ginny Weasley",
  house: "Slytherin",
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7J0x50IA1-WVeOJxe1VeaZXPC8HlbuQedUCiyjJY5UNXMNf8V7zG2euZMgYLDjN-AWt0&usqp=CAU",
}
];

//expelled student array
const expelledStudents = [
{
  id: 1,
  name: "Luna Lovegood",
  house: "Ravenclaw",
  imageUrl: "https://i.insider.com/636c220bf5877200181c32c7?width=700",
},
{
  id: 2,
  name: "Neville Longbottom",
  house: "Slytherin",
  imageUrl: "https://hips.hearstapps.com/hmg-prod/images/nintchdbpict000255702169-e1471261358153.jpg?crop=0.9053333333333333xw:1xh;center,top&resize=980:*",
}
];

//render to DOM
const renderToDom = (divID, htmlToRender) => {
  const selectedDiv = document.querySelector (divID);
  selectedDiv.innerHTML = htmlToRender;
};

//cards on DOM
const cardsOnDom = (students) => {
  let domString = "";

  for (const student of students) {
    domString += `
    <div class="card mb-3 align-items-center" style="width: 18rem;">
    <img src=${student.imageUrl} class="card-img-top" alt=${student.name}>
  <div class="card-body">
    <p class="card-text">${student.name}</p>
    <p class="card-text"> ${student.house}</p>
    <button class="btn btn-secondary id="delete--$students.id}">Expel!</button>
  </div>
</div>`;
  };
  renderToDom("#first-year", domString);
};

const expelledOnDom = (expelledStudents) => {
  let domString = "";

  for (const student of expelledStudents) {
    domString += `
    <div class="card" style="width: 14rem;">
    <img src=${student.imageUrl} class="card-img-top" alt=${student.name}>
    <div class="card-body">
      <h5 class="card-title">${student.name}</h5>
      <p class="house-type ${student.house}">${student.house}</p>
      <button class="btn btn-danger" id="delete--${student.id}">Bring back!</button>
    </div>
  </div>`;
  }
  renderToDom("#dark-side", domString);
}

const filter = (array, houseName) => {
  const houseArray = [];
  for (const student of students) {
    if (student.house === houseName) {
      houseArray.push(student);
    }
  }
  return houseArray;
}

//toggle form to appear and disappear
const btn = document.getElementById('sort');
btn.addEventListener('click', () => {
  const form = document.getElementById('studentsForm');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});

btn.addEventListener('click', () => {
  const cards = document.getElementById('first-year');
  if (cards.style.display === 'none') {
    cards.style.display = 'flex';
  } else {
    cards.style.display = 'none';
  }
});

btn.addEventListener('click', () => {
  const cards = document.getElementById('dark-side');
  if (cards.style.display === 'none') {
    cards.style.display = 'flex';
  } else {
    cards.style.display = 'none';
  }
});

//filter student buttons
const eventListeners = () => {
  document.querySelector("#buttons").addEventListener('click', (e) => {
    if (e.target.id == "btn-all"){
      cardsOnDom(students);
    } else if (e.target.id == "btn-green") {
      cardsOnDom(students.filter(student => student.house === "Gryffindor"));
    } else if (e.target.id == "btn-blue") {
      cardsOnDom(students.filter(student => student.house == "Hufflepuff"));
    } else if (e.target.id == "btn-red") {
      cardsOnDom(students.filter(student => student.house == "Ravenclaw"));
    } else if (e.target.id == "btn-yellow") {
      cardsOnDom(students.filter(student => student.house == "Slytherin"));
    };
  })
};

const form = document.querySelector('form');

const createStudent = (e) => {
  e.preventDefault(); 
  const assignHouse = () => {
    const assigned = Math.floor(Math.random() * 4 + 1);
    switch(assigned) {
      case 1: 
        return 'Gryffindor'
        break;
      case 2:
        return 'Hufflepuff'
        break;
      case 3:
        return 'Ravenclaw'
        break;
      case 4:
        return 'Slytherin'
    }
};

const newStudent = {
  id: students.length + 1,
  name: document.querySelector("#studentsname").value,
  house: assignHouse(),
  imageUrl: document.querySelector("#image").value
}
students.push(newStudent);
cardsOnDom(students);
form.reset();
}

form.addEventListener("submit", createStudent);

const app = document.querySelector("first-year");
app.addEventListener("click", (e) => {
  if (e.target.id.includes("delete")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((student) => student.id === Number(id));
    const expelledStudent = students.splice(index, 1)[0];
    expelledStudents.push(expelledStudent);
    cardsOnDom(students);
    expelledOnDom(expelledStudents);
  }
});
const startApp = () => {
  eventListeners();
  cardsOnDom(students);
  expelledOnDom(expelledStudents);
}
startApp();
  