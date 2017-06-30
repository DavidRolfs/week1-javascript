Doctors = function(){
};

Doctors.prototype.getDoctors = function(medicalIssue, apiKey, display) {
  var array = []
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' +  medicalIssue + '&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
     var doctorProfile = result.data
     doctorProfile.forEach(function(element){
       array.push(element.profile.first_name)
     });
     display(array)
     console.log(array)
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.doctorsModule = Doctors;
