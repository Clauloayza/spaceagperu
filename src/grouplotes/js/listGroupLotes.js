var $ = require('jquery');
var _ = require('underscore');
var request = require('./../../helpers/request');
var alert = require('./../../helpers/alert');

module.exports = function(maplayerId) {
  var organizationId = localStorage.getItem('organizationId');
  var projectId = localStorage.getItem('projectId');
  var urlPath = `/api/v1/organizations/${organizationId}/projects/${projectId}/maplayers/${maplayerId}/loteGroup`;
  $('#groupLotes').empty();
  request.getA(urlPath, function(error, res) {
    if (error) {
      alert('danger', error.message);
      return;
    }
    _.each(res.groups, function(v, k) {
      var html = `
			  <div class="">
			    <div class="" id="h-${k}">
			      <h5 class="mb-0">
			        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${k}" aria-expanded="false" aria-controls="collapse${k}">
			          ${k}
			        </button>
			      </h5>
			    </div>
			    <div id="collapse${k}" class="collapse hide" aria-labelledby="h-${k}" data-parent="#groupLotes">
			      <div class="card-body">
			      <ul class="group-list">
			      ${submenu(k, v)}
			      </ul>
			      </div>
			    </div>
			  </div>`;
      $('#groupLotes').append(html);
    });
  });
};

function submenu(k, menus) {
  var html = '';
  for (var i = 0; i < menus.length; i++) {
    html += ` <li class="nav-item">
                <a class="nav-link selectGroupLotes" id="${k}&&${menus[i]}" href="#" target="_top"><i class="fa fa-paper-plane"></i> ${menus[i]}</a>
              </li>`;
  }

  return html;
}
