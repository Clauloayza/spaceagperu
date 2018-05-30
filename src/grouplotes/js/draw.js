var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: false,
    line_string: false,
    point: false,
    trash: false
  }
});

module.exports = draw;
