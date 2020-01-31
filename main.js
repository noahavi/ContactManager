// Classes: contact, ui, storage
// Events: Show contacts, add, delete, search, create
// WORK IN PROGRESS: just setting things up

var urlBase = 'basicapp.us/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

document.addEventListener('DOMContentLoaded', showContacts());

function remove(element)
 {
    if (element.classList.contains('delete'))
    {
        element.parentElement.parentElement.remove();
    }
}

function showContacts()
{
    var url = urlBase + '/GetAllUserContacts' + extension;

    const table = document.querySelector('#contact-list');
    const row = document.createElement('tr');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
     
    xhr.onload = function()
    {
        var contacts = JSON.parse(this.response);

        contacts.forEach(contact => 
        {
            // need to display contacts in table now
        })
    }


}

function clearFields() 
{
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
}

function listContact(contact)
{
    const table = document.querySelector('#contact-list');
    const row = document.createElement('tr');
    var c = JSON.parse(contact);

    row.innerHTML = `
    <td>${c.firstName}</td>
    <td>${c.lastName}</td>
    <td>${c.email}</td>
    <td>${c.phone}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    table.appendChild(row);
}

function addContact()
{
    var firstName = document.querySelector("#firstName").value;
    var lastName = document.querySelector("#lastName").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;

    document.getElementById("addResult").innerHTML = "";

    var url = urlBase + '/AddContact' + extension;
    var jsonPayload = '{"firstName" : "' + firstName + '", "userId" : ' + userId + "," + '"lastName" : "' + lastName + '", ' + 
                        '"email" : "'+ email +'", "phone" : '+ phone + '}';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML = "Contact has been added";
			}
        };
        //xhr.send(jsonPayload);
        listContact(jsonPayload);
        clearFields();
	}
	catch(err)
	{
		document.getElementById("addResult").innerHTML = err.message;
	}
}