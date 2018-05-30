var $ = require('jquery');
var request = require('./../../../helpers/request');
var map = require('../map/map');
var alert = require('./../../../helpers/alert');
var popup = require('./popup');
var configLayers = require('./configLayers');
var printLayersByDefault = require('./printLayersByDefault');

module.exports = function(vectorMaplayers) {
  var urls = vectorMaplayers.map(function(maplayer) {
    var organizationId = localStorage.getItem('organizationId');
    var projectId = localStorage.getItem('projectId');
    return `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${maplayer.id}/lotes`;
  });
  request.getAll(urls, function(error, res) {
    if (error) {
      alert('danger', error.message);
      return;
    }
    res.map(function(maplayerData) {
      printLayersByDefault(maplayerData.maplayerId, maplayerData);
      popup(maplayerData.maplayerId);
    });
  });
};

function displayLayersDefault(maplayerId, geojson) {
  var source = {
    type: 'geojson',
    data: geojson
  };

  var stylePolygon = {
    id: maplayerId + 'Polygon',
    type: 'fill',
    source: maplayerId,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-color': configLayers.polygonFill,
      'fill-opacity': 0.7
    }
  };
  //Default layer style for line
  var styleLine = {
    id: maplayerId + 'Line',
    type: 'line',
    source: maplayerId,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'line-width': 1,
      'line-color': configLayers.lineColor,
      'line-opacity': 0.4
    }
  };

  map.addSource(maplayerId, source);
  map.addLayer(stylePolygon);
  map.addLayer(styleLine);
}
