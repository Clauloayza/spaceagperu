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
    // validate password
    $('#formChangePassword').validate({
      rules: {
        password: {
          required: true,
          minlength: 5
        },
        passwordrepeat: {
          required: true,
          minlength: 5,
          equalTo: '#fieldChangePassword'
        }
      },
      messages: {
        password: {
          required: 'Ingrese su contraseña',
          minlength: 'Contraseña no muy segura'
        },
        passwordrepeat: {
          required: 'Por favor, confirme su contraseña',
          minlength: 'Contraseña no muy segura',
          equalTo: 'Contraseña incorrecta'
        }
      }
    });

    $('#formupdateUser').validate({
      rules: {
        user: {
          required: true,
          letters: true
        },
        profile: {
          required: true,
          letters: true
        },
        cellphone: {
          required: true,
          digits: true,
          maxlength: 11
        }
      },
      messages: {
        user: {
          required: 'Ingrese su nombre',
          letters: 'Su nombre no es válido'
        },
        profile: {
          required: 'Ingrese el cargo que ocupa en su empresa',
          letters: 'Cargo inválido'
        },
        cellphone: {
          required: 'Ingrese su celular',
          digits: 'Número de celular inválido',
          maxlength: 'Max 11 carácteres'
        }
      }
    });
  });
};
