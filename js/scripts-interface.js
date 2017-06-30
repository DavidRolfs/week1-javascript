var Doctor = require('./../js/scripts.js').doctorsModule;
var apiKey = require('./../.env').apiKey;

var display = function(array) {
  $("#output").empty();
  for(var i = 0; i <= 20; i++){
    $('#output').append("<li>" +
      "<h3>" + array[i].name + "</h3>" +
      "<h5>" + array[i].practice + "</h5>" +
      "<img src=" + array[i].image + ">" +
      "<p> Address: " + array[i].address + "</p>" +
      "<p> Phone number: " + array[i].phone + "</p>" +
      "<p> Webiste: <a href = " + array[i].website + "</a>" + array[i].website + "</p>" +
      "</li>");
  }
};

$(document).ready(function(){
  $("#form").submit(function(event){
    event.preventDefault();
    var userInput = $("#userInput").val();
    doctor = new Doctor();

    doctor.getDoctors(userInput, apiKey, display);
  });
});
