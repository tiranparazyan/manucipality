const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bodyParser = require('body-parser')

const app = express()
var allProducts;

// Simply pass the port that you want a MongoDB server to listen on.





app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(bodyParser.json());

const jsonParser = bodyParser.json();



MongoClient.connect('mongodb://localhost:27017/products', function(err, db) {
    if (err) throw err;
    app.get('/', function (req, res) {

        db.collection("products").find({}).toArray(function(err, data) {
            if(err) {
                throw err;
            }
            res.send(data);
        })

        //res.send(JSON.stringify(allProducts));
    })
    app.post('/addproduct', jsonParser, function (req, response) {
        if (!req.body) return res.sendStatus(400)

        db.collection("products").insertOne(req.body, function(err, res) {
            if (err) throw err;
            response.send({
                message: 'Product Inserted'
            })
        });


    })
    app.post('/deleteproduct', jsonParser, function (req, response) {
        if (!req.body) return res.sendStatus(400)

        db.collection("products").deleteOne({'_id': new mongodb.ObjectID(req.body._id)}, function(err, res) {
            if (err) throw err;
            db.collection("products").find({}).toArray(function(err, data) {
                if(err) {
                    throw err;
                }
                response.send(data);
            })
        });


    })

    app.post('/updateproduct', jsonParser, function (req, response) {
        if (!req.body) return res.sendStatus(400)
        console.log(req.body)
        db.collection("products").updateOne({'_id': new mongodb.ObjectID(req.body.updated._id)}, {$set: {name: req.body.updated.name, price: req.body.updated.price}}, {upsert: false}, function(err, res) {
            if (err) throw err;
            db.collection("products").find({}).toArray(function(err, data) {
                console.log(data)
                if(err) {
                    throw err;
                }
                response.send(data);
            })
        });


    })


})




app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})