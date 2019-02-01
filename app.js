const express = require('express');
const db = require('./db');

const app = express();
module.exports = app;

const renderPage = (user, users)=> {
  return `
      <html>
      <head>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' />
      </head>
      <body>
        <div class='container'>
        <ul class='nav nav-tabs'>
          ${ 
            users.map( user=> {
            return `
              <li class='nav-item'>
                <a href='/users/${user.id}' class='nav-link'>
                ${ user.email }
                </a>
              </li>
            `;
            }).join('')
          }
        </ul>
        <div>
          you chose ${ user.email }
        </div>
        </div>
      </body>
      </html>
    `;
}

app.use((req, res, next)=> {
  db.getUsers()
    .then( users => {
      req.users = users;
      next();
    })
    .catch(next);
});

app.get('/', (req, res, next)=> {
  const user = req.users[0];
  res.redirect(`/users/${user.id}`);
});

app.get('/users/:id', (req, res, next)=> {
  db.getUser(req.params.id)
    .then( user => res.send(renderPage(user, req.users)))
    .catch(next);
});
