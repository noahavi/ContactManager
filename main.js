// Classes: contact, ui, storage
// Events: Show contacts, add, delete, search, create
// WORK IN PROGRESS: just setting things up

class Contact
{
    constructor(firstName, lastName, num, email)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.num = num;
        this.email = email;
    }
}

class Display
{
    static showContacts()
    {
        // test info
        const storedContacts = [
            {
                firstName : 'Noah',
                lastName : 'Avizemer',
                num : '123-1234',
                email : 'noahavizemer@gmail.com'
            }
        ]

        const contacts = storedContacts;
        contacts.forEach((contact) => Display.displayContact(contact));
    }

    static displayContact(contact)
    {
        const table = document.querySelector('#contact-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${Contact.firstName}</td>
        <td>${Contact.lastName}</td>
        <td>${Contact.num}</td>
        <td>${Contact.email}</td>
        <td><a href="#" class = "btn-cancel">Delete</a></td>
        `;

        list.appendChild(row);
    }
}

// Display contact
document.addEventListener('DOMContentLoaded', Display.displayContact);

// Add contact
document.querySelector('#Add').addEventListener('submit', (e)
=> {
    e.preventDefault();

    const firstName = document.querySelector('#first').value;
    const lastName = document.querySelector('#last').value;
    const email = document.querySelector('#email').value;
    const number = document.querySelector('#number').value;

    const contact = new Contact(firstName, lastName, email, number);
    console.log(contact);
});