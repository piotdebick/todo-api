//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server');

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('595666d42e6fec9677d9acb9')
// }, {
//   $set: {
//     completed: true
//   }
// }, {
//   returnOriginal: false
// }).then((res) => {
//   console.log(res);
// })

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('595688922e6fec9677d9b580')
},{
  $set: {
    name: 'Julie'
  },
  $inc: {
    age: 5
  }
},{
  returnOriginal: false
}).then((res) => {
  console.log(res);
})

  //db.close();
});
