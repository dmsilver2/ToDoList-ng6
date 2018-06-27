const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const appUser = {
  name: "admin",
  pw: "secret"
};

let db;

app.use(bodyParser.json());
app.use(cors({origin: ["http://localhost:4200/"], credentials: true}));
app.use(session({
  secret: "Shh, it's a secret",
  resave: false,
  saveUninitialized: true
}));

const validatePayloadMiddleware = (req, res, next) => {
  if(req.body) {
    next();
  } else {
    res.status(403).send({
      errorMessage: 'You need a payload'
    });
  }
}

const authMiddleware = (req, res, next) => {
  if(req.session && req.session.user) {
    next();
  } else {
    res.status(403).send({
      errorMessage: 'You must be logged in'
    });
  }
}

app.get('/api/ToDoList',(req, res) => {
  db.collection('todolist').find().toArray(function(err, data) {
    if(err) {
      res.status(403).send({
        errorMessage: err
      });
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/api/login', validatePayloadMiddleware, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(appUser.name == username && appUser.pw == password) {
    req.session.user = 'admin';
    res.status(200).send({
      success: true,
      message: 'success'
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'Invalid name or password'
    });
  }
});

app.get('/api/isloggedin', (req, res) => {
  if(req.session.user) {
    res.status(200).send({status: true});
  } else {
    res.status(200).send({status: false});
  }
});

app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
  if(err) {
    res.status(500).send({success: false})
  } else {
    res.status(200).send({success: true});
  }});
});

app.get('/api/ToDo/:id', (req, res) => {
  let id = req.params.id;
  let todo = req.body;
});

app.post('/api/ToDo/:id/edit', authMiddleware, (req, res) => {
  let id = req.params.id;
  let todo = req.body;
});

app.post('/api/ToDo/:id/delete', authMiddleware, (req, res) => {
  let id = req.params.id;
  let todo = req.body;
});

app.post('/api/ToDo/Add', authMiddleware, (req, res) => {
  let todo = req.body;
  db.collection('todolist').insertOne(req.body, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err
      });
    } else {
      res.status(200).send({
        success: true,
        message: 'success'
      });
    }
  })
});

MongoClient.connect('mongodb://dmsilver2:oe4kWRscd8i*eH@ds117701.mlab.com:17701/todolist-ng6', (err, client) => {
  if (err) return console.log(err);

  db = client.db('todolist-ng6');

  app.listen(8000, () => {
    console.log('Proxy Server started!');

  });
})
