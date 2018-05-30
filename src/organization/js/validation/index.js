var $ = require('jquery');
//TODO, nned to fix the validators
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

    /* jQuery.validator.addMethod(
      "notEqualTo",
      function(elementValue,element,param) {
        return elementValue != param;
      },
      "Value cannot be {0}"
    );*/

    // validate create Organization
    $('#formCreateOrganization').validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
          maxlength: 50
        },
        description: {
          required: true
        }
      },
      messages: {
        name: {
          required: 'Por favor, ingrese su nombre',
          minlength: 'Por favor, ingrese mínimo 3 carácteres',
          maxlength: 'Por favor, ingrese máximo 50 carácteres'
        },
        description: {
          required: 'La descripción de su organización es importante'
        }
      }
    });

    // validate create Project
    $('#formCreateProject').validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        },
        country: {
          required: true,
          notEqualTo: 7
        },
        city: {
          required: true,
          notEqualTo: 7
        }
      },
      messages: {
        name: {
          required: 'Por favor, ingrese su nombre',
          minlength: 'Por favor, ingrese mínimo 5 carácteres'
        },
        country: {
          required: 'Por favor, seleccione un país',
          notEqualTo: 'Por favor, seleccione un país'
        },
        city: {
          required: 'Por favor, seleccione una ciudad',
          notEqualTo: 'Por favor, seleccione un ciudad'
        }
      }
    });

    //Edit project Update Project
    $('#formUpdateProject').validate({
      rules: {
        name: {
          required: true,
          minlength: 5
        },
        country: {
          required: true,
          notEqualTo: 7
        },
        city: {
          required: true,
          notEqualTo: 7
        }
      },
      messages: {
        name: {
          required: 'Por favor, ingrese su nombre',
          minlength: 'Por favor, ingrese mínimo 5 carácteres'
        },
        country: {
          required: 'Por favor, seleccione un país',
          notEqualTo: 'Por favor, seleccione un país'
        },
        city: {
          required: 'Por favor, seleccione una ciudad',
          notEqualTo: 'Por favor, seleccione un ciudad'
        }
      }
    });

    //Create Variable
    $('#formCreateVariable').validate({
      rules: {
        categoryId: {
          required: true,
          valueNotEquals: 'default'
        },
        name: {
          required: true
        },
        dataType: {
          required: true,
          valueNotEquals: 'default'
        }
      },
      messages: {
        categoryId: {
          required: 'Por favor, ingrese su nombre',
          valueNotEquals: 'Please select an item!'
        },
        name: {
          required: 'Por favor, ingrese su nombre'
        },
        dataType: {
          required: 'Por favor, ingrese su nombre',
          valueNotEquals: 'Please select an item!'
        }
      }
    });

    $('#signupForm').validate({
      rules: {
        firstname: 'required',
        lastname: 'required',
        username: {
          required: true,
          minlength: 2
        },
        password: {
          required: true,
          minlength: 5
        },
        confirm_password: {
          required: true,
          minlength: 5,
          equalTo: '#password'
        },
        email: {
          required: true,
          email: true
        },
        agree: 'required',
        country: {
          required: true
        },
        city: {
          required: true
        }
      },
      messages: {
        firstname: 'Please enter your firstname',
        lastname: 'Please enter your lastname',
        username: {
          required: 'Please enter a username',
          minlength: 'Your username must consist of at least 2 characters'
        },
        password: {
          required: 'Please provide a password',
          minlength: 'Your password must be at least 5 characters long'
        },
        confirm_password: {
          required: 'Please provide a password',
          minlength: 'Your password must be at least 5 characters long',
          equalTo: 'Please enter the same password as above'
        },
        email: 'Please enter a valid email address',
        agree: 'Please accept our policy'
      },
      errorElement: 'em',
      errorPlacement: function(error, element) {
        error.addClass('invalid-feedback');
        if (element.prop('type') === 'checkbox') {
          error.insertAfter(element.parent('label'));
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function(element, errorClass, validClass) {
        $(element)
          .addClass('is-invalid')
          .removeClass('is-valid');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element)
          .addClass('is-valid')
          .removeClass('is-invalid');
      }
    });
  });
};
