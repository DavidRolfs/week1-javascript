Doctors = function(){
  nameArray = [];
  practicesArray = [];
  websiteArray = [];
  phoneArray = [];
  addressArray = [];
  imageArray = [];
};

Doctors.prototype.getDoctors = function(medicalIssue, apiKey, display) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' +  medicalIssue + '&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
     var doc = result.data;
     doc.forEach(function(element){
        nameArray.push(element.profile.first_name + " " + element.profile.middle_name + " " + element.profile.last_name + ", " + element.profile.title);

        practicesArray.push(element.practices[0].name);

        phoneArray.push(element.practices[0].phones[0].number);

        websiteArray.push(element.practices[0].website);

        addressArray.push(element.practices[0].visit_address.street + " " + element.practices[0].visit_address.city + " " + element.practices[0].visit_address.state + " " + element.practices[0].visit_address.zip);

        imageArray.push(element.profile.image_url);
     });

     display(nameArray, phoneArray, websiteArray, practicesArray, addressArray, imageArray);
    })
    
   .fail(function(error){
      console.log("fail");
    });
};

exports.doctorsModule = Doctors;
