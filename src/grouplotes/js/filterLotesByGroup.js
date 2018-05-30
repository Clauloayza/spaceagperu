var $ = require('jquery');
var _ = require('underscore');
var alert = require('./../../helpers/alert');
var map = require('./map');
var turf = require('@turf/turf');

module.exports = function(group) {
  alert('warning', `${group.groupKey}=${group.groupValue}`);
  var maplayerId = localStorage.getItem('maplayerId');
  var geojson = map.getSource(maplayerId)._data;
  var geojsonfilter = turf.featureCollection(
    geojson.features.filter(function(feature) {
      if (feature.properties.groups[group.groupKey] == group.groupValue) {
        return feature;
      }
    })
  );

  var source = {
    type: 'geojson',
    data: geojsonfilter
  };

  if (map.getSource('sourceGroupSelected')) {
    map.getSource('sourceGroupSelected').setData(geojsonfilter);
  } else {
    map.addSource('sourceGroupSelected', source);
  }
  if (!map.getLayer('selectGroupLayer')) {
    var stylePolygon = {
      id: 'selectGroupLayer',
      type: 'line',
      source: 'sourceGroupSelected',
      layout: {
        visibility: 'visible'
      },
      paint: {
        'line-width': 3,
        'line-color': '#cece56',
        'line-opacity': 0.4
      }
    };
    map.addLayer(stylePolygon);
  }
};
