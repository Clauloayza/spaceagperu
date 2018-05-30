var $ = require('jquery');
var request = require('../../helpers/request');
var map = require('./map');
var draw = require('./draw');
var alert = require('../../helpers/alert');
var turf = require('@turf/turf');

var data = turf.featureCollection([]);
map.on('draw.selectionchange', updategeo);

function updategeo(e) {
  data = draw.getSelected();
}

module.exports = function() {
  if (data.features.length === 0) {
    alert('warning', 'Selecione almenos una lote');
    return;
  }
  var ids = [];
  for (var i = 0; i < data.features.length; i++) {
    console.log(data.features[i].properties);
    ids.push(data.features[i].properties.id);
  }
  $('#group-lotes-ids').text(ids.join(','));
};
