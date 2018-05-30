var $ = require('jquery');
var _ = require('underscore');
var request = require('./../../../helpers/request');
var alert = require('./../../../helpers/alert');
var map = require('../map/map');
var configLayers = require('../maplayer/configLayers');
var printLayersByDefault = require('../maplayer/printLayersByDefault');
var popup = require('../maplayer/popup');

module.exports = function(group) {
  alert('warning', `Seleccionando ${group.groupKey}:${group.groupValue}`);
  var organizationId = localStorage.getItem('organizationId');
  var projectId = localStorage.getItem('projectId');
  var maplayerId = localStorage.getItem('maplayerId');
  var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${maplayerId}/lotes?groupKey=${group.groupKey}&groupValue=${
    group.groupValue
  }`;
  request.getA(urlPath, function(error, geojson) {
    if (error) {
      alert('warning', `Se produjo un error en el listado de lotes ${error}`);
      return;
    }
    printLayersByDefault(maplayerId, geojson);
    popup(maplayerId);
    //Save to make the request group layer
    localStorage.setItem('groupKey', group.groupKey);
    localStorage.setItem('groupValue', group.groupValue);
  });
};
