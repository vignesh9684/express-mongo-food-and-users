const mongoose = require('mongoose')
const validator = require('validator')

var userSchema = new mongoose.Schema(
    {

      name:{type:String, default:"user"},
      age:{type:Number, min:[18,"only adults are allowed"],required:true},
      email:{type:String, lowercase:true, required:true,
            validator:(value)=>{return validator.isValid(value)}},
      mobile:{type:String, default:"000-0000000"},
      createdAt:{type:Date, default:Date.now}
})

const UserDetails = mongoose.model('users',userSchema)

module.exports = {UserDetails}