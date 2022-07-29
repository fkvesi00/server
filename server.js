const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors=require('cors');
const knex = require('knex');
const { response } = require('express');
const bcrypt = require('bcrypt-nodejs');

const register= require('./controllers/register');
const signIn=require('./controllers/signIn');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      host : 'postgresql-shaped-05949',
      ssl: {
        rejectUnauthorized: false,
      },        
      
    }
  });


app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("it's working!");
})

//ulogiramo se preko post requesta(koristimo post da bi zasititli lozinku)
app.post('/signIn',(req,res)=>{signIn.handleSignin(req,res,db,bcrypt)});

//registriramo profil preko post requesta
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

//dohvacamo id tako sto prolazimo kroz cijelu bazu podataka
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

//povecanje countera po broju provjerenih slika
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
})

/* API
route   roote/ --> res = this is working
        /signIn --> POST = success/fail
        /register --> POST = user
        /profile/:userID --> GET = user
        /image --> PUT --> user

*/