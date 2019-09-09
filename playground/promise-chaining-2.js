require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d2fe19feb8fcc194f9b2440').then((query) => {
//   console.log(query)
//   return Task.countDocuments({completed: false})
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id) => {
  const user = await Task.findByIdAndDelete({_id:id})
  const count = await Task.countDocuments({completed:false})

  return count
}

deleteTaskAndCount('5d2fe3cc54190c1ab85ac90e').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e);
})