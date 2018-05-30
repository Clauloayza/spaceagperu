var $ = require('jquery');
var req = require('../../helpers/request');
var marked = require('marked');
var _ = require('underscore');

module.exports = {
  listCategories: function() {
    var urlPath = `/api/v1/categories`;
    console.log(urlPath);
    req.getA(urlPath, function(error, categories) {
      for (var i = 0; i < categories.length; i++) {
        console.log(categories[i]);
        var html = `<option value="${categories[i].id}">${categories[i].name}</option>`;
        $('#categoryId').append(html);
      }
    });
  },
  createVariable: function() {
    var organizationId = localStorage.getItem('organizationId');
    var urlPath = `/api/v1/organizations/${organizationId}/variables`;

    var props = {};
    //Recolect all imput variables
    $('#formCreateVariable input.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    $('#formCreateVariable select.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    $('#okCreateVariable').append(
      marked(`
            ## Actualizar Automaticamente las variables

            \`\`\`
            export token=""
            curl -H "Content-Type: application/json" -H "Authorization:$token" -X POST -d '{"variableId":"v12","properties":{"valor":10,"fecha":"2004-05-23T14:25:10"}}' http://localhost:8000/api/v1/organizations/o1/projects/p1/maplayers/ml1/lotes/ml1-armonia_1h116/changesets
            \`\`\`


        `)
    );

    $('#okCreateVariable').show();

    // req.post(urlPath, props, function(error, result) {
    //   if (error) {
    //     $('#errorCreateVariable')
    //       .show()
    //       .delay(3000)
    //       .hide(1000);

    //     $('#errorCreateVariable').text(error.response.data.message);
    //   } else {
    //     $('#okCreateVariable').show();
    //     $('#createVariable').hide();
    //     $('#createVariableclose').show();
    //     $('#okCreateVariable').text(`La varaible ${result.name} se ha creado!!`);
    //   }
    // });
  },
  listVariables: function() {
    var organizationId = localStorage.getItem('organizationId');
    var urlPath = `/api/v1/organizations/${organizationId}/variables`;
    console.log(urlPath);
    req.getA(urlPath, function(error, variables) {
      _.each(variables, function(v, k) {
        for (var i = 0; i < v.length; i++) {
          var html = `
                                        <tr>
                                            <td>${k}</td>
                                            <td>${v[i].name}</td>
                                            <td>${v[i].dataType}</td>
                                            <td>
                                                <span class="badge badge-success">${v[i].state}</span>
                                            </td>
                                        </tr>`;
          $('#variablesTable').append(html);
        }
      });
    });
  }
};
