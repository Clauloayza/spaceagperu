var $ = require('jquery');
var map = require('../map/map');

/**
 * Show the raster layer on the map
 * @param  {object} maplayer object properties
 */
module.exports = function(maplayer) {
  var source = {
    type: 'raster',
    url: `mapbox://${maplayer.properties.layer.mapid}`,
    tileSize: 256
  };
  var styleRaster = {
    id: maplayer.id,
    type: 'raster',
    source: maplayer.id,
    minzoom: 0,
    maxzoom: 22,
    layout: {
      visibility: 'visible'
    }
  };
  map.addSource(maplayer.id, source);
  map.addLayer(styleRaster);
};
