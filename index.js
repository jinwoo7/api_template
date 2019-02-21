const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const mongoUrl = 'mongodb://mongo:27017';
let mongoDb = null;

let collectionName = "groceries";


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ message : "Welcome to the mockAPI"});
});

app.get('/items', (req, res) => {
    mongoDb.collection(collectionName)
        .find({}).toArray()
        .then(function(items) {
            res.send(items);
        });
});

app.post('/items', (req, res) => {
    const newItem = {
        name : req.body.name,
        creationDate : new Date(),
    };

    mongoDb.collection(collectionName)
        .insertOne(newItem)
        .then(function(response) {
			console.log(req);
            res.send(`${newItem.name} has been added to ${collectionName} with an id:${response.insertedId}`);
        });
});

app.delete('/items', (req, res) => {
	const item ={
		name : req.body.name
	};

	mongoDb.collection(collectionName)
		.deleteOne(item)
		.then(function(response) {
            res.send(`${req.body.name} has been deleted from ${collectionName}`);
		});
});

app.delete('/items-reset', (req, res) => {
	mongoDb.collection(collectionName)
		.deleteMany({})
		.then(function(response) {
            res.send(`All items have been deleted from ${collectionName}`);
		});
});



MongoClient.connect(mongoUrl, function(err, client) {
    if (err)
        throw err;

    console.log("Connected successfully to server");
   
    mongoDb = client.db();

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
});
