module.exports = (function () {
  return {
    local: { // localhost
      host: '106.10.46.244',
      port: '3306',
      user: 'root',
      password: 'Dlsxjstnlq1!',
      database: 'my_db'
    },
    real: { // real server db info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();