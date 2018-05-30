var map = require('../map/map');
var $ = require('jquery');
module.exports = function() {
  map.on('mousemove', function(e) {
    $('#latitude').text(e.lngLat.lat.toFixed(5));
    $('#longitud').text(e.lngLat.lng.toFixed(5));
  });
};