const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5956b0010395b470390b3606';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// // Todo.find({
// //   _id: id
// // }).then((todos) => {
// //   console.log('Todos', todos);
// // });
// //
// // Todo.findOne({
// //   _id: id
// // }).then((todo) => {
// //   console.log('Todo', todo);
// // });
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found')
//   }
//   console.log('Todo', todo);
// }).catch((e) => {
//   console.log(e)
// });
User.findById(id).then((user) => {
  // if(!user){
  //   return console.log('User not found');
  // }
  console.log('User', JSON.stringify(user, undefined, 2));
}).catch((e) => {
  console.log(e);
});
