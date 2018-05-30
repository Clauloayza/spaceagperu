var $ = require('jquery');
var _ = require('underscore');
var request = require('./../../../helpers/request');
var alert = require('./../../../helpers/alert');
var map = require('../map/map');
var configLayers = require('./configLayers');

module.exports = function(maplayerId, geojson) {
  if (map.getLayer(maplayerId + 'Polygon')) {
    map.removeLayer(maplayerId + 'Polygon');
  }
  if (map.getLayer(maplayerId + 'Line')) {
    map.removeLayer(maplayerId + 'Line');
  }
  if (map.getLayer(maplayerId + 'Text')) {
    map.removeLayer(maplayerId + 'Text');
  }

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

  // console.log(map.getSource(maplayerId));
  if (map.getSource(maplayerId)) {
    map.getSource(maplayerId).setData(geojson);
  } else {
    map.addSource(maplayerId, source);
  }

  map.addLayer(stylePolygon);
  map.addLayer(styleLine);
  //En caso de que no haga el display
  map.resize();
};
