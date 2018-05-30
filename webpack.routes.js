module.exports = {
	login: {
		title: 'Login',
		chunks: ['manifest', 'vendor', 'login'],
		filename: 'index.html',
		template: '!!ejs-compiled-loader!src/login/index.ejs'
	},
	organization: {
		title: 'Dashboard - organizacion',
		chunks: ['manifest', 'vendor', 'organization'],
		filename: 'organization.html',
		template: '!!ejs-compiled-loader!src/organization/index.ejs'
	},
	project: {
		title: 'Dashboard - project',
		chunks: ['manifest', 'vendor', 'project'],
		filename: 'project.html',
		template: '!!ejs-compiled-loader!src/project/index.ejs'
	},
	admin: {
		title: 'Dashboard - project',
		chunks: ['manifest', 'vendor', 'admin'],
		filename: 'admin.html',
		template: '!!ejs-compiled-loader!src/admin/index.ejs'
	},
	variable: {
		title: 'Dashboard - project',
		chunks: ['manifest', 'vendor', 'variable'],
		filename: 'variable.html',
		template: '!!ejs-compiled-loader!src/variable/index.ejs'
	},
	perfil: {
		title: 'Dashboard - Perfil',
		chunks: ['manifest', 'vendor', 'perfil'],
		filename: 'perfil.html',
		template: '!!ejs-compiled-loader!src/perfil/index.ejs'
	},
	grouplotes: {
		title: 'Dashboard - Grupo de Lotes',
		chunks: ['manifest', 'vendor', 'grouplotes'],
		filename: 'grouplotes.html',
		template: '!!ejs-compiled-loader!src/grouplotes/index.ejs'
	}
}