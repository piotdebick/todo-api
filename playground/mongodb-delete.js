//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server');

//deleteMany
// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
//   console.log(res);
// })
//deleteOne
// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
//   console.log(res);
// })
//findOneAndDelete
// db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((res) => {
//   console.log(res);
// })

// db.collection('Users').deleteMany({name: 'Piotr Debicki'}).then((res) => {
//   console.log(res);
// })

db.collection('Users').findOneAndDelete({
  _id: new ObjectID('59566d742e6fec9677d9aded')
}).then((res) => {
  console.log(res);
})

  //db.close();
});
