const modalSign = [
    {type: 'header', value:['Sign In', ' / ', 'Sign Up'], id:'signh', class:'modal-header'},
    {type:'text', value: 'User Name', name: 'username', id: 'username', class:'modal-input'},
    {type: 'text', value: 'Email', name: 'email', id: 'email', class:'modal-input'},
    {type: 'password', value: 'Password', name: 'password', id: 'password', class:'modal-input'},
    {type: 'password', value: 'Confirm Password', name: 'confirm-password', id: 'confirm-password', class:'modal-input'},
    {type: 'checkbox', value: 'Remember me?', id: 'checkbox', class:'modal-input'},
    {type: 'submit', value: 'Sign In', id: 'submit', class:'submit'}
];


const signIn = document.querySelector('#signin');
const signUp = document.querySelector('#signup');
const demoContainer = document.querySelector('.demo-container');
let form = document.querySelector('#signform');
let backdrop;
let modal;

function closeModal(){
    if(backdrop){
        backdrop.remove();
    }

    if(modal){
        modal.remove();
    }
}

//Create modal 
signIn.addEventListener('click', createSignForm);
signUp.addEventListener('click', createSignForm);

function createSignForm(event){
    
    createModal(event);
    modal.appendChild(form);
    backdrop.addEventListener('cliclk', closeModal);
    modal.addEventListener('submit', closeModal); 
    
  if(event.target.id ==="signin"){
    console.log(event.target.id);
    
    form.innerHTML = ''

    modalSign.forEach(block => {
        let html = ''
    
        if(block.type === 'header'){
            html = modalHeader(block);
        }else if(block.type === 'text'){
            if(block.name === 'username'){
                html = inputText(block);
            }
        }else if(block.type === 'password'){
            if(block.name === 'password'){
               html = inputPassword(block);
            }
        }else if(block.type === 'submit'){
            html = inputSubmit(block);
        }else if(block.type ==='checkbox'){
            html = inputCheckbox(block);
        }

        form.insertAdjacentHTML('beforeend', html);   
    });
  }

  if(event.target.id ==="signup"){
    console.log(event.target.id);

    form.innerHTML = ''
    
    modalSign.forEach(block => {
        let html = ''
    
        if(block.type === 'header'){
            html = modalHeader(block);
        }else if(block.type === 'text'){
            html = inputText(block);
        }else if(block.type === 'password'){
            html = inputPassword(block);
        }else if(block.type === 'submit'){
            html = inputSubmit(block);
        }else if(block.type ==='checkbox'){
            html = inputCheckbox(block);
        }
        form.insertAdjacentHTML('beforeend', html);
    });
  }
    
}

function createModal(event){
    backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    demoContainer.before(backdrop);
    
    modal = document.createElement('div');
    modal.classList.add('modal');
    demoContainer.before(modal);
    return modal;
}

function modalHeader(block){
    const html = block.value.map(item => `<span id = '${item.value}'>${item}</span>`)

    return `
         <h2 class = ${block.class} id=${block.id}>
        ${html.join('')}
        </h2>`

}

function inputText(block){
    return ` 
         <div class="${block.class}" >
          <div>${block.value}:</div>
          <input type="${block.type}" name="${block.name}" id="${block.id}">
          <small></small>
        </div> 
    `
};

function inputPassword(block){
    return `
         <div class="${block.class}">
            <div>${block.value}:</div>
            <input type="${block.type}" name="${block.name}" id="${block.id}">
            <small></small>
        </div>
    `
};

function inputSubmit(block){
return `   <div class="${block.class}">
            <input type="${block.type}" value="${block.value}">
           </div>   
        `
};

function inputCheckbox(block){
    return `
    <div class="${block.class}">
    <input type="${block.type}" id="${block.id}" name="${block.name}" value="${block.value}">
    <label for="${block.name}"> ${block.value}</label><br>
    `
}

