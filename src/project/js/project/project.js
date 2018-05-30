var $ = require('jquery');
var queryString = require('query-string');
var request = require('./../../../helpers/request');
var parsed = queryString.parse(location.search);
var map = require('../map/map');
var alert = require('./../../../helpers/alert');
var messages = require('./../../../helpers/messages');

module.exports = {
  fillProjectProperties
};

/**
 * Set the project properties in DOM
 */
function fillProjectProperties() {
  var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${localStorage.getItem('projectId')}`;
  request.getA(urlPath, function(error, project) {
    if (error) {
      alert('danger', `${messages.scope} | ${error.message}`);
      return;
    }
    $('#subTitle').text(project.name);
    $('#subTitleHref').attr('href', `project.html?projectId=${parsed.projectId}`);
    map.fitBounds(project.geo.bbox);
  });
}
