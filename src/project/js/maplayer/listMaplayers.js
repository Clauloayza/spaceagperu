var $ = require('jquery');
var queryString = require('query-string');
var setQuery = require('set-query-string');
var request = require('./../../../helpers/request');
var map = require('../map/map');
var displayRasterLayer = require('./displayRasterLayer');
var displayVectorLayer = require('./displayVectorLayer');
var maplayersList = [];
var alert = require('./../../../helpers/alert');

module.exports = {
  listMaplayers: function() {
    var parsed = queryString.parse(location.search);
    var organizationId = localStorage.getItem('organizationId');
    var projectId = localStorage.getItem('projectId');
    var variableId = localStorage.getItem('variableId');
    var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers`;
    if (variableId) {
      urlPath = urlPath + `?variableId=${variableId}`;
    }
    request.getA(urlPath, function(error, maplayers) {
      if (error) {
        alert('danger', `No se pudo listar los Maplayers | ${error.message}`);
        return;
      }

      maplayersList = maplayers;
      var vectorMaplayers = [];
      for (var i = 0; i < maplayers.length; i++) {
        var maplayer = maplayers[i];
        var html = '';
        if (maplayer.type === 'vector') {
          //Evaluar si se activa el radio
          var radio = '';
          if (localStorage.getItem('maplayerId') === maplayer.id) {
            radio = 'checked';
          }

          html = `          
          <li class="nav-item active">
            <a href="#" id="${maplayer.id}" type="${maplayer.type}" class="nav-link mlayer">
            <input id="radio-${maplayer.id}" class="activeVectorLayer fa" type="radio" name="activeVectorLayer" ${radio}> 
              ${maplayer.name}
            </a>
          </li>`;

          $('#maplayerList li.vectorLoading').before(html);
        } else {
          var loadingBadge = '';
          if (maplayer.properties.status.serverProcessing) {
            loadingBadge = '<span class="badge badge-pill"></span>';
          }
          if (maplayer.properties.status.mapboxProcessing) {
            loadingBadge = '<span class="badge badge-pill"></span>';
          }
          if (maplayer.properties.status.error) {
            //TODO ver que error
            aler('danger', maplayer.properties.status.error);
            loadingBadge = '<span class="badge badge-pill badge-danger">Error!</img></span>';
          }
          html = `
          <li class="nav-item active">
              <a href="#" id="${maplayer.id}" type="${maplayer.type}" class="nav-link mlayer">
              <i class="fa fa-map-o"></i>
              ${maplayer.name}${loadingBadge}
              </a>
          </li>`;

          $('.maplayer li.layers').before(html);
        }

        //Event to display layers
        if (maplayer.type === 'raster' && maplayer.metadata) {
          displayRasterLayer(maplayer);
        } else {
          vectorMaplayers.push(maplayer);
        }
      }
      displayVectorLayer(vectorMaplayers);
    });
  },
  setMaplayersToRemove: function() {
    for (var i = 0; i < maplayersList.length; i++) {
      $('#selectRemoveMaplayers').append(
        $('<option>', {
          value: maplayersList[i].id,
          text: maplayersList[i].name
        })
      );
    }
  },
  removeMaplayer: function() {
    var organizationId = localStorage.getItem('organizationId');
    var projectId = localStorage.getItem('projectId');
    var mapLayerId = $('#selectRemoveMaplayers').val();
    var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${mapLayerId}`;

    if (mapLayerId.length === 0) {
      $('#errorRemoveMaplayer')
        .show()
        .delay(3000)
        .hide(1000);
    } else {
      if (confirm(`Desea eliminar el layer : ${mapLayerId}`)) {
        request.delete(urlPath, function(error, result) {
          if (error) {
            alert('success', `Delete Capa`);
          } else {
            setQuery({
              maplayerId: ''
            });
            localStorage.setItem('maplayerId', '');
            location.reload();
          }
        });
      }
    }
  },
  ShowHideLayer: function(e) {
    var layerId = e.target.id;
    var type = e.target.type;
    var layerToDisable = [];
    if (type === 'vector') {
      layerToDisable.push(layerId + 'Polygon');
      layerToDisable.push(layerId + 'Line');
      layerToDisable.push(layerId + 'Text');
    } else {
      layerToDisable.push(layerId);
    }
    for (var k = 0; k < layerToDisable.length; k++) {
      if (map.getLayer(layerToDisable[k])) {
        var visible = map.getLayoutProperty(layerToDisable[k], 'visibility');
        if (visible === 'visible') {
          map.setLayoutProperty(layerToDisable[k], 'visibility', 'none');
          $(e.target)
            .parent()
            .removeClass('active');
        } else {
          $(e.target)
            .parent()
            .addClass('active');
          map.setLayoutProperty(layerToDisable[k], 'visibility', 'visible');
          //find the layer location and set the map
          for (var i = 0; i < maplayersList.length; i++) {
            if (maplayersList[i].id === layerId && maplayersList[i].properties.layer.centroide) {
              map.fitBounds(maplayersList[i].properties.layer.bbox);
            }
          }
        }
      }
    }
  }
};
