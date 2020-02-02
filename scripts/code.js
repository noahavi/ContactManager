var urlBase = 'http://basicapp.us/API';
var extension = 'php';

var userID = 0;

var allContacts = [];
var filteredContacts = [];

function doLogin()
{
	userID = 0;
	
	var username = document.getElementById("loginUsername").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"username":"' + username + '","password":"' + hash + '"}';
	
	var url = urlBase + '/Login.' + extension;

    var jsonObject;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("loginResult").innerHTML = "Logged in";
				jsonObject = JSON.parse(xhr.responseText);
				userID = jsonObject.id;
		
		        if( userID < 1 )
		        {
			        document.getElementById("loginResult").innerHTML = "Incorrect username or password.";
			        return;
		        }

		        saveCookie();
	            
		        window.location.href = "userhome.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doSignup()
{
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    var hash = md5( password );
    
    document.getElementById("signupResult").innerHTML = "";
    
    if (username.includes("'") || username.includes('"') ||              username.includes("\\"))
    {
        document.getElementById("signupResult").innerHTML = "Invalid characters in username.";
        return;
    }
    
    if (username === "" || password === "")
    {
        document.getElementById("signupResult").innerHTML = "You must enter both a username and password.";
        return;
    }
    
    var jsonPayload = '{"username":"' + username + '","password":"' + hash + '"}';
    
    var url = urlBase + '/Signup.' + extension;
    
    var jsonObject;
    
    var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("signupResult").innerHTML = "Successful";
				jsonObject = JSON.parse(xhr.responseText);
	            
		        window.location.href = "index.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userID=" + userID + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userID = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "userID" )
		{
			userID = parseInt( tokens[1].trim() );
		}
	}
	
	if( userID < 0 )
	{
		window.location.href = "index.html";
	}
}

function doLogout()
{
	userID = 0;
	document.cookie = "userID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
    var firstName = document.querySelector("#firstName").value;
    var lastName = document.querySelector("#lastName").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;
    
    if (firstName === "" && lastName === "" && email === "" && phone === "")
    {
        document.getElementById("addResult").innerHTML = "You must enter at least one field.";
        return;
    }

    var url = urlBase + '/AddContact.' + extension;
    
    var jsonPayload = '{"firstName":"' + firstName + '","userID":' + userID +   ',"lastName":"' + lastName + '","emailAddress":"'+ email +             '","phoneNumber":"'+ phone + '"}';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML =          "Action successful.";
				
			    getContacts();
			}
        };
        xhr.send(jsonPayload);
        clearFields();
	}
	catch(err)
	{
		document.getElementById("addResult").innerHTML = err.message;
	}
}

function clearFields() 
{
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
}

function displayTable(contacts)
{
  if (contacts.length == 0)
  {
      window.location.href = "userhome.html";
      return;
  }
  
  var table = document.getElementById("contactList");
  
  var tb = document.getElementById('tablebody');
  while (tb.childNodes.length) 
  {
    tb.removeChild(tb.childNodes[0]);
  }
  
   var bodyRef = document.getElementById('contactList').getElementsByTagName('tbody')[0];
  
  for (var i = 1; i < contacts.length; i+=5)
  {
      var bodyRow = bodyRef.insertRow();
      
      var c1 = bodyRow.insertCell(0);
      var c2 = bodyRow.insertCell(1);
      var c3 = bodyRow.insertCell(2);
      var c4 = bodyRow.insertCell(3);
      
      var b1 = bodyRow.insertCell(4);
      var b2 = bodyRow.insertCell(5);
      
      c1.innerHTML = contacts[i];
      c2.innerHTML = contacts[i+1];
      c3.innerHTML = contacts[i+2];
      c4.innerHTML = contacts[i+3];
      
      b1.innerHTML = "<input type=\"button\" name=\"Edit\" value=\"Edit\" onclick=\"editContact(" + contacts[i-1] + ");\">";
      b2.innerHTML = "<input type=\"button\" name=\"Edit\" value=\"Delete\" onclick=\"deleteContact(" + contacts[i-1] + ");\">";
  }
}

function searchContacts()
{
    var searchText = document.getElementById("searchText").value;
    
	var jsonPayload = '{"userID":' + userID + ',"searchText":"' + searchText + '"}';
	
	var url = urlBase + '/SearchContacts.' + extension;

    var jsonObject;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
			    document.getElementById("searchResult").innerHTML =       "Action successful.";
				jsonObject = JSON.parse(xhr.responseText);
				if (jsonObject.id == 0)
				{
				    window.location.href = "userhome.html";
				    return;
				}
				for (var i = 0; i < jsonObject.results.length; i+=5)
				{
				    filteredContacts[i] = jsonObject.results[i];
				    filteredContacts[i+1] = jsonObject.results[i+1];
				    filteredContacts[i+2] = jsonObject.results[i+2];
				    filteredContacts[i+3] = jsonObject.results[i+3];
				    filteredContacts[i+4] = jsonObject.results[i+4];
				}
				displayTable(filteredContacts);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}
}

function returnToHome()
{
    window.location.href = "userhome.html";
}

function getContacts()
{
    readCookie();
    
    allContacts = [];
    
    var jsonPayload = '{"userID":' + userID + '}';
	
	var url = urlBase + '/GetAllUserContacts.' + extension;

    var jsonObject;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				jsonObject = JSON.parse(xhr.responseText);
				if (jsonObject.id == 0)
				{
				    var table = document.getElementById("contactList");
                    var tb = document.getElementById('tablebody');
                    while (tb.childNodes.length) 
                    {
                        tb.removeChild(tb.childNodes[0]);
                    }
				    return;
				}
				for (var i = 0; i < jsonObject.results.length; i+=5)
				{
				    allContacts[i] = jsonObject.results[i];
				    allContacts[i+1] = jsonObject.results[i+1];
				    allContacts[i+2] = jsonObject.results[i+2];
				    allContacts[i+3] = jsonObject.results[i+3];
				    allContacts[i+4] = jsonObject.results[i+4];
				}
				
				displayTable(allContacts);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
	    
	}
}

function editContact(contactID)
{
    var index = allContacts.indexOf(contactID);
    
    openForm();
    
    var firstName;
    var lastName;
    var emailAddress;
    var phoneNumber;
    
    document.getElementById('form-submit').onclick = function() 
    {
        firstName = document.querySelector('#editfirst').value;
        lastName = document.querySelector('#editlast').value;
        emailAddress = document.querySelector('#editemail').value;
        phoneNumber = document.querySelector('#editphone').value;
        
        if (firstName == "")
        {
            firstName = allContacts[index+1];
        }
        if (lastName == "")
        {
            lastName = allContacts[index+2];
        }
        if (emailAddress == "")
        {
            emailAddress = allContacts[index+3];
        }
        if (phoneNumber == "")
        {
            phoneNumber = allContacts[index + 4];
        }
        
        var jsonPayload = '{"firstName":"' + firstName + '","contactID":' + contactID +   ',"lastName":"' + lastName + '","emailAddress":"'+ emailAddress + '","phoneNumber":"'+ phoneNumber + '"}';
	
	    var url = urlBase + '/EditContact.' + extension;

        var jsonObject;

	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", url, true);
	    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	    try
	    {
		    xhr.onreadystatechange = function() 
		    {
			    if (this.readyState == 4 && this.status == 200) 
			    {
				    jsonObject = JSON.parse(xhr.responseText);
				    closeForm();
				    window.location.href = "userhome.html";
			    }
		    };
		    xhr.send(jsonPayload);
	    }
	    catch(err)
	    {
	    
	    }
    };
}

function deleteContact(contactID)
{

	var jsonPayload = '{"contactID":' + contactID + '}';
	
	var url = urlBase + '/DeleteContact.' + extension;

    var jsonObject;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				jsonObject = JSON.parse(xhr.responseText);
				
				getContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
	    
	}
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}