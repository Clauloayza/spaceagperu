var config = require('./../../../config');
mapboxgl.accessToken = config.accessToken;

var map = new mapboxgl.Map({
  container: 'map',
  style: config.mainStyle,
  center: [-73.927, -9.026],
  zoom: 5,
  hash: true
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
map.resize();

map.on('load', function() {
  map.resize();
});
module.exports = map;
