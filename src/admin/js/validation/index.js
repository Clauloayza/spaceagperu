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

    $('#formchangeUserScope').validate({
      rules: {
        role: {
          required: true
        }
      },
      messages: {
        role: {
          required: 'Required'
        }
      }
    });
    $('#formCreateUser').validate({
      rules: {
        name: {
          required: true,
          letters: true,
          minlength: 3,
          maxlength: 50
        },
        email: {
          required: true,
          email: true
        },
        role: {
          required: true
        },
        title: {
          required: true,
          letters: true,
          minlength: 3,
          maxlength: 50
        },
        telephone: {
          required: true,
          digits: true,
          maxlength: 11
        },
        mobile: {
          required: true,
          digits: true,
          maxlength: 11
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        name: {
          required: 'Ingrese su nombre',
          letters: 'Su nombre no es válido',
          minlength: 'El usuario debe contener min 3 letras',
          maxlength: 'El usuario debe contener max 50 letras'
        },
        email: {
          required: 'Ingrese su correo electrónico',
          email: 'Correo inválido'
        },
        role: {
          required: 'Select role'
        },
        title: {
          required: 'Ingrese su nombre',
          letters: 'Su nombre no es válido',
          minlength: 'El usuario debe contener min 3 letras',
          maxlength: 'El usuario debe contener max 50 letras'
        },
        telephone: {
          required: 'Ingrese su teléfono',
          digits: 'Número de teléfono inválido',
          maxlength: 'Max 11 carácteres'
        },
        mobile: {
          required: 'Ingrese su celular',
          digits: 'Número de celular inválido',
          maxlength: 'Max 11 carácteres'
        },
        password: {
          required: 'Ingrese su contraseña',
          minlength: 'Contraseña no muy segura'
        }
      }
    });
  });
};
