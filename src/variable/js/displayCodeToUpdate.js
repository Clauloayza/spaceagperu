var $ = require('jquery');
var req = require('../../helpers/request');
var marked = require('marked');
var _ = require('underscore');
var config = require('../../config');

module.exports = function(variableId) {
  $('#codeToUpdate').empty();
  var html = `
#### UPDATE THROUGH BASH 

**ESTABLISH VARIABLES**

\`\`\`
export projectId="<set projectId>";
export mapLayerId="<set mapLayerId>";
export loteId="<set loteId>";
export tokenAPI="${localStorage.getItem('token')}";
\`\`\`

**SEND REQUEST**


\`\`\`
curl \\
-H "Content-Type: application/json" \\
-H "Authorization:$tokenAPI" \\
-X POST \\
-d '{"variableId":"${variableId}","properties":{"valor":10,"fecha":"2004-05-23T14:25:10"}}' \\
${config.host}/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/$projectId/maplayers/$mapLayerId/lotes/$loteId/changesets
\`\`\``;

  $('#codeToUpdate').append(marked(html));
};
