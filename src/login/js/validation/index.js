var $ = require('jquery');

module.exports = function() {
  $(function() {
    $.validator.setDefaults({
      submitHandler: function() {
        console.log('send request');
      }
    });

    $.validator.addMethod('letters', function(value, element) {
      return this.optional(element) || /[a-zA-Z]/.test(value);
    });

    $('#loginregister').validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        email: {
          required: 'Ingrese su correo electrónico',
          email: 'Correo inválido'
        },
        password: {
          required: 'Olvido ingresar su contraseña'
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
        title: {
          required: true,
          letters: true,
          minlength: 3,
          maxlength: 50
        },
        phone: {
          required: true,
          digits: true,
          maxlength: 11
        },
        cellphone: {
          required: true,
          digits: true,
          maxlength: 11
        },
        password: {
          required: true,
          minlength: 5
        },
        confirm_password: {
          required: true,
          minlength: 5,
          equalTo: '#passwordSignup'
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
        title: {
          required: 'Ingrese el cargo que ocupa en su empresa',
          letters: 'Cargo inválido',
          minlength: 'El cargo debe tener como min 3 letras',
          maxlength: 'El cargo debe tener como max 50 letras'
        },
        phone: {
          required: 'Ingrese su teléfono',
          digits: 'Número de teléfono inválido',
          maxlength: 'Max 11 carácteres'
        },
        cellphone: {
          required: 'Ingrese su celular',
          digits: 'Número de celular inválido',
          maxlength: 'Max 11 carácteres'
        },
        password: {
          required: 'Ingrese su contraseña',
          minlength: 'Contraseña no muy segura'
        },
        confirm_password: {
          required: 'Por favor, confirme su contraseña',
          minlength: 'Contraseña no muy segura',
          equalTo: 'Contraseña incorrecta'
        }
      }
    });
  });
};
