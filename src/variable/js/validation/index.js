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

    // validate create Organization

    $('#formCreateVariable').validate({
      rules: {
        categoryId: {
          required: true
        },
        name: {
          required: true
        },
        dataType: {
          required: true
        }
      },
      messages: {
        categoryId: {
          required: 'Please choose category'
        },
        name: {
          required: 'The name of the file is required'
        },
        dataType: {
          required: 'Required'
        }
      }
    });
  });
};
