var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/videogames';

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE n64(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, rating INTEGER DEFAULT 0)');

query.on('end', function() {
  client.end();
});
