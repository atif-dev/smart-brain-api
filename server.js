const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const users = require('./controllers/users');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-clean-17378',
    port : 5432,
    user : 'postgres',
    password : 'post',
    database : 'smart-brain'
  }
});

/*db.select('*').from('users').then(data => {
  console.log(data);
})
.catch(err => console.log(err))*/

const app = express();

//app.use(bodyParser.json());
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {res.send('It is working')});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})
app.get('/profile/:id', profile.handleProfileGet(db));//advance way of handling req, res. See also req, res in profile.js
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})