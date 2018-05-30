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

    $('#formCreateChangeset').validate({
      rules: {
        'file-input-excel': {
          required: true
        },
        'maplayer-Id-Changeset': {
          required: true
        },
        'variable-Id-Changeset': {
          required: true
        }
      },
      messages: {
        'file-input-excel': {
          required: 'Se requiere archivo'
        },
        maplayerIdChangeset: {
          required: 'required'
        },
        variableIdChangeset: {
          required: 'required'
        }
      }
    });

    $('#formCreateMaplayerVector').validate({
      rules: {
        name: {
          required: true
        },
        'description-input': {
          required: true
        },
        'file-input-vector': {
          required: true
        }
      },
      messages: {
        name: {
          required: 'Name is required'
        },
        'description-input': {
          required: 'Description is required'
        },
        'file-input-vector': {
          required: 'No file loaded'
        }
      }
    });

    $('#formcreateMaplayerRaster').validate({
      rules: {
        name: {
          required: true
        },
        'description-input': {
          required: true
        },
        'file-input-vector': {
          required: true
        }
      },
      messages: {
        name: {
          required: 'Name is required'
        },
        'description-input': {
          required: 'Description is required'
        },
        'file-input-vector': {
          required: 'No file loaded'
        }
      }
    });

    $('#formRemoveMaplayer').validate({
      rules: {
        maplayers: {
          required: true
        }
      },
      messages: {
        maplayers: {
          required: 'required'
        }
      }
    });
  });
};
