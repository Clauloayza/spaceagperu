var $ = require('jquery');

module.exports = function() {
  $(function() {
    $.validator.setDefaults({
      submitHandler: function() {
        alert('submitted!');
      }
    });

    $.validator.addMethod(
      'valueNotEquals',
      function(value, element, arg) {
        return arg !== value;
      },
      'Value must not equal arg.'
    );

    $('#formCreateGroupLotes').validate({
      rules: {
        'key-group': {
          required: true
        },
        'value-group': {
          required: true
        },
        'group-lotes-ids': {
          required: true
        }
      },
      messages: {
        'key-group': {
          required: 'Select group, please'
        },
        'value-group': {
          required: 'required'
        },
        'group-lotes-ids': {
          required: 'required, id group'
        }
      }
    });
  });
};
