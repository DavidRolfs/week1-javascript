var Doctors = require('./../js/scripts.js').doctorsModule;
var apiKey = require('./../.env').apiKey;

var display = function(name, contact, website, practice, address) {
  for(var i = 0; i <= 20; i++){
    $('#output').append("<li>" +
      "<h3>" + name[i] + "</h3>" +
      "<h5>" + practice[i] + "</h5>" +
      "<p> address: " + address[i] + "</p>" +
      "<p> Phone number: " + contact[i] + "</p>" +
      "<p> Webiste " + website[i] + "</p>" +
      "</li>");
  }
};

$(document).ready(function(){
  $("#form").submit(function(event){
    event.preventDefault();

    newDoctors = new Doctors();
    var userInput = $("#userInput").val();

    newDoctors.getDoctors(userInput, apiKey, display);
  });
});
