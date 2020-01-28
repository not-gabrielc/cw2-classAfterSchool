// load Express.js
const express = require('express');
const app = express();

// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/cw2';
var str = "";

//accounts and classes collection
//CustomerId: 0,
//CustomerEmail: "g.c@g.c",
//CustomerPassword: "123",
//CustomerUserType: "Admin"

app.get('/', function(req, res) {
    // shows a message that API is working
    res.send('The server.js is now running. Open the index.html from WebStorm.');
});

app.route('/account-info').get(function(req, res) {
    MongoClient.connect(url, function(err, db) {

        const cursor = db.collection('accounts').find({});

        cursor.toArray(function(err, doc) {
            res.send(doc);
            db.close();
        });
    });
});

app.route('/get-user').get(function(req, res) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('accounts');
        var cursor = collection.find({});
        str = "";
        cursor.forEach(function(item) {
            if (item != null) {
                str = str + "    Account ID:  " + item.CustomerId + "</br>" +
                    "  Account Email: " + item.CustomerEmail + "</br>" +
                    "  Account UserType: " + item.CustomerUserType + "</br>" +
                    "________________________" + "</br>" + "</br>";
            }
        }, function(err) {
            console.log(str)
            res.send(str);
            db.close();
        });
    });

    // MongoClient.connect(url, function (err, db) {
    //     const dat = db.collection("accounts").find();
    //
    //     dat.each(function(err,doc){
    //         if (doc != null) {
    //             str = str + "Account id" + doc.CustomerId + "</br>";
    //         }
    //     });
    //     res.send(str);
    //     db.close();
    // });
});

app.post('/insert-user', function(req, res, next) {

});


app.listen(3000, () => {
    console.log("Open index.html file")
});