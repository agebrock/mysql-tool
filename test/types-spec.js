var Promise = require('bluebird');
var mysql = require('mysql2')

describe('function', ()=> {
  it('async', (done)=> {
    //@todo add mock
    var connection = mysql.connect({});

    require('../')(connection).then(function(connection) {

      return connection.createDatabaseAsync('test', {
        ifNotExists: true
      });
    }).then(function() {
      connection.close();
      return done();
    });
  });
})
