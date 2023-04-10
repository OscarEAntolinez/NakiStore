require('./mongoConnection')

const http = require('http')
const express = require('express')
const app = express()

const User = require('./models/User')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')


app.use(express.json())

let users = []

/*const app = http.createServer((request, response) =>{
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})*/

//Mensaje de bienvenida a la API
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

//Listar todos los usuarios existentes
app.get('/api/users', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

//Consultar la información de un usuario por su id
app.get('/api/users/:id', (request, response, next) => {
    const {id} = request.params

    User.findById(id).then(user =>{
        if(user){
            response.json(user)
        }else{
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

//Borrar un usuario por su id
app.delete('/api/users/:id', (request, response, next) => {
    const {id} = request.params

    User.findByIdAndRemove(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
    
})

//Actualizar un usuario
app.put('/api/users/:id', (request, response, next) => {
    const {id} = request.params

    const user = request.body

    const newUserInfo = {
        userName: user.userName,
        password: user.password
    }

    User.findByIdAndUpdate(id, newUserInfo, {new:true}).then(result => {
        response.json(result)
    })
    
})

//Crear un usuario
app.post('/api/users', (request, response) => {

    const user = request.body

    if (!user || !user.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const newUser = new User({
        userName: note.userName,
        password: note.password,
    })

    newUser.save().then(savedUser => {
        response.json(savedUser)
    })
})

//Middle Ware 404
app.use(notFound)

//Middle Wares
app.use(handleError)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
