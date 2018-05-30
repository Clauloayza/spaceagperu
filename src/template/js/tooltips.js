var $ = require('jquery');

module.exports = function() {
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
};
