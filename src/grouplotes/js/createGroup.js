var $ = require('jquery');
var request = require('../../helpers/request');
var map = require('./map');
var draw = require('./draw');
var alert = require('../../helpers/alert');
module.exports = function() {
  var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${localStorage.getItem(
    'projectId'
  )}/maplayers/${localStorage.getItem('maplayerId')}/loteGroup`;
  var opts = {
    group: {
      key: $('#key-group').val(),
      value: $('#value-group').val()
    },
    loteIds: $('#group-lotes-ids')
      .val()
      .split(',')
  };
  request.post(urlPath, opts, function(error, res) {
    if (error) {
      alert('danger', error.message);
      return;
    }
    alert(
      'success',
      `Las unidades fueron cargadas de forma correcta`
    );
    setTimeout(function() {
      $('#createGroupLotesVectorCancel').trigger('click');
      location.reload();
    }, 2000);
  });
};
