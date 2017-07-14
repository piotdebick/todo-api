const {ObjectID} = require('mongodb');
const chai = require('chai');
const spies = require('chai-spies');
const request = require('supertest');
chai.use(spies)
const expect = chai.expect;

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},
{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).to.equal(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).to.equal(1);
        expect(todos[0].text).to.equal(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with invalid body data', (done) => {
    var text = false;

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).to.equal(2);
        done();
      }).catch((e) => done(e));
    })
  })
});




describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).to.equal(2);
    })
    .end(done);
  });
});


describe('GET /todos/id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).to.equal(todos[0].text);
    })
    .end(done);
  });
  it('should return 404 if todo not found', (done) => {
    //make sure to get a 404 back
    request(app)
    .get(`todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).to.equal(hexId);
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).to.not.exist;
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});


describe('PATCH /todo/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'this is the changed text';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).to.equal(text);
      expect(res.body.todo.completed).to.equal(true);
      expect(res.body.todo.completedAt).to.be.a('number');
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'this is the changed text';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: false,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).to.equal(text);
      expect(res.body.todo.completed).to.equal(false);
      expect(res.body.todo.completedAt).to.equal(null);
    })
    .end(done);
  })
})
