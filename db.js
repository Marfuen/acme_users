const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme_users_the_db');

client.connect();


const getUsers = ()=> {
  return client.query('SELECT * from users')
    .then(response => response.rows);
};

const getUser = (id)=> {
  return client.query('SELECT * from users WHERE id = $1', [ id ])
    .then(response => response.rows[0]);
};

const sync = ()=> {
  return client.query(SEED);
}

const SEED = `
  DROP TABLE IF EXISTS things;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) unique
  );
  CREATE TABLE things(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    user_id integer references users(id)
  );
  INSERT INTO users(email) values('moe@example.com');
  INSERT INTO users(email) values('larry@example.com');
  INSERT INTO users(email) values('curly@example.com');
`;

module.exports = {
  getUsers,
  getUser,
  sync
};
