var Doctors = require('./../js/scripts.js').doctorsModule;
var apiKey = require('./../.env').apiKey;

var display = function(profile) {
  profile.forEach(function(firstName){
    $('#output').append("<li>" + firstName + "</li>");
  });
};

$(document).ready(function(){
  $("#form").submit(function(event){
    event.preventDefault();

    newDoctors = new Doctors();
    var userInput = $("#userInput").val();

    newDoctors.getDoctors(userInput, apiKey, display);
  });
});
