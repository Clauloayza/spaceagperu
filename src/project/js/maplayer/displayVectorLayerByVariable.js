var $ = require('jquery');
var request = require('./../../../helpers/request');
var map = require('../map/map');
var alert = require('./../../../helpers/alert');
var geoFunctions = require('./geoFunctions');
var legend = require('./legend');
var configLayers = require('./configLayers');
var _ = require('underscore');

module.exports = function(variableId, ranges) {
  var organizationId = localStorage.getItem('organizationId');
  var projectId = localStorage.getItem('projectId');
  var maplayerId = localStorage.getItem('maplayerId');
  var groupKey = localStorage.getItem('groupKey');
  var groupValue = localStorage.getItem('groupValue');
  var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${maplayerId}/lotes_variables?variableIds=${variableId}`;
  //En caso de que se haya selecionado un grupo
  if (groupKey && groupValue) {
    urlPath += `&groupKey=${groupKey}&groupValue=${groupValue}`;
  }

  request.getA(urlPath, function(error, variableData) {
    if (error) {
      alert('warning', `Se produjo un error en el listado de lotes ${error}`);
      return;
    }
    displayLayersVariableByRange({
      maplayerId,
      variableId,
      variableData,
      ranges
    });
  });
};

function displayLayersVariableByRange(opts) {
  var maplayerId = opts.maplayerId;
  var variableId = opts.variableId;
  var geojson = geoFunctions.mergeGeojsonData(map.getSource(maplayerId)._data, opts.variableData, opts.variableId);

  var geojsonPoint = geoFunctions.convertFeaturesToPoint(map.getSource(maplayerId)._data, opts.variableData, opts.variableId);

  //get ranges
  var rangesLotes = _.map(opts.ranges.ranges, function(v, k) {
    return v.values[0];
  });

  var valueColor = [
    {
      value: 0,
      color: configLayers.polygonFill
    }
  ];
  for (var i = 0; i < rangesLotes.length; i++) {
    valueColor.push({
      value: rangesLotes[i],
      color: configLayers.defaultColors[i]
    });
  }
  var arrayColors = [].concat(
    valueColor.map(function(v) {
      return [v.value, v.color];
    })
  );
  var stylePolygon = {
    id: maplayerId + 'Polygon',
    source: maplayerId,
    layout: {
      visibility: 'visible'
    },
    type: 'fill',
    paint: {
      'fill-color': {
        base: 1,
        type: 'interval',
        property: variableId + '_value',
        stops: arrayColors,
        default: configLayers.polygonFill
      },
      'fill-opacity': 0.7
    }
  };

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
      'line-opacity': 0.3
    }
  };

  //Textsource id
  var sourcePoint = {
    type: 'geojson',
    data: geojsonPoint
  };

  var sourcePointId = maplayerId + 'source-point';
  if (map.getSource(sourcePointId)) {
    map.getSource(sourcePointId).setData(geojsonPoint);
  } else {
    map.addSource(sourcePointId, sourcePoint);
  }

  var styleText = {
    id: maplayerId + 'Text',
    type: 'symbol',
    maxzoom: 20,
    minzoom: 10,
    source: sourcePointId,
    layout: {
      'text-field': `{${variableId + '_value'}}`,
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 10
    },
    paint: {
      'text-color': '#000',
      'text-halo-color': '#fff',
      'text-halo-width': 0.3
    }
  };

  map.getSource(maplayerId).setData(geojson);
  //need to fix
  if (map.getLayer(maplayerId + 'Polygon')) {
    map.removeLayer(maplayerId + 'Polygon');
  }
  if (map.getLayer(maplayerId + 'Line')) {
    map.removeLayer(maplayerId + 'Line');
  }
  if (map.getLayer(maplayerId + 'Text')) {
    map.removeLayer(maplayerId + 'Text');
  }
  // Add the new layers
  map.addLayer(stylePolygon);
  map.addLayer(styleLine);
  map.addLayer(styleText);
  legend(valueColor);
}
