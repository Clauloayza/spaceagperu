var $ = require('jquery');
var request = require('../../helpers/request');
var map = require('./map');
var alert = require('../../helpers/alert');
var draw = require('./draw');
var displayVectorLayer = require('./displayVectorLayer');
var vectorMaplayers = [];

module.exports = {
  listMaplayers: function() {
    var organizationId = localStorage.getItem('organizationId');
    var projectId = localStorage.getItem('projectId');
    var variableId = localStorage.getItem('variableId');
    var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers`;
    request.getA(urlPath, function(error, maplayers) {
      if (error) {
        alert('danger', `No se pudo listar los Maplayers | ${error.message}`);
        return;
      }
      for (var i = 0; i < maplayers.length; i++) {
        var maplayer = maplayers[i];
        var html = '';
        if (maplayer.type === 'vector') {
          html = `          
          <li class="nav-item list-agruparmap">
            <a href="#" id="${maplayer.id}" type="${maplayer.type}" class="nav-link mlayer">
              ${maplayer.name}
            </a>
          </li>`;
          $('#maplayerList li.layers').after(html);
          vectorMaplayers.push(maplayer);
        }
      }

      displayVectorLayer(vectorMaplayers);
    });
  },
  zoomToLayer: function(e) {
    var maplayerId = e.target.id;
    $('.mlayer')
      .parent()
      .removeClass('active');
    draw.deleteAll().getAll();

    for (var k = 0; k < vectorMaplayers.length; k++) {
      localStorage.setItem('maplayerId', maplayerId);
      if (maplayerId === vectorMaplayers[k].id) {
        console.log(map.getSource(maplayerId));
        draw.add(map.getSource(maplayerId)._data);
        map.fitBounds(vectorMaplayers[k].properties.layer.bbox);
        $(e.target)
          .parent()
          .addClass('active');
      }
    }
  }
};
