module.exports = function () {
	return [{
      from: 'node_modules/font-awesome/fonts',
      to: 'fonts'
    }, {
      from: 'node_modules/font-awesome/css',
      to: 'css'
    }, {
      from: 'src/template/css/style.css',
      to: 'css'
    }, {
      from: 'src/template/img',
      to: 'img'
    }];
}