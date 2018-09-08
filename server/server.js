const express = require('express');
const app = express();
const path = require('path');
require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const parser = require('body-parser');

const publicPath = path.join(__dirname,'../client/public');
app.use(express.static(publicPath));
app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('squirell');
  const itemsCollection = db.collection('items');
  const itemsRouter = createRouter(itemsCollection);
  app.use('/api/items', itemsRouter);
})
.catch(console.err);

app.listen(4567, function(){
  console.log(`Listening on port ${this.address().port}`);
});
