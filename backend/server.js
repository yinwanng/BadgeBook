// modules
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const productionConnectionURL = "mongodb://admin:admin@cluster0-shard-00-00-xmofn.mongodb.net:27017,cluster0-shard-00-01-xmofn.mongodb.net:27017,cluster0-shard-00-02-xmofn.mongodb.net:27017/data?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// connect to mongodb
// use developmentConnectionURL for development/testing environment
// use productionConnectionURL for production environment
mongoose.connect(productionConnectionURL, { useNewUrlParser: true })
.then(()=> console.log("Connected to MongoDB...."))
.catch(err => console.error('Could not connect to MongoDB...'));
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setting up routes
var routes = require('./routes/routers');

// applying the routes to application
app.use('/', routes);

// listening on env port or 3000
app.listen(process.env.port || 3000, function() {
    console.log('Listening on port 3000...');
});
