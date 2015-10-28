var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//CREATE
router.post('/api/v1/game', function(req, res) {
  var results = [];

  var data = req.body;
  console.log(data);

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done();
      return res.status(500).json({success: false, data: err});
    }

    client.query('INSERT INTO n64(name, rating) values($1, $2)', [data.name, data.rating]);

    var query = client.query('SELECT * FROM n64');

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
