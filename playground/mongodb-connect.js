const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //     text: 'Something to do',
  //     completed: false
  //   }, (err, results) => {
  //     if(err) {
  //       return console.log('Unable to insert todo', err);
  //     }
  //   console.log(JSON.stringify(results.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Piotr Debicki',
    age: 25,
    location: 'New York'
    }, (err, results) => {
      if(err){
        return console.log('Unable to insert todo', err);
      }
      console.log(JSON.stringify(results.ops, undefined,2));
  });

  db.close();
});
