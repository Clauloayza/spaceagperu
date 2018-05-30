var config = require('../config');
var axios = require('axios');

axios.defaults.baseURL = config.host;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

module.exports = {
  get: function(urlPath, cb) {
    console.log(urlPath);
    fetch(`${config.host}${urlPath}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        cb(json);
      })
      .catch(function(ex) {
        cb(ex);
      });
  },

  getA: function(urlPath, cb) {
    console.log(urlPath);
    axios
      .get(urlPath)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function(error) {
        console.log(error);
        cb(error.response.data, null);
      });
  },

  post: function(urlPath, opts, cb) {
    console.log(urlPath);
    axios
      .post(urlPath, opts)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function(error) {
        console.log(error);
        cb(error.response.data, null);
      });
  },
  postFile: function(urlPath, formData, cb) {
    console.log(urlPath);
    const confi = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios
      .post(urlPath, formData, confi)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function(error) {
        console.log(error.response.data);
        cb(error.response.data.message, null);
      });
  },
  delete: function(urlPath, cb) {
    console.log(urlPath);
    axios
      .delete(urlPath)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function(error) {
        console.log(error.response.data);
        cb(error.response.data, null);
      });
  },
  put: function(urlPath, opts, cb) {
    console.log(urlPath);
    axios
      .put(urlPath, opts)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function(error) {
        console.log(error.response.data);
        cb(error.response.data, null);
      });
  },
  getAll: function(urls, cb) {
    console.log(urls.join(','));
    var promiseArray = urls.map(function(url) {
      return axios.get(url);
    });
    Promise.all(promiseArray)
      .then(results => {
        const geos = results.map(el => el.data);
        cb(null, geos);
      })
      .catch(error => {
        console.log(error);
        cb(error, null);
      });
  }
};
