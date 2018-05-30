var map = require('../map/map');
var _ = require('underscore');

/**
 * Muestra el popover en el layer, agregamos +'Polygon', porque sse ha creado dos layers con el mismo source.
 */
module.exports = function(maplayerId) {
  var maplayerIdOnTheMap = maplayerId + 'Polygon';
  map.on('click', maplayerIdOnTheMap, function(e) {
    // if (maplayerId !== localStorage.getItem('maplayerId')) {
    //   return;
    // }
    var properties = e.features[0].properties;
    if (typeof properties.attributes == 'string') {
      properties.attributes = JSON.parse(properties.attributes);
    }
    if (typeof properties.groups == 'string') {
      properties.groups = JSON.parse(properties.groups);
    }
    var html = `<h6><strong><span>Lote : </span>${properties.attributes.id} </strong> </h6>
                  <ul class="nav nav-tabs" role="tablist">
                      <li class="nav-item">
                      <a class="nav-link active" data-toggle="tab" href="#atributos" role="tab" aria-controls="atributos">Atributos</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link " data-toggle="tab" href="#variable" role="tab" aria-controls="variable">Variables</a>
                      </li>
                    
                      </li>
                      <!--<li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#groups" role="tab" aria-controls="groups">Grupo</a>
                      </li>-->
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane " id="variable" role="tabpanel">
                        ${buildVariables(properties)}
                    </div>
                    <div class="tab-pane active" id="atributos" role="tabpanel" style="height: 180px; overflow-y: scroll;">
                        ${buildAtributesAndGroup(properties.attributes)}
                    </div>
                    <div class="tab-pane" id="groups" role="tabpanel">
                        ${buildAtributesAndGroup(properties.groups)}
                    </div>
                  </div>`;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(map);
  });

  map.on('mouseenter', maplayerIdOnTheMap, function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', maplayerIdOnTheMap, function() {
    map.getCanvas().style.cursor = '';
  });
};

function buildAtributesAndGroup(properties) {
  var rows = '';
  _.each(properties, function(v, k) {
    rows += `<tr>      
                <td>${k}</td>
                <td>${v}</td>
            </tr>`;
  });

  var html = ` <table class="table table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Identificador</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${rows}
                    </tbody>
                </table>`;
  return html;
}

function buildVariables(properties) {
  var rows = '';
  var noMostar = ['attributes', 'id', 'groups', 'lastUpdate', 'variables'];
  _.each(properties, function(v, k) {
    //las variables siempre  vienen en el "{"date":"2017-12-22T00:00:00.000Z","value":2,"variable":"Alerta de intervalo de cosecha","timestamp":1513900800}"
    if (noMostar.indexOf(k) == -1) {
      //Convertir la variables a objectos , Mapbox convirtio estos a String.
      if (typeof v == 'string' && v.split('_')[1] !== 'value') {
        //v.split('_')[1] !== 'value', Verificar mas esto, *_value se esta creando para pintar el mapa
        v = JSON.parse(v);
        //Solo permite variables que tiene valor
        if (v.variable && v.date) {
          rows += `<tr>
                      <td>${v.variable}</td>
                      <td>${v.date.split('T')[0]}</td>
                      <td>${v.value}</td>
                  </tr>`;
        }
      }
    }
  });

  var html = ` <table class="table table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Variable</th>
                        <th>Fecha</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${rows}
                    </tbody>
                </table>`;
  return html;
}
