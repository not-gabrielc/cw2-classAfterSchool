// load Express.js
const express = require('express');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => console.log("Listening at 3000"));

//to use cors
const cors = require('cors');
app.use(cors());

// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
let db;
const str = "";

MongoClient.connect(url, function(err, client) {
    db =client.db('cw2')
});

//---------------------------------------------- server.js is running  ------------------------------------------------------
//test if the server is running
app.get('/', function(req, res) {
    // shows a message that API is working
    res.send('The server.js is now running. Open the index.html from WebStorm.');
});

//---------------------------------------------- user info ------------------------------------------------------
//adds users to the database
app.post('/user-add', (req, res) => {
    const data = req.body;
    db.collection('accounts').insertOne(data,function (err, result) {
        console.log('account inserted');
    });

    //shows in the console if its successful on sending to the mongodb
    res.json({
        status: 'success',
        email: data.emails,
        password: data.passwords,
        userType: data.userTypes
    })
});

app.get('/user-find/:email', (req, res)=>{
    const email = req.params.email;
    db.collection('accounts').findOne({emails: email}, (err,result) =>{
        res.json(result);

        console.log('searched Email:');
        console.log(result);
    })
});

//see all user accounts
app.route('/account-info').get(function(req, res) {
        const cursor = db.collection('accounts').find({});
        cursor.toArray(function(err, doc) {
            res.send(doc);
            db.close();
        });
});

//---------------------------------------------- classes ------------------------------------------------------
//adds courses to the database
app.post('/class-add', (req, res) => {
    const data = req.body;
    db.collection('classes').insertOne(data,function (err, result) {
        console.log('class inserted');
    });

    res.json({
        status: 'success',
        topic: data.topic,
        location: data.location,
        price: data.price,
        provider: data.provider,
        review: data.review,
        userEmail: data.userEmail,
    })
});

app.get('/classes', (req, res) => {
    const cursor = db.collection('classes').find({});
    cursor.toArray(function(err, doc) {
        res.send(doc);
    });
})