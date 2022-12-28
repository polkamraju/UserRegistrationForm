const uri = 'api/Users';
let usersList = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const adduserfirstNameTextbox = document.getElementById('add-userfirstname');
    const adduserlastNameTextbox = document.getElementById('add-userlastname');
    const adddesignationTextbox = document.getElementById('add-designation');

    const item = {
        UserFirstName: adduserfirstNameTextbox.value.trim(),
        UserLastName: adduserlastNameTextbox.value.trim(),
        Designation: adddesignationTextbox.value.trim()
    }
    
    fetch(`${uri}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function _displayCount(itemCount) {
    const name =  (itemCount === 1) ? 'User' : 'Users';

    document.getElementById('counter').innerText = `${'Number Of Users : '}` + `${itemCount} ${name}`;
}
 
function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        var singleItem = item;
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode1 = document.createTextNode(singleItem.userFirstName);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(singleItem.userLastName);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(singleItem.designation);
        td3.appendChild(textNode3);
    });

    usersList = data;
}