const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// app.use( (req, res, next) => {
//   if(req.method === 'GET'){
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req,res,next) => {
//   res.status(503).send('Down for maintenance')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
  console.log('Server is up on port ' + port)
})

const main = async () => {
  // const task = await Task.findById('5d769db3fde57d3e879cc9a0')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

  // const user = await User.findById('5d769c792a0cef3da6c1205c')  
  // await user.populate('tasks').execPopulate()
  // console.log(user.tasks)
}

main()