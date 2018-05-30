var $ = require('jquery');
var request = require('../../helpers/request');
var map = require('./map');
var draw = require('./draw');
var configLayers = require('./../../project/js/maplayer/configLayers');
var turf = require('@turf/turf');
var alert = require('../../helpers/alert');

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
      displayLayersDefault(maplayerData.maplayerId, maplayerData);
    });
  });
};

map.on('draw.selectionchange', updategeo);

function updategeo(e) {
  var data = draw.getSelected();
  console.log(data);
}

function displayLayersDefault(maplayerId, geojson) {
  var source = {
    type: 'geojson',
    data: geojson
  };

  map.addSource(maplayerId, source);

  var geojsonPoint = turf.featureCollection(
    geojson.features.map(function(f) {
      var centroide = turf.centroid(f);
      centroide.properties.id = f.properties.id;
      return centroide;
    })
  );

  map.addSource(maplayerId + 'Point', {
    type: 'geojson',
    data: geojsonPoint
  });

  var stylePolygon = {
    id: maplayerId + 'Polygon',
    type: 'fill',
    source: maplayerId,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-color': '#79d4ea',
      'fill-opacity': 0.3
    }
  };

  var styleText = {
    id: maplayerId + 'Text',
    type: 'symbol',
    'text-allow-overlap': true,
    source: maplayerId + 'Point',
    layout: {
      'text-field': '{id}',
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 10
    },
    interactive: true
  };
  map.addLayer(stylePolygon);
  map.addLayer(styleText);
}
