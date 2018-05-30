var $ = require('jquery');
var _ = require('underscore');
var request = require('./../../../helpers/request');
var alert = require('./../../../helpers/alert');

module.exports = {
  listMaplayerForChangeset: function() {
    var organizationId = localStorage.getItem('organizationId');
    var projectId = localStorage.getItem('projectId');
    var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers`;
    request.getA(urlPath, function(error, maplayers) {
      if (error) {
        alert('danger', `Error listando maplayers${error}`);
        return;
      }
      _.each(maplayers, function(v, k) {
        if (v.type === 'vector') {
          $('#maplayerIdChangeset').append(`<option value="${v.id}" >${v.name}</option>`);
        }
      });
    });
  },

  listVariablesForChangeset: function() {
    var organizationId = localStorage.getItem('organizationId');
    var urlPath = `/api/v1/organizations/${organizationId}/variables`;
    request.getA(urlPath, function(error, categories) {
      if (error) {
        alert('danger', `Error listando variables ${error}`);
        return;
      }
      _.each(categories, function(v, k) {
        $('#variableIdChangeset').append(`<option style="background:#00CB72; cursor: none; color:#fff;" value="" >Categoria : ${k}</option>`);
        for (var i = 0; i < v.length; i++) {
          var variable = v[i];
          $('#variableIdChangeset').append(
            `<option value="${variable.id}">- ${variable.name}<span style="font-size: 9px;">(${variable.dataType})</span></option>`
          );
        }
      });
    });
  },

  createChangeset: function() {
    var organizationId = localStorage.getItem('organizationId');
    var projectId = localStorage.getItem('projectId');
    var mapLayerId = $('#maplayerIdChangeset').val();
    var variableId = $('#variableIdChangeset').val();
    var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${mapLayerId}/changesets`;
    var formData = new FormData();
    formData.append('variableId', variableId);
    formData.append('description', `Actualizando ${variableId}`);
    formData.append('file', $('input[name=file-input-excel]')[0].files[0]);
    $('#loading-indicator').show();
    request.postFile(urlPath, formData, function(error, result) {
      $('#loading-indicator').hide();
      if (error) {
        //TODO, mostrar un mensaje de que se actualizo los datos
        console.log(error);
        alert('danger', error);
      } else {
        alert('success', 'Los cambios se crearon satisfactoriamente!!');
        setTimeout(function() {
          location.reload();
        }, 3000);
      }
    });
  }
};
