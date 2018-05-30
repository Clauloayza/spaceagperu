var $ = require('jquery');
var request = require('../../helpers/request');

module.exports = {
  setUserProperties: function() {
    request.getA('/users', function(error, res) {
      if (error && error.statusCode === 401) {
        localStorage.clear();
        window.location.href = '/';
      } else {
        $('#userName').text(res.properties.name);
      }
    });
  },
  logout: function() {
    localStorage.clear();
    window.location.href = '/';
  }
};
