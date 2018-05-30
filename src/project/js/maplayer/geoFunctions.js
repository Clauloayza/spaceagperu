var _ = require('underscore');
var turf = require('@turf/turf');
module.exports = {
  mergeGeojsonData,
  convertFeaturesToPoint
};

/**
 *Merge two geojson layer
 * @param  {objetc} fc1 existing data
 * @param  {objetc} variableData variable lote
 * @param  {string} variable to update
 * @return {object}  merged data
 */
function mergeGeojsonData(fc1, variableData, variableId) {
  var variablesObj = {};
  var fc = {
    type: 'FeatureCollection',
    features: []
  };
  for (var k = 0; k < variableData.lotes.length; k++) {
    variablesObj[variableData.lotes[k].loteId] = variableData.lotes[k];
  }
  for (var i = 0; i < fc1.features.length; i++) {
    var feature = fc1.features[i];
    if (variablesObj[feature.properties.id]) {
      feature.properties[variableId] = variablesObj[feature.properties.id];
      feature.properties[variableId + '_value'] = variablesObj[feature.properties.id].value; //mapbox no no soporta objetos en los estilos, asi que creamos una varaible
      fc.features.push(feature);
    } else {
      feature.properties[variableId + '_value'] = 0;
    }
  }
  return fc;
}

function convertFeaturesToPoint(fc1, variableData, variableId) {
  var variablesObj = {};
  var fc = {
    type: 'FeatureCollection',
    features: []
  };
  for (var k = 0; k < variableData.lotes.length; k++) {
    variablesObj[variableData.lotes[k].loteId] = variableData.lotes[k];
  }

  for (var i = 0; i < fc1.features.length; i++) {
    var feature = fc1.features[i];
    var point = turf.centroid(feature);
    if (variablesObj[feature.properties.id]) {
      point.properties[variableId] = variablesObj[feature.properties.id];
      point.properties[variableId + '_value'] = variablesObj[feature.properties.id].value.toFixed(3); //mapbox no no soporta objetos en los estilos, asi que creamos una varaible
      fc.features.push(point);
    } else {
      point.properties[variableId + '_value'] = 0;
    }
  }
  return fc;
}
