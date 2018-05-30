var $ = require('jquery');

module.exports = function(type, message) {
  // success
  // info
  // warning
  // danger
  var hide = 2000;
  var delay = 4000;
  if (message.length > 100) {
    delay = 8000;
  }
  var idDiv = Math.random()
    .toString(36)
    .substring(7);
  $('#alerts').append(`<div class="alert alert-${type}" id="${idDiv}" role="alert">${message}</div>`);
  $(`#${idDiv}`)
    .delay(delay)
    .hide(hide);
  setTimeout(function() {
    $(`#${idDiv}`).remove();
  }, delay + hide);
};
