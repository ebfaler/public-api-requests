let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const headerContainer = document.querySelector(".header-inner-container");
const gallery = document.querySelector(".gallery");
const modalContainer = document.querySelector(".modal-container");

// const cardContainer = document.querySelector(".card");
// modalContainer.style.display = "none";

const modalClose = document.querySelector(".modal-close-btn")
const searchBox = document.querySelector(".search-input");
const previous = document.querySelector(".modal-prev");
const next = document.querySelector(".modal-next");
let modalIndex = 0;


// fetch data from API
fetch(urlAPI)
    .then(res => res.json()) //Pass the url information to fetch, format resPonse as JSON
    .then(res => res.results) // Return the results of the response
    .then(displayEmployees)   //Passing control to the displayEmployees function, which will be created next
    .catch(err => console.log(err)) //Catch any errors and display them in the console



function displayEmployees(employeeData) {
    employees = employeeData; //setting employees variable equal to employeeData so that it can be accessed outside of this function
 
    // store the employee HTML as we create it
    let employeeHTML = '';

    // loop through each employee and create HTML markup and display index
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let picture = employee.picture;

        // template literals make this so much cleaner!
        employeeHTML += 

    `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>
    </div>
    </div>`
    });
    gallery.innerHTML = employeeHTML;
}

