var $ = require('jquery');
var req = require('../../helpers/request');

//TODO alert
module.exports = {
  setOrganizationProperties: function() {
    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}`;
    console.log(urlPath);
    req.getA(urlPath, function(error, result) {
      // if (error) {
      //   localStorage.clear();
      //   return;
      // }
      $('#subTitle').text(result.name);
      localStorage.setItem('orgName', result.name);
    });
  },
  CreateOrganization() {
    var urlPath = '/api/v1/organizations';
    var org = {
      name: $('#nameOrg').val(),
      description: $('#descriptionOrg').val()
    };
    req.post(urlPath, org, function(error, result) {
      if (error) {
        $('#errorCreateOrganization').text(error.response.data.message);
        $('#errorCreateOrganization').show();
      } else {
        $('#okCreateOrganization').text('Su organización ha sido creado satisfactoriamente, Inicie Secion Nuevamente. Inicie sesión nuevamente!');
        $('#okCreateOrganization').show();
        setTimeout(function() {
          localStorage.setItem('organizationId', result.id);
          window.location.href = '/organization.html';
        }, 2000);
      }
    });
  }
};
