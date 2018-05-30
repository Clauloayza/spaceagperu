var $ = require('jquery');
var request = require('./../../../helpers/request');
var alert = require('./../../../helpers/alert');

module.exports = function() {
  var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${localStorage.getItem('projectId')}/maplayers`;
  var formData = new FormData();
  formData.append('name', $('#maplayer-name').val());
  formData.append('description', $('#maplayer-description').val());
  formData.append('file', $('input[name=file-input-vector]')[0].files[0]);
  $('#loading-indicator').show();
  request.postFile(urlPath, formData, function(error, res) {
    $('#loading-indicator').hide();
    if (error) {
      alert('danger', 'Ingrese todos los campos requeridos:' + error);
    } else {
      alert('success', `La capa se creo satisfactoriemente: ${res.mapLayer.name}`);
      //hide the layers
      $('#displayModalToCreateMaplayerVector').hide(1000);
      setTimeout(function() {
        $('#createMaplayerVectorCancel').trigger('click');
        location.reload();
      }, 3000);
    }
  });
};
