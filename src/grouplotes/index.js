var $ = require('jquery');
var _ = require('underscore');
var queryString = require('query-string');
var setQuery = require('set-query-string');
require('./js/validation')();

//Dashboard requirements
require('../template')();
require('../helpers/redirect')();
require('../user')();
require('./css/style.css');
var projectProperties = require('./js/projectProperties');
var maplayer = require('./js/maplayer');
var fillLotes = require('./js/fillLotes');
var createGroup = require('./js/createGroup');
var listGroupLotes = require('./js/listGroupLotes');
var filterLotesByGroup = require('./js/filterLotesByGroup');
var map = require('./js/map');
//init
var parsed = queryString.parse(location.search);
_.each(parsed, function(v, k) {
  localStorage.setItem(k, v);
});

$(document).ready(function($) {
  projectProperties();

  map.on('load', function() {
    maplayer.listMaplayers();
  });

  $(document).on('click', '#btncreateGroup', function(e) {
    fillLotes();
  });

  $(document).on('click', '.mlayer', function(e) {
    var maplayerId = e.target.id;
    maplayer.zoomToLayer(e);
    listGroupLotes(maplayerId);
  });
//=======================================================grupos cartografiaa
$(document).ready(function() {
  $('#cartografia-grupos').click(function() {
    $('.cartografia-grupos li:not(:first-child)').toggle();
  });
});

  //==========================================================================>ACTIVE LAYER

  $(document).on('click', '#createGroupLotesVector', function(e) {
    createGroup();
  });

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

  $(document).on('click', '.mlayer', function() {
    var maplayerId = $('input[type=radio][name=activeVectorLayer]:checked')
      .attr('id')
      .split('-')[1];
    localStorage.setItem('maplayerId', maplayerId);
    setQuery({
      maplayerId: maplayerId
    });
    console.log('====');
    maplayer.zoomToLayer(maplayerId);
  });
});
