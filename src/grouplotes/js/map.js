var config = require('../../config');
var draw = require('./draw');
mapboxgl.accessToken = config.accessToken;
var map = new mapboxgl.Map({
  container: 'map',
  style: config.mainStyle,
  center: [-73.927, -9.026],
  zoom: 5,
  hash: true
});

map.on('load', function() {
  map.addControl(draw, 'top-right');
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');
  map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
  map.resize();
});

module.exports = map;
