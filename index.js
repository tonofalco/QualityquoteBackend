const express = require('express')
require('dotenv').config()
const cors = require('cors')
// const { dbConection } = require('./database/config')
const {dbConnectMySql} = require('./database/config_mysql')
const os = require('node:path');

//*Crear el servidor de express
const app = express()

// Base de datos
// dbConection()
dbConnectMySql()

//* CORS
app.use(cors())

//*Lectura y parseo del body
app.use(express.json())

//*Rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO CRUD: eventos
app.use('/api/events', require('./routes/events'));
//TODO CRUD: configuracion
app.use('/api/config', require('./routes/config'));
//TODO CRUD: Costos Dia extra
app.use('/api/extraDayCosts', require('./routes/extraDayCosts'));

//* Directorio Publico
app.use(express.static('public'))

//*Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})