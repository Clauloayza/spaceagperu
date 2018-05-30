var $ = require('jquery');
var req = require('../../helpers/request');
var alert = require('../../helpers/alert');
var listVariables = require('./listVariables');

module.exports = {
  listCategories: function() {
    var urlPath = `/api/v1/categories`;
    console.log(urlPath);
    req.getA(urlPath, function(error, categories) {
      for (var i = 0; i < categories.length; i++) {
        var html = `<option value="${categories[i].id}">${categories[i].name}</option>`;
        $('#categoryId').append(html);
      }
    });
  },
  createVariable: function() {
    var organizationId = localStorage.getItem('organizationId');
    var urlPath = `/api/v1/organizations/${organizationId}/variables`;
    var props = {};
    $('#formCreateVariable input.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    $('#formCreateVariable select.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    req.post(urlPath, props, function(error, res) {
      if (error) {
        alert('danger', error.message);
      } else {
        alert('success', `Variable ${res.name} ha sido creada!!`);
        listVariables();
        //hide the layers
        setTimeout(function() {
          $('#createVariableCancelar').trigger('click');
        }, 1000);
      }
    });
  }
};
