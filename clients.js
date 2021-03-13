//Change


const clients = document.querySelector('#clients');
let clientmodal;
let testing; 
let hello;
let clientTab = document.createElement('div');
clientTab.classList.add('clientList');


clients.addEventListener('click', clientList);

function clientList(e){
    clientModal();
    clientmodal.appendChild(clientTab);
    
    fetchUserData(e);
}

function fetchUserData(){
    fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(users =>{
         let output = `
         <table>
         <thead>
         <tr>
             <th>User ID</th>
             <th>Name</th>
             <th>User Name</th>
             <th>Email</th>
             <th>Address</th>
         </tr>
         </thead>
         <tbody>`
        users.forEach(function(user){
            output += `
            <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.street}</td>
            </tr> `
        });
       output +=
       `</tbody>
     </table>`
 document.querySelector('.clientList').innerHTML = output;
});
}

//Create modal 
function clientModal(){
    clientmodal = document.createElement('div');
    clientmodal.classList.add('clientsModal');
    document.body.appendChild(clientmodal);
    return clientmodal;
}

