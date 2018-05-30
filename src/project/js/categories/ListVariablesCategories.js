var request = require('./../../../helpers/request');
var $ = require('jquery');
var _ = require('underscore');
var setQuery = require('set-query-string');
var stats = require('../stats/stats');

module.exports = {
  displayMenuVariables
};

function displayMenuVariables() {
  var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/variables?projectId=${localStorage.getItem('projectId')}`;
  request.get(urlPath, function(categories) {
    //First we need o add the Category on the DOM
    _.each(categories, function(v, k) {
      if (v.length > 0) {
        //TODO
        var icono = 'glyphicon glyphicon-home';
        if (k === 'Vegetación') {
          icono = 'img/Artboard 12@72x-100.png';
        } else if (k === 'Riego') {
          icono = 'img/Artboard 13@72x-100.png';
        } else if (k === 'Producción') {
          icono = 'img/Artboard 15@72x-100.png';
        } else if (k === 'Labores') {
          icono = 'img/Artboard 16@72x-100.png';
        } else if (k === 'Sanidad') {
          icono = 'img/Artboard 17@72x-100.png';
        } else if (k === 'Meteorología') {
          icono = 'img/Artboard 10@72x-100.png';
        } else if (k === 'Fertilización') {
          icono = 'img/Artboard 14@72x-100.png';
        }

        var html = `<li class="breadcrumb-menu d-md-down-none dropdown">
					    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><img src="${icono}" width="15%" alt="">${k}</a>
					    <div class="dropdown-menu" id="${v[0].categoryId}">
					    </div>
					  </li>`;
        $('#categoriesMenu').append(html);
      }
    });
    //once we added the categories on the DOM, we need to add the variables
    displayVariable(categories);
  });
}

function displayVariable(categories) {
  setTimeout(function() {
    _.each(categories, function(variables, k) {
      if (variables.length > 0) {
        for (var i = 0; i < variables.length; i++) {
          var variable = variables[i];
          var div = document.getElementById(variable.categoryId);
          var a = document.createElement('a');
          a.setAttribute('id', variable.id);
          a.setAttribute('href', '#');
          a.classList.add('dropdown-item');
          a.classList.add('actionSelectVariable');
          a.innerHTML = variable.name;
          div.appendChild(a);
        }
      }
    });
  }, 100);
}
