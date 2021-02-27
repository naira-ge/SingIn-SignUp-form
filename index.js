const modalSign = [
    {type: 'header', valuesignin: 'Sign In', elem: ' / ', valuesignup:'Sign Up', id:'formheader', class:'modal-header'},
    {type: 'text', value: 'User Name', name: 'username', id: 'username', class:'modal-input'},
    {type: 'text', value: 'Email', name: 'email', id: 'email', class:'modal-input'},
    {type: 'password', value: 'Password', name: 'password', id: 'password', class:'modal-input'},
    {type: 'password', value: 'Confirm Password', name: 'confirmpassword', id: 'confirm-password', class:'modal-input'},
    {type: 'checkbox', value: 'Remember me?', id: 'checkbox', class:'modal-input'},
    {type: 'submit', value: '', name:'submit', id: 'submit', class:'submit'}
];


const signIn = document.querySelector('#signin');
const signUp = document.querySelector('#signup');
const demoContainer = document.querySelector('.demo-container');
let form = document.querySelector('#signform');
let backdrop;
let modal;

function closeModal(e){
    if(backdrop){
        backdrop.remove();
    }

    if(modal){
        modal.remove();
    }
}

signIn.addEventListener('click', createSignForm);
signUp.addEventListener('click', createSignForm);

function createSignForm(event){
    
    createModal();
    let subBtn = event.target.innerText;    
    backdrop.addEventListener('cliclk', closeModal);
    modal.addEventListener('submit', closeModal);
    
  if(event.target.id ==="signin" || event.target.id ==="signup"){
    console.log(event.target.id);

    form.innerHTML = '';

    modalSign.forEach(block => {
        let html = '';
        
        if(block.type === 'header'){
            html = modalHeader(block);

        }else if(block.type === 'text'){
            if(event.target.id ==="signin" && block.name === 'username'){
                html = inputText(block);
            }
            if(event.target.id ==="signup") {
                html = inputText(block);
            }
        }else if(block.type === 'password'){
            if(event.target.id ==="signin" && block.name === 'password'){
               html = inputPassword(block);
            }
            if(event.target.id ==="signup"){
                html = inputPassword(block);
            }
        }else if(block.type === 'submit'){
            html = inputSubmit(block, subBtn);
        }else if(block.type ==='checkbox'){
            html = inputCheckbox(block);
        }
        form.innerHTML +=html;
});

  }
}

//Create modal 
function createModal(){
    backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    document.body.appendChild(backdrop);
    
    modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);
    modal.insertAdjacentElement('afterbegin', form);
    return modal;
}

function modalHeader(block){
    return `
       <div>
         <h4 class = "${block.class}" id="formsignin">${block.valuesignin} /</h4>
         <h4 class = "${block.class}" id="formsignup">${block.valuesignup}</h4>
         </div>`

}

function inputText(block){
    return ` 
         <div class="${block.class}" >
          <div>${block.value}:</div>
          <input type="text" name="${block.name}" id="${block.id}">
          <small></small>
        </div> 
    `
};

function inputPassword(block){
    return `
         <div class="${block.class}">
            <div>${block.value}:</div>
            <input type="password" name="${block.name}" id="${block.id}">
            <small></small>
        </div> `
};

function inputSubmit(block, subBtn){
return `   <div class="${block.class}">
            <input id="submit" type="submit" value="${subBtn}">
           </div> `
};

function inputCheckbox(block){
    return `
    <div class="${block.class}">
    <input type="${block.type}" id="${block.id}" name="${block.name}" value="${block.value}">
    <label for="checkbox"> ${block.value}</label><br>
    `
}

//Form Validation

//Validate the username field

function checkUsername(usernameEl, element){

    console.log(usernameEl, element);

    let valid = false;
    const min = 3,
          max = 25;
    const username = usernameEl.trim();

    if (!isRequired(username)) {
        showError(element, 'Please fill out this field');
    } else if (!isBetween(username.length, min, max)) {
        showError(element, `Username must be between ${min} and ${max} characters.`);
    } else {
        showSuccess(element, "");
        valid = true;
    }
    return valid;
}

//Validate the email field

function checkEmail(emailEl = "", element){
    let valid = false;
    const email = emailEl.trim();

    if (!isRequired(email)) {
        showError(element, 'Please fill out this field');
    } else if (!isEmailValid(email)) {
        showError(element, 'Email is not valid.')
    } else {
        showSuccess(element, "");
        valid = true;
    }
    return valid;
}

//Validate the password field
function checkPassword(passwordEl = "", element){
    let valid = false;

    const password = passwordEl.trim();

    if (!isRequired(password)) {
        showError(element, 'Please fill out this field');
    } else if (!isPasswordSecure(password)) {
        showError(element, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(element, "");
        valid = true;
    }

    return valid;
};

//Validate the confirm password field
function checkConfirmPassword(confirmPasswordEl = "", passwordEl = "", element){
    let valid = false;

    // check confirm password
    const confirmPassword = confirmPasswordEl.trim();
    console.log(form.elements.password);
    const password = passwordEl.trim();

    if (!isRequired(confirmPassword)) {
        showError(element, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(element, 'Confirm password does not match');
    } else {
        showSuccess(element);
        valid = true;
    }

    return valid;
};

function isEmailValid(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function isPasswordSecure(password){
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

function isRequired(value){
    return value === '' ? false : true;
}
function isBetween(length, min, max){
    return length < min || length > max ? false : true;
}

function showError(element, message){
    // get the form-field element
    if(element === document.activeElement){
        const formField = element.nextElementSibling;

          // show the error message
    formField.textContent = message;
    }
};

function showSuccess(element, message){
 // get the form-field element
 if(element === document.activeElement){
    const formField = element.nextElementSibling;

    // hide the error message
   formField.textContent="";
 }
}

/*form.addEventListener('submit', function(e){
    console.log(e.target.id);

    // prevent the form from submitting
    e.preventDefault();

// validate fields
let isUsernameValid = checkUsername,
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

let isFormValid = isUsernameValid &&
isEmailValid &&
isPasswordValid &&
isConfirmPasswordValid;

// submit to the server if the form is valid
if (isFormValid) {

}
});*/



//using the debouncing programming technique

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
 
let formElems = document.getElementById("signform").elements;
console.log(formElems);

for(const element of formElems){
   let elemTrg = e.target.id;
   console.log(elemTrg, element);

   switch(e.target.id){
    case 'username':
        let inputValueUsName = form.elements.username.value;
        checkUsername(inputValueUsName, element);
        break;

    case 'email':
        let inputValueEmail = form.elements.email.value;
         checkEmail(inputValueEmail, element);
         break;

    case 'password':
         let inputValuePassword = form.elements.password.value;
         checkPassword(inputValuePassword, element);
         break;

    case 'confirm-password':
        let inputValueConfPassword = form.elements.confirmpassword.value;
        let inputValuePassword2 = form.elements.password.value;
        checkConfirmPassword(inputValueConfPassword, inputValuePassword2, element);
        break;        
   }
}

}));

form.addEventListener('submit', addUser);

function addUser(event){
// Disable the submit button
form.querySelector('[type="submit"]').disabled = true;

    // prevent the form from submitting
    event.preventDefault();

    // validate fields
let isUsernameValid = checkUsername,
isEmailValid = checkEmail(),
isPasswordValid = checkPassword(),
isConfirmPasswordValid = checkConfirmPassword();

let isFormValid = isUsernameValid &&
isEmailValid &&
isPasswordValid &&
isConfirmPasswordValid;

// submit to the server if the form is valid
console.log(isFormValid);

    let name = form.elements.username.value.trim();
    let email = form.elements.email.value.trim();
    let password = form.elements.password.value.trim();

  const  postUser = {name, email:"", password}

    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(postUser)
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        }else{
           return Promise.reject({status:res.status, statusText: res.statusText});
        }
    })
    .then((data) => alert(`${name} you successfully added` ))
    .catch(err => console.log("Error message: ", err.statusText));

}
