var Promise = require('bluebird');
var mysql = require('mysql2');
var sync = require('syncho');
var assert = require('assert');

describe('function', ()=> {
  it.only('sync', (done)=> {
    //@todo: Add mock
    var connection = mysql.connect({});

    var schema = {
      name: {type: 'string', length: 255}
    }

    require('../')(connection).then(function(connection) {
      return new Promise(function(resolve) {
        sync(function() {

          connection.createDatabaseSync('test_unit',{ifNotExists: true});
          connection.switchDatabaseSync('test_unit');
          connection.createTableSync('test_table',{columns:schema, ifNotExists:true});
          connection.runSqlSync('insert INTO test_table SET name=\'test\'');

          var result = connection.runSqlSync('SELECT * FROM test_table LIMIT 1');
          connection.dropDatabase('test_unit',{ifExists:true});
          resolve(result);
        });
      });
    }).then(function(result) {
      connection.close();
      console.log(result);
      assert(Array.isArray(result), 'returns am array');
      return done();
    });
  });
});
