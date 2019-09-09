const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require ('./task')

//take advantage of middleware
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive')
      }
    }
  },
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password invalid')
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
},{
  timestamps:true
})
//virtual property:
userSchema.virtual('tasks', {
  ref:'Task',
  localField: '_id',
  foreignField:'owner'
})

// accessable on instances, instance method
userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secretkey')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

//statics are called Model methods
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

//Hash the plaintext password before saving
//1: name, 2: function to run (std fn)
userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
  //call next to indicate it is done
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next){
  const user = this
  await Task.deleteMany({ owner: user._id})
  
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

// const me = new User({
//   name:'Delwyn Yit',
//   email:'fkj@fkj.com  ',
//   password:'123456',
//   age:20
// })

// me.save().then(()=>{
//   console.log(me)
// }).catch((e)=>{
//   console.log('error',e)
// })
