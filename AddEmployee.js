var myJSON;
document.querySelector("#button").addEventListener("click", myFunction);
var myArray = [];


function myFunction(){
   var userFirstName = document.querySelector("#first-name").value;//user data assigned to variables
    var userLastName = document.querySelector("#last-name").value;
    var userId = document.querySelector("#ident").value;
    var userEmail = document.querySelector("#email").value;
    var userDob = document.querySelector("#number").value;
  
  
  var person = Object.create(null);//create an empty 'person' object

  //test user entries against reg. expression controls:
    var myRegexName = /^[a-z]+$/gi;
    var myRegexLastName = /^[a-z]+$/gi;
    var myRegexId = /^[a-z]\d[a-z][a-z]$/gi;
    var myRegexEmail = /\b\w+@\w+.com\b/;
    var myRegexDob = /^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$/
   
    //start populating 'person' object with data
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
    var myJSON = JSON.stringify(person);//convert 'person' object to JSON data string
    console.log(myJSON);
   
    myArray.push(myJSON);//creates array of json strings
    console.log(myArray);
    document.querySelector("#code-box").innerHTML=myJSON;
    document.querySelector("#array-box").innerHTML=`[${myArray}]`;
    document.querySelector('#survey-form').reset();//resets fields in the form to empty
}

//fetch function below is called to make a POST request to post 'myJSON' data to the server 

fetch('https://jsonplaceholder.typicode.com/todos', {
      method: "POST",
      body: myJSON,
      headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(res =>res.json())
.then(json => console.log(json))
.then(json => console.log("Data successfully POSTED"))
.catch(err => console.log(err));

/*Some earlier ideas at how best to try and make a POST request to post JSON data*/

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
//fetch function to post a GET request, to receive JSON data for display etc: 
document.querySelector("#fetch-button").addEventListener("click", fetchData);
function fetchData(){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res =>res.json())
  .then(json=>{
    console.log("First user in the array:");
    console.log(json[0]);
    console.log("Name of the first user in array:");
    console.log(json[0].name);

    document.querySelector("#employee-box").innerHTML=JSON.stringify(json[0]);
    
  })
}