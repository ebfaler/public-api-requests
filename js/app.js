
//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const headerContainer = document.querySelector(".header-inner-container");
const searchBox = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const modalContainer = document.querySelector(".modal-container");
modalContainer.style.display = "none";
// const modal = document.querySelector(".modal");
// const modalBtn = document.querySelectorAll('modal-btn-container .btn');

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

    // for each employee and index, run the arrow function...
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let picture = employee.picture;

        // template literals make this so much cleaner!
        employeeHTML +=

            `<div class="card" data-index="${index}">
    <div class="card-img-container">
        <img class="card-img" src="${picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>
    </div>
 </div>
 `
    });
    gallery.innerHTML = employeeHTML;
}

//display modal
function displayModal(index) {

    // Using the information from the employees array, at the index passed to this function.
    // Using object destructuring make our template literal cleaner so if employee[index] has those properties, 
    // those variables are assigned to it

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    // console.log(employees[index]);
    

    let date = new Date(dob.date);
    console.log(date);

    const modalHTML = `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture.large}">
                        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${street.number}, ${street.name}, ${state}, ${postcode}</p>
                        <p class="modal-text">Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;

    modalContainer.style.display = "block";
    modalContainer.innerHTML = modalHTML;
    modalIndex = index;
    const modalClose = document.querySelector(".modal-close-btn");
    

    //modal close
    modalClose.addEventListener("click", (e) => {

        modalContainer.style.display = "none";

    });

    // adding functionaility to switch between modals

    const previous = document.querySelector(".modal-prev");
    const next = document.querySelector(".modal-next");

    modalContainer.addEventListener("click", (e) => {
        if (e.target === previous) {
            console.log('previous');
            if (typeof modalIndex === 'string') {
                modalIndex = parseInt(modalIndex, 10);
            }
            if (modalIndex === 0) {
                displayModal(11);
            } else {
                modalIndex--;
                displayModal(modalIndex);
            }


        }

        if (e.target === next) {
            console.log('next');
            if (typeof modalIndex === 'string') {
                modalIndex = parseInt(modalIndex, 10);
            }
            if (modalIndex === 11) {
                displayModal(0);
            } else {
                modalIndex++;
                displayModal(modalIndex);
            }

        }
    });

};



//event listener to load modal on card click

gallery.addEventListener("click", (e) => {

    if (e.target !== gallery) {
        // select the card element based on its proximity to element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
        console.log("card clicked");
    }

});

//adding name search functionaility


searchBox.addEventListener("input", (e) => {

    const employeeNames = document.querySelectorAll("#name");
    console.log(employeeNames);
    let searchTerm = e.target.value.toLowerCase();


    employeeNames.forEach(name => {
        if (name.textContent.toLowerCase().includes(searchTerm)) {
            name.parentElement.parentElement.style.display = "flex";
        }
        else {
            name.parentElement.parentElement.style.display = "none";
        }
    })

})


