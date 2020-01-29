// Classes: contact, ui, storage
// Events: Show contacts, add, delete, search, create
// WORK IN PROGRESS: just setting things up

class Contact
{
    constructor(firstName, lastName, email, phone)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }
}

class Display
{
    static showContacts()
    {
        // test info
        var storedContacts =
            {
                firstName : 'Noah',
                lastName : 'Avizemer',
                email : 'noahavizemer@gmail.com',
                phone : '561-512-5983'
            }
        console.log(storedContacts.firstName);
        Display.listContact(storedContacts);
    }

    static delete(element)
    {
        if (element.classList.contains('delete'))
        {
            element.parentElement.parentElement.remove();
        }
    }

    static clearFields() 
    {
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phone').value = '';
    }

    static listContact(contact)
    {
        const table = document.querySelector('#contact-list');
        const row = document.createElement('tr');

        console.log(contact.firstName);
        row.innerHTML = `
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        table.appendChild(row);
    }
}

// Display contact
document.addEventListener('DOMContentLoaded', Display.listContact);

var e1 = document.querySelector('#contact-form');

if (e1)
{
    e1.addEventListener('submit', (e) => {
        // Prevent actual submit
        e.preventDefault();
    
        const firstName = document.querySelector('#fname').value;
        const lastName = document.querySelector('#lname').value;
        const email = document.querySelector('#email').value;
        const number = document.querySelector('#phone').value;
        
        const contact = new Contact(firstName, lastName, email, number);
    
        Display.listContact(contact);
        clearFields();
       
      });
}

var e2 = document.querySelector('#contact-list');
if (e2)
{
    e2.addEventListener('click', (e) => {
        Display.delete(e);
    });
}