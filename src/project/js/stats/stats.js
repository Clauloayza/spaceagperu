var $ = require('jquery');
var queryString = require('query-string');
var _ = require('underscore');
var request = require('./../../../helpers/request');
var alert = require('./../../../helpers/alert');

module.exports = {
  fillStats
};
var chart = null; //declaramos aqui porque necesitamos destruir el chart  para luego actualizar un nuevo chart

function fillStats(variableId, cb) {
  var organizationId = localStorage.getItem('organizationId');
  var projectId = localStorage.getItem('projectId');
  var maplayerId = localStorage.getItem('maplayerId');
  var groupKey = localStorage.getItem('groupKey');
  var groupValue = localStorage.getItem('groupValue');
  var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${maplayerId}/stats/histograma`;
  var query = `?variableId=${variableId}`;
  urlPath = urlPath + query;

  if (groupKey && groupValue) {
    urlPath += `&groupKey=${groupKey}&groupValue=${groupValue}`;
  }

  console.log(urlPath);
  request.getA(urlPath, function(error, result) {
    if (error) {
      alert('danger', error.message);
      cb(error, null);
      return;
    }
    if (chart) {
      chart.destroy();
    }
    //==============================================> Fill resumen
    $('.varibleNameStats').text(result.variable.name);
    $('#stats_numLotes').text(result.numLotes);
    $('#stats_promedio').text(result.promedio.toFixed(2));
    $('#stats_minimo').text(result.minValue.toFixed(2));
    $('#stats_maximo').text(result.maxValue.toFixed(2));
    //==============================================> Histogramas
    var statsConfig = {
      type: 'bar',
      data: {
        labels: _.map(result.ranges, function(v, k) {
          return v.value.toFixed(2);
        }),
        datasets: createDatasets(result),
        options: {
          title: {
            text: 'Stats'
          }
        }
      },
      options: {
        responsive: true
      }
    };
    $('#canvas').empty();
    var ctx = document.getElementById('canvas').getContext('2d');
    chart = new Chart(ctx, statsConfig);
    //==============================================> MÁXIMOS Y MÍNIMOS
    createMaximoMinimos(result);
    //retornar el valor par autilizar en los lotes.
    cb(null, result);
  });
}

function createDatasets(result) {
  var values = _.map(result.ranges, function(v, k) {
    return v.ids.length;
  });

  return [
    {
      type: 'line',
      label: 'linea',
      fill: false,
      backgroundColor: 'rgb(255, 103, 0)',
      borderColor: 'rgb(255, 103, 0)',
      data: values
    },
    {
      type: 'bar',
      label: 'Num',
      backgroundColor: ['#bd0026', '#f03b20', '#fd8d3c', '#fecc5c', '#ffffb2'],
      borderColor: 'rgb(54, 162, 235)',
      data: values
    }
  ];
}

function createMaximoMinimos(result) {
  $('#maximos').empty();
  $('#minimos').empty();
  var htmlMaximos = `<table class="table table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Lote</th>
                        <th>Media</th>
                      </tr>
                    </thead>
                    <tbody>
					${buildMaxMinRows(result.maxLotes.reverse())}
                    </tbody>
                  </table>`;

  $('#maximos').append(htmlMaximos);

  var htmlMinimos = `<table class="table table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Lote</th>
                        <th>Media</th>
                      </tr>
                    </thead>
                    <tbody>
					${buildMaxMinRows(result.minLotes)}
                    </tbody>
                  </table>`;
  $('#minimos').append(htmlMinimos);
}

function buildMaxMinRows(lotes) {
  var rows = '';
  _.map(lotes, function(v, k) {
    rows += ` <tr>
                 <td>${v.id}</td>
                 <td>
                    <span class="badge badge-secondary">${v.value.toFixed(2)}</span>
                  </td>
              </tr>`;
  });
  return rows;
}
