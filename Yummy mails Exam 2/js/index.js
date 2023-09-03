
var sideNavMenu = $(".side-nav-menu");
var openIcon = $(".fa-align-justify");
var closeIcon = $(".fa-xmark");
var linksDiv = $(".links ul");

function animateLinksIn() {
    linksDiv.find("li").each(function (index) {
        var listItem = $(this);
        setTimeout(function () {
            listItem.css({
                'opacity': 0,
                'transform': 'translateY(10px)'
            }).animate({
                'opacity': 1,
                'transform': 'translateY(0)'
            }, 1500);
        }, 100 * index);
    });
}
function animateLinksOut() {
    linksDiv.find("li").each(function (index) {
        var listItem = $(this);
        setTimeout(function () {
            listItem.animate({
                'opacity': 0,
                'transform': 'translateY(10px)'
            }, 500);
        }, 100 * index);
    });
}
function openSideNav() {
    sideNavMenu.animate({ left: "0px" });
    openIcon.css({ display: "none" });
    closeIcon.css({ display: "block" });
    animateLinksIn();
}
function closeSideNav() {
    animateLinksOut();
    sideNavMenu.animate({ left: "-250px" }, function () {
        // Callback function to hide the links div when animation is complete
        linksDiv.hide();
    });
    openIcon.css({ display: "block" });
    closeIcon.css({ display: "none" });
}
$(".open-close-icon").click(function () {
    if (sideNavMenu.css("left") === "0px") {
        closeSideNav();
    } else {
        // Show links div before opening the side navigation
        linksDiv.show();
        openSideNav();
    }
});
$(".fa-xmark").click(function () {
    closeSideNav();
});
let DataInRow = document.getElementById("rowData");

async function get_meail_in_first_page() {
    DataInRow.innerHTML = "";
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        console.log(data);

        // Call display_Category with the retrieved data
        display_Category(data.categories);
    } catch (error) {
        console.error(error);
    }
    display_meail_in_first_page(data.categories)
}
get_meail_in_first_page()
function display_meail_in_first_page(pepsieeeeeeeeeeee) {
    searchContainer.innerHTML = ``
    $(".loading-screen").fadeIn(10).fadeOut(300)
    let zoza = "";
    for (let i = 0; i < pepsieeeeeeeeeeee.length; i++) {
        zoza += `
            <div class="col-md-3">
                <div onclick="getCategoryMeals('${pepsieeeeeeeeeeee[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100 meal-image"  src="${pepsieeeeeeeeeeee[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${pepsieeeeeeeeeeee[i].strCategory}</h3>
                        <p>${pepsieeeeeeeeeeee[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div> 
                </div>
            </div>
        `;
    }

    DataInRow.innerHTML = zoza;
    console.log(DataInRow);
}

async function getCategoryData() {
    DataInRow.innerHTML = "";
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        console.log(data);

        // Call display_Category with the retrieved data
        display_Category(data.categories);
    } catch (error) {
        console.error(error);
    }
}

function display_Category(pepsieeeeeeeeeeee) {
    searchContainer.innerHTML = ``
    $(".loading-screen").fadeIn(10).fadeOut(300)
    let zoza = "";
    for (let i = 0; i < pepsieeeeeeeeeeee.length; i++) {
        zoza += `
            <div class="col-md-3">
                <div onclick="getCategoryMeals('${pepsieeeeeeeeeeee[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100 meal-image"  src="${pepsieeeeeeeeeeee[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${pepsieeeeeeeeeeee[i].strCategory}</h3>
                        <p>${pepsieeeeeeeeeeee[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div> 
                </div>
            </div>
        `;
    }

    DataInRow.innerHTML = zoza;
    console.log(DataInRow);
}

function displayMeals(arr) {
    searchContainer.innerHTML = ``
    $(".loading-screen").fadeIn(10).fadeOut(300)
    let bozooo = "";

    for (let i = 0; i < arr.length; i++) {
        bozooo += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    DataInRow.innerHTML = bozooo
}

$(".nav-tab li:nth-child(2)").click(function () {
    getCategoryData();
});

async function getCategoryMeals(category) {
    DataInRow.innerHTML = ""


    let dataApiInCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    dataApiInCategory = await dataApiInCategory.json()
    displayMeals(dataApiInCategory.meals.slice(0, 20))
}

async function getMealDetails(MealForId) {

    DataInRow.innerHTML = ""


    searchContainer.innerHTML = "";
    let ApiCall = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealForId}`);
    ApiCall = await ApiCall.json();

    displayMealDetails(ApiCall.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
    searchContainer.innerHTML = ``
      $(".loading-screen").fadeIn(10).fadeOut(300)
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let poolla = `

    <div class="col-md-4 ">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2 class="text-white">Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    DataInRow.innerHTML = poolla
}

$(document).ready(() => {
    $(".loading-screen").fadeOut(2000)
})



async function getForClickArea() {
    DataInRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let GetApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    GetApi = await GetApi.json()
    console.log(GetApi.meals);

    displayArea(GetApi.meals)
    $(".loading-screen").fadeOut(300)

}


function displayArea(ass) {
    searchContainer.innerHTML = ``
    let hwaaaaaaaai = "";

    for (let i = 0; i < ass.length; i++) {
        hwaaaaaaaai += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${ass[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${ass[i].strArea}</h3>
                </div>
        </div>
        `
    }

    DataInRow.innerHTML = hwaaaaaaaai
}


async function getIngredientsData() {
    rowData.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()


    displayIngredients(respone.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}


function displayIngredients(arr) {
    searchContainer.innerHTML = ``
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    DataInRow.innerHTML = cartoona
}



async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}


let searchContainer = document.getElementById("searchContainer");
let submitBtn;


async function getIngredientsMeals(ingredients) {
    DataInRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}

function showSearchInputsData() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    DataInRow.innerHTML = ""
}

async function searchByName(term) {

    DataInRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {

    DataInRow.innerHTML = ""
    $(".loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(300)
}

function showContacts() {
    searchContainer.innerHTML = ``
    DataInRow.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
               numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email is wrongg
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                repassword
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true
    })
}

let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;




function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value);
}

function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value;
}

function inputsValidation() {
    const inputFields = [
        { id: "nameInput", validationFunc: nameValidation, alertId: "nameAlert" },
        { id: "emailInput", validationFunc: emailValidation, alertId: "emailAlert" },
        { id: "phoneInput", validationFunc: phoneValidation, alertId: "phoneAlert" },
        { id: "ageInput", validationFunc: ageValidation, alertId: "ageAlert" },
        { id: "passwordInput", validationFunc: passwordValidation, alertId: "passwordAlert" },
        { id: "repasswordInput", validationFunc: repasswordValidation, alertId: "repasswordAlert" }
    ];

    inputFields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        const alertElement = document.getElementById(field.alertId);
        const isValid = field.validationFunc();

        if (isValid) {
            alertElement.classList.replace("d-block", "d-none");
        } else {
            alertElement.classList.replace("d-none", "d-block");
        }
    });

    const isAllValid = inputFields.every(field => field.validationFunc());
    const submitBtn = document.getElementById("submitBtn");

    if (isAllValid) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}
