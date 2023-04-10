const mongoose = require('mongoose')
const {model, Schema} = mongoose
const connectionString = 'mongodb://127.0.0.1:27017/nakistorebd'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(()=>{
        console.log('Database connected')
    }).catch(err =>{
        console.error(err)
    })