const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConection } = require('./database/config')


//*Crear el servidor de express
const app = express()

// Base de datos
dbConection()

//* CORS
app.use(cors())


//*Lectura y parseo del body
app.use(express.json())

//*Rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO CRUD: eventos
app.use('/api/events', require('./routes/events'));

//* Directorio Publico
app.use(express.static('public'))

//*Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})