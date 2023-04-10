const {model, Schema} = require('mongoose')

const userSchema = new Schema({ 
    userName: String,
    password: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model('User', userSchema)

module.exports = User

/*User.find({}).then(result =>{
    console.log(result)
    mongoose.connection.close()
})

const user = new User({
    userName: "OscarE",
    password: "Emma2010"
})

user.save()
    .then(result =>{
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err =>{
        console.error(err)
    })*/