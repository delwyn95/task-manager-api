require('../src/db/mongoose')
const User = require('../src/models/user')

// 5d2eb2e6999c270fb90c54e6

// User.findByIdAndUpdate('5d2fdf86c87ec218ae058aec', {age:1}).then((user) => {
//   console.log(user)
//   return User.countDocuments({age: 1})
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age } )
  const count = await User.countDocuments({age})
  return count
}

updateAgeAndCount('5d2eb2e6999c270fb90c54e6', 20).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})