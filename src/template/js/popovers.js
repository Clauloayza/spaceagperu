var $ = require('jquery');

module.exports = function() {
  $(function() {
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({
      trigger: 'focus'
    });
  });
};
