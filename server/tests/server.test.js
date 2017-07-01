const chai = require('chai');
const spies = require('chai-spies');
const request = require('supertest');
chai.use(spies)
const expect = chai.expect;

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


beforeEach((done) => {
  Todo.remove({}).then(() => done())
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

      Todo.find().then((todos) => {
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
    .send()
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).to.equal(0);
        done();
      }).catch((e) => done(e));
    })
  })
});
