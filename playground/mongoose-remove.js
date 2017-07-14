const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove()
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5968d5dd2e6fec9677dc2113').then((todo) => {
  console.log(todo);
});
