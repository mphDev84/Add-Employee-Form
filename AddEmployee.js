var myJSON;
document.querySelector("#button").addEventListener("click", myFunction);
var myArray = [];


function myFunction(){
   var userFirstName = document.querySelector("#first-name").value;
    var userLastName = document.querySelector("#last-name").value;
    var userId = document.querySelector("#ident").value;
    var userEmail = document.querySelector("#email").value;
    var userDob = document.querySelector("#number").value;
  
  //console.log(myArray);
  var person = Object.create(null);

    var myRegexName = /^[a-z]+$/gi;
    var myRegexLastName = /^[a-z]+$/gi;
    var myRegexId = /^[a-z]\d[a-z][a-z]$/gi;
    var myRegexEmail = /\b\w+@\w+.com\b/;
    var myRegexDob = /^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$/
   
    var result_first_name = myRegexName.test(userFirstName);
    if (result_first_name){
      person.firstName = userFirstName;
    }else {
      alert("Enter a valid first name!");
    };
   var result_last_name = myRegexLastName.test(userLastName);
    if (result_last_name){
      person.lastName = userLastName;
    }else {
      alert("Enter a valid last name!");
    };
    var result_Id = myRegexId.test(userId);
    if (result_Id){
      person.userId = userId;
    }else {
      alert("Enter a valid ID Number!");
    };
    var result_email = myRegexEmail.test(userEmail);
    if (result_email){
      person.email = userEmail;
    }else {
      alert("Enter a valid email!");
    };
    var result_dob = myRegexDob.test(userDob);
    if (result_dob){
      person.dob = userDob;
    }else {
      alert("Enter a valid DOB!");
    };
if(result_first_name&&result_last_name&&result_Id&&result_email&&result_dob){
    var myJSON = JSON.stringify(person);
    console.log(myJSON);
   //window.location = "AddEmployee.php?x=" + myJSON;
    myArray.push(myJSON);//creates array of json strings
    console.log(myArray);
    document.querySelector("#code-box").innerHTML=myJSON;
    document.querySelector("#array-box").innerHTML=`[${myArray}]`;
    document.querySelector('#survey-form').reset();//resets fields in the form to empty
}

/*Below are different ideas on how to POST the JSON file to server||.txt file||.php file etc
most have been commented out, the fetch API below is the most concise. Unfortunately I keep running into
a code 405 error when the API is called, so until this has been resolved, the static web page cannot
communicate with said server etc.

HOWEVER - I have been able to run the web page using Node.js. My aim now is to use Node.js as the back-end
for this project and POST/GET JSON data between the client and the server. */

fetch("/AddEmployee.txt", {
      method: "POST",
      body: myJSON,
      headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(res =>res.json())
.then(json => console.log(json))
.catch(err => console.log(err));

/*$.ajax({
  contentType: "application/json", // php://input
  //contentType: "application/x-www-form-urlencoded; charset=UTF-8", // $_POST
  dataType : "json",
  method: "POST",
  url: "AddEmployee.php",
  data: person
})
.done(function(data) {  
  console.log("test: ", data);
  $("#result").text(data.name);
})
.fail(function(data) {
  console.log("error: ", data);
});
*/

/*
const fs = require('fs');
fs.writeFile('user.json', myJSON, (err)=>{
  if (err){
    throw err;
  }
  console.log("JSON Data is saved");

});
*/


}
/*
$(document).ready(function(){
  $("button").click(function(){
    $.post("AddEmployee.asp",
     person,
    function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });
}); */