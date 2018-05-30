var $ = require('jquery');
var request = require('./../../../helpers/request');
var config = require('./../../../config');
var alert = require('./../../../helpers/alert');
var messages = require('./../../../helpers/messages');

module.exports = function() {
  var urlFileServer = config.hostFileUploader + '/upload';
  var formData = new FormData();
  formData.append('file', $('input[name=file-input-raster]')[0].files[0]);
  var bar = $('.progress-bar');
  $.ajax({
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        'progress',
        function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            console.log(percentComplete);
            bar.width(percentComplete + '%');
            if (percentComplete === 0) {
              bar.width('1%');
            }
            if (percentComplete === 100) {
              bar.removeClass('progress-bar-animated');
            }
          }
        },
        false
      );
      return xhr;
    },
    url: urlFileServer,
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function(result) {
      //un vez que el archivo ya esta en S3 , mandamos un request por url.
      var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${localStorage.getItem(
        'projectId'
      )}/maplayers_raster_location`;
      var props = {
        name: $('#maplayer-raster-name').val(),
        description: $('#maplayer-raster-description').val(),
        tifUrl: result.location,
        properties: result
      };
      request.post(urlPath, props, function(error, result) {
        if (error) {
          if (error.statusCode === 403) {
            alert('danger', `${messages.scope} | ${error.message}`);
          } else {
            alert('danger', error.message);
            alert('success', `El raster se creo satisfactoriemente: ${res.mapLayer.name}`);
            //hide the layers
            $('#displayModalToCreateMaplayerRaster').hide(1000);
            setTimeout(function() {
              $('#MaplayerRastercancel').trigger('click');
              location.reload();
            }, 3000);
          }
        } else {
          location.reload();
        }
      });
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      alert('danger', `Ingrese todos los campos  | ${messages.scope} | ${thrownError}`);
    }
  });
};
