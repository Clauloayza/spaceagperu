var $ = require('jquery');
var request = require('./../../../helpers/request');

module.exports = function(valueColor) {
  $('#legenda').empty();
  var html = `<div id='state-legend' class='legend'>`;
  for (var i = 0; i < valueColor.length; i++) {
    if (i == 0) {
      html += `<div><span style='background-color: ${valueColor[i].color}'>0</span></div>`;
    } else if (i == valueColor.length - 1) {
      html += `<div><span style='background-color: ${valueColor[i].color}'>${valueColor[i].value.toFixed(2)} <= X  </span></div>`;
    } else {
      html += `<div><span style='background-color: ${valueColor[i].color}'>${valueColor[i].value.toFixed(2)} <=  X < ${valueColor[
        i + 1
      ].value.toFixed(2)}</span></div>`;
    }
  }
  html += '</div>';
  $('#legenda').append(html);
};
