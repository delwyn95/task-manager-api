const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
  userOneId,
  userOne,
  setupDatabase,
  taskOne,
  userTwo,
  userTwoId
} = require('../tests/fixtures/db')

beforeEach(setupDatabase)

test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'From my test'
    })
    .expect(201)
  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toEqual(false)
})

test('get all task for user one', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  // console.log(response.body.length)
  expect(response.body.length).toEqual(2)
})

//User 2 try to delete task 1 (belongs to user 1)
test('Second user delete first task', async () => {
  // first login as second user
  // const loginResponse = await request(app)
  //   .post('/users/login')
  //   .send({
  //     email: userTwo.email,
  //     password: userTwo.password
  //   })
  //   .expect(200)

  const deleteResponse = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send().expect(404)

  const task = await Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})
