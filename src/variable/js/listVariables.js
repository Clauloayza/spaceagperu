var $ = require('jquery');
var req = require('../../helpers/request');
var _ = require('underscore');
var dataTable = $('#tableVariables').DataTable({
  columns: [
    {
      title: 'Categoria'
    },
    {
      title: 'Id'
    },
    {
      title: 'Variable'
    },
    {
      title: 'Tipo de dato'
    },
    {
      title: 'Status'
    },
    {
      title: 'Acciones'
    }
  ],
  paginate: false,
  lengthChange: false,
  language: {
    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
  }
});
module.exports = function() {
  dataTable.clear().draw();
  var organizationId = localStorage.getItem('organizationId');
  var urlPath = `/api/v1/organizations/${organizationId}/variables?all=yes`;
  req.getA(urlPath, function(error, variables) {
    _.each(variables, function(v, k) {
      for (var i = 0; i < v.length; i++) {
        var variableProps = v[i];
        var html = '';
        if (variableProps.state) {
          html = `
                        <a class="btn btn-success codeVariable" id="code-${
                          variableProps.id
                        }"  data-toggle="modal" data-target="#displayModalToShowCodeUpdateVariable">
                        <i class="fa fa-file-code-o"></i>
                        </a> 
                        <a class="btn btn-warning disableVariable" id="delete-${variableProps.id}" href="#">
                        <i class="fa fa-unlock"></i>
                        </a>`;
        } else {
          html = `
                        <a class="btn btn-warning enableVariable" id="delete-${variableProps.id}" href="#">
                        <i class="fa fa-lock"></i>
                        </a>`;
        }

        // <a class="btn btn-info editVariable" href="#" id="edit-${variableProps.id}">
        // <i class="fa fa-edit "></i>
        // </a>
        var row = [variableProps.category, variableProps.id, variableProps.name, variableProps.dataType, variableProps.state, html];
        dataTable.row.add(row).draw();
      }
    });
  });
};
