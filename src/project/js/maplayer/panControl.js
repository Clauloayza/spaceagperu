var map = require('../map/map');
var $ = require('jquery');
var Dragdealer = require('dragdealer');
module.exports = function() {
  $('.mapboxgl-ctrl-top-left').append(
    ` <div class="barra"></div>
    <div id='zoom-bar' class='ui-zoombar dragdealer mapboxgl-ctrl mapboxgl-ctrl-group'>
        <div id='handle' class='handle'>0</div>
    </div>
`
  );

  map.getCanvas().addEventListener(
    'keydown',
    function(e) {
      e.preventDefault();
      if (e.which === 38) {
        map.panBy([0, -deltaDistance], {
          easing: easing
        });
      } else if (e.which === 40) {
        map.panBy([0, deltaDistance], {
          easing: easing
        });
      } else if (e.which === 37) {
        map.easeTo({
          bearing: map.getBearing() - deltaDegrees,
          easing: easing
        });
      } else if (e.which === 39) {
        map.easeTo({
          bearing: map.getBearing() + deltaDegrees,
          easing: easing
        });
      }
    },
    true
  );

  $('#left').click(function(e) {
    e.preventDefault();
    map.panBy([-100, 0]);
  });

  $('#right').click(function(e) {
    e.preventDefault();
    map.panBy([100, 0]);
  });
  $('#down').click(function(e) {
    e.preventDefault();
    map.panBy([0, 100]);
  });
  $('#up').click(function(e) {
    e.preventDefault();
    map.panBy([0, -100]);
  });

  $('#center').click(function(e) {
    e.preventDefault();
    zoom_bar.setValue(0, 0);
  });
  var zoom_bar = new Dragdealer('zoom-bar', {
    horizontal: false,
    vertical: true,
    yPrecision: 0,
    animationCallback: function(x, y) {
      var pitch = (y.toFixed(2) * 60).toFixed(0);
      $('#handle').text(pitch);
      map.setPitch(pitch);
    }
  });
};
