var config = require('../../config');
var request = require('../../helpers/request');

var getToken = function(cb) {
  var loginUrl = config.host + '/sign';
  var xhr = new XMLHttpRequest();
  var emailElement = document.getElementById('email');
  var passwordElement = document.getElementById('password');
  var email = emailElement.value;
  var password = passwordElement.value;
  xhr.open('POST', loginUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.addEventListener('load', function() {
    var responseObject = JSON.parse(this.response);
    if (responseObject.token) {
      cb(responseObject);
    } else {
      cb(null);
    }
  });
  var sendObject = JSON.stringify({
    email: email,
    password: password
  });
  xhr.send(sendObject);
};

module.exports = {
  getToken
};
