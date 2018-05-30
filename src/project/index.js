var $ = require('jquery');
var queryString = require('query-string');
var setQuery = require('set-query-string');
var _ = require('underscore');
require('./js/validation')();
//Dashboard requirements
require('../template')();
require('../helpers/redirect')();
require('../user')();
// Local requirements
require('./css/style.css');
require('./css/map.css');
require('./css/panControl.css');

var map = require('./js/map/map');
var project = require('./js/project/project');
var ListVariablesCategories = require('./js/categories/ListVariablesCategories');
var stats = require('./js/stats/stats');
var listMaplayers = require('./js/maplayer/listMaplayers');
var createMaplayerRaster = require('./js/maplayer/createMaplayerRaster');
var createMaplayerVector = require('./js/maplayer/createMaplayerVector');
var displayVectorLayerByVariable = require('./js/maplayer/displayVectorLayerByVariable');
var crudChangeset = require('./js/changeset/crudChangeset');
var listGroupsLotes = require('./js/groupLotes/listGroupsLotes');
var filterLotesByGroup = require('./js/groupLotes/filterLotesByGroup');
require('./js/complements/coordinates')();
var alert = require('../helpers/alert');

//init
var keepStorage = ['token', 'organizationId', 'name', 'projectId'];
for (var i = 0; i < localStorage.length; i++) {
  if (keepStorage.indexOf(localStorage.key(i)) === -1) {
    localStorage.removeItem(localStorage.key(i));
  }
}
var parsed = queryString.parse(location.search);
_.each(parsed, function(v, k) {
  localStorage.setItem(k, v);
});

$(document).ready(function($) {
  //==========================================================================> Display Project info
  project.fillProjectProperties();

  //==========================================================================> Display Categories and variables on menu
  ListVariablesCategories.displayMenuVariables();

  //==========================================================================> Display Maplayers on the map
  listMaplayers.listMaplayers(); //TODO no muestra variables al cargar.

  //==========================================================================> DISPLAy GROUP  OF LOTES
  //Este puede esperarun momneto para cargar
  setTimeout(function() {
    if ($('input[type=radio][name=activeVectorLayer]').is(':checked')) {
      var maplayerId = $('input[type=radio][name=activeVectorLayer]:checked')
        .attr('id')
        .split('-')[1];
      listGroupsLotes(maplayerId);
    }
  }, 1000);

  $(document).on('click', '.selectGroupLotes', function() {
    var group = {
      groupKey: $(this)
        .attr('id')
        .split('&&')[0],
      groupValue: $(this)
        .attr('id')
        .split('&&')[1]
    };
    filterLotesByGroup(group);
  });

  //================================VARIABLES
  $(document).ready(function() {
    $('#menu-icon').click(function() {
      $('.menu li:not(:first-child)').toggle();
    });
  });
  $(document).ready(function() {
    $('#image-all').click(function() {
      $('.image-all li:not(:first-child)').toggle();
    });
  });
  $(document).ready(function() {
    $('#rgb').click(function() {
      $('.rgb li:not(:first-child)').toggle();
    });
  });
  
//==================================CARTOGRAFIA
$(document).ready(function() {
  $('#cartografia-link').click(function() {
    $('.cartografia li:not(:first-child)').toggle();
  });
});
//====================================GROUP
$(document).ready(function() {
  $('#group-lotes').click(function() {
    $('.group li:not(:first-child)').toggle();
  });
});
//====================================GROUP
$(document).ready(function() {
  $('#excel-variable').click(function() {
    $('.excel li:not(:first-child)').toggle();
  });
});
//=========================================SEARCH
$(document).ready(function(){
  $('#miBusqueda').on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#categoriesMenu li").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
//=======================================CLEAR search
$(".clearable").each(function() {

  var $inp = $(this).find("input:text"),
      $cle = $(this).find(".clearable__clear");

  $inp.on("input", function(){
    $cle.toggle(!!this.value);
  });
  
  $cle.on("touchstart click", function(e) {
    e.preventDefault();
    $inp.val("").trigger("input");
  });
  
});
//==========================================COORDENADAS
$(document).ready(function() {
  $(document).mousemove(function(e){
    $('#txtCoordenadas').html(e.pageX +', '+ e.pageY);
    });
  });


  //==========================================================================> MAPLAYERS Actions
  /**
   * Show and hide layers
   */
  $(document).on('click', '.mlayer', function(e) {
    listMaplayers.ShowHideLayer(e);
  });
  //==========================================================================> CREATE MAPLAYER
  $(document).on('click', '#createMaplayerVector', function() {
    createMaplayerVector();
  });
  $(document).on('click', '#createMaplayerRaster', function() {
    createMaplayerRaster();
  });
  $(document).on('click', '#listMaplayerToRemove', function() {
    listMaplayers.setMaplayersToRemove();
  });
  $(document).on('click', '#removeMaplayer', function() {
    listMaplayers.removeMaplayer();
  });
  //==========================================================================> CHANGESET
  $(document).on('click', '#listVariablesForChangeset', function() {
    crudChangeset.listVariablesForChangeset();
    crudChangeset.listMaplayerForChangeset();
  });
  $(document).on('click', '#createChangeset', function() {
    crudChangeset.createChangeset();
  });
  //==========================================================================>ACTIVE LAYER
  $(document).on('click', '.activeVectorLayer', function() {
    var maplayerId = $('input[type=radio][name=activeVectorLayer]:checked')
      .attr('id')
      .split('-')[1];
    localStorage.setItem('maplayerId', maplayerId);
    setQuery({
      maplayerId: maplayerId
    });
    listGroupsLotes(maplayerId);
  });
  //==========================================================================> CATEGORIES
  $(document).on('click', '.actionSelectVariable', function() {
    var variableId = $(this).attr('id');
    //Check if radio button was checked
    if (!$('input[type=radio][name=activeVectorLayer]').is(':checked')) {
      alert('warning', 'Selecion una capa');
      return;
    }
    localStorage.setItem('variableId', variableId);
    setQuery({
      variableId: variableId
    });
    //Primero obtenemos las estaditicas porque necesitamos el rango de los lotes.
    stats.fillStats(variableId, function(error, ranges) {
      //Ahora ya se lista los lotes
      if (error) {
        alert('danger', `No se cargaron la estaditicas para la variable ${variableId}`);
        return;
      }
      // $('#rightBar').trigger('click');
      displayVectorLayerByVariable(variableId, ranges);
    });
  });

  //Se grega panControl en el mapboxgl-ctrl-top-left
  require('./js/maplayer/panControl')();
  //======================================================================> Go to the group page
  $(document).on('click', '#groupLotesPage', function() {
    window.location.href = `/grouplotes.html?projectId=${localStorage.getItem('projectId')}`;
  });

  //===================================================================== >
  $(document).on('click', '#createMaplayerVectorCancel', function() {
    $('#formCreateMaplayerVector').trigger('reset');
  });

  //=======================================================cancel raster
  $(document).on('click', '#MaplayerRastercancel', function() {
    $('#formcreateMaplayerRaster').trigger('reset');
  });
});
//=======================================================coordenadas
