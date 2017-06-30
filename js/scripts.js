
Doctor = function(firstName, middleName, lastName, title, practice, website, phone, address, image){
  this.firstName = firstName;
  this.middleName = middleName;
  this.lastName = lastName;
  this.title = title;
  this.practice = practice;
  this.website = website;
  this.phone = phone;
  this.address = address;
  this.image = image;
};

Doctor.prototype.getDoctors = function(medicalIssue, apiKey, display) {
  var allDoctorsArray = [];
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' +  medicalIssue + '&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
    .then(function(result) {
      var doc = result.data;
      doc.forEach(function(element){
        var newDoctor = new Doctor(element.profile.first_name, element.profile.middle_name, element.profile.last_name, element.profile.title, element.practices[0].name, element.practices[0].website, element.practices[0].phones[0].number, (element.practices[0].visit_address.street + " " + element.practices[0].visit_address.city + " " + element.practices[0].visit_address.state + " " + element.practices[0].visit_address.zip), element.profile.image_url);

      allDoctorsArray.push(newDoctor);
     });

    display(allDoctorsArray);
  })
    .fail(function(error){
      console.log("fail");
    });
};

exports.doctorsModule = Doctor;
