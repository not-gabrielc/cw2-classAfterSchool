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

//test if the server is running
app.get('/', function(req, res) {
    // shows a message that API is working
    res.send('The server.js is now running. Open the index.html from WebStorm.');
});


//adds users to the database
app.post('/user-add', (req, res) => {
    const data = req.body;
    db.collection('accounts').insertOne(data,function (err, result) {
        console.log('account inserted');
    });

    res.json({
        status: 'success',
        email: data.emails,
        password: data.passwords,
        userType: data.userTypes
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

//adds users to the database
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

// app.route('/get-user').get(function(req, res) {
//     MongoClient.connect(url, function(err, db) {
//         var collection = db.collection('accounts');
//         var cursor = collection.find({});
//         str = "";
//         cursor.forEach(function(item) {
//             if (item != null) {
//                 str = str + "    Account ID:  " + item.CustomerId + "</br>" +
//                     "  Account Email: " + item.CustomerEmail + "</br>" +
//                     "  Account UserType: " + item.CustomerUserType + "</br>" +
//                     "________________________" + "</br>" + "</br>";
//             }
//         }, function(err) {
//             console.log(str)
//             res.send(str);
//             db.close();
//         });
//     });
//
//     // MongoClient.connect(url, function (err, db) {
//     //     const dat = db.collection("accounts").find();
//     //
//     //     dat.each(function(err,doc){
//     //         if (doc != null) {
//     //             str = str + "Account id" + doc.CustomerId + "</br>";
//     //         }
//     //     });
//     //     res.send(str);
//     //     db.close();
//     // });
// });