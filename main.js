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
const badStudents = [
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
  renderToDom("#sorted-students", domString);
};

const expelledOnDom = (badStudents) => {
  let domString = "";

  for (const student of badStudents) {
    domString += `
    <div class="card" style="width: 14rem;">
    <img src=${student.imageUrl} class="card-img-top" alt=${student.name}>
    <div class="card-body">
      <h5 class="card-title">${student.name}</h5>
      <p class="house-type ${student.house}">${student.house}</p>
      <button class="btn btn-danger" id="delete--${student.id}">Bring back!</button>
    </div>
  </div>`
  };
  renderToDom("#dark-side", domString);
}

//filter students with house assignments
const filter = (array, houseString) => {
  const houseArray = [];

  for (const student of students) {
    if (student.house === houseString) {
      houseArray.push(student);
    }
}
  return houseArray;
  };


  

  //target the buttoms to DOM
  const showAllButton = document.querySelector("#btn-all");
  const showGreenButton = document.querySelector("#btn-green");
  const showBlueButton = document.querySelector("#btn-blue");
  const showRedButton = document.querySelector("#btn-red");
  const showYellowButton = document.querySelector("btn-yellow");

  //click event showing cards with button clicks
  showAllButton.addEventListener("click",() => {
    cardsOnDom(students);
  });
  //filtering types
  showGreenButton.addEventListener("click", () => {
    const greenButton = filter(students, "Gryffindor");
    cardsOnDom(greenButton);
  });

  showBlueButton.addEventListener("click", () => {
    const blueButton = filter(students, "Hufflepuff");
    cardsOnDom(blueButton);
  });

  showRedButton.addEventListener("click", () => {
    const redButton = filter (students, "Ravenclaw");
    cardsOnDom(redButton);
  });

  showYellowButton.addEventListener("click", () => {
    const yellowButton = filter(students, "Slytherin");
    cardsOnDom(yellowButton);
  });

//randomize houses
  const createStudent = (e) => {
    e.preventDefault();
    const assignHouse = () => {
      const assigned = Math.floor(Math.random() * 4 + 1);
    switch (assigned) {
      case 1:
        return "Ravenclaw";
        break;
      case 2:
        return "Huffleuff";
        break;
      case 3:
        return "Slytherin";
        break;
     case 4:
        return "Gryffindor";
        break;         
    }
  }


  //adding student form
  const newStudentObj = {
  id: students.length + 1,
  name: document.querySelector("#fullname").value,
  house: assignHouse(),
  imageUrl: document.querySelector("#image").value
  }

  students.push(newStudentObj);
  cardsOnDom(students);
  form.reset();
  }

  form.addEventListener('submit, createStudent')


  const startApp = () => {
    const sorted = document.querySelector("#sorted-students");
    app.addEventListener('click', (e) => {
      if (e.target.id.includes("delete")) {
        const [, id] = e.target.id.split("--");
        const index = students.findIndex(e => e.id ===Number (id));
        const deathEater = students.splice(index, 1);
        darkSide.push(deathEater[0]);

        cardsOnDom(students);
        darkCards(darkSide);
      }
    })
  }
  
    startApp();
