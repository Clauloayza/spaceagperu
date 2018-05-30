module.exports = function() {
  if (!localStorage.getItem('token')) {
    window.location.href = '/';
  }
};
