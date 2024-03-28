const express = require('express');
const cors = require('cors')
require('dotenv').config()
const pc = require('picocolors');

const {dbConnectMySql} = require('./database/config');
// import { dbConnectMySql } from './database/config'

// Se Crea el servidor con express
const app = express()

// Conectamos bd
dbConnectMySql()

// CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// RUTAS
//TODO: auth | obtener, crear, eliminar, actualizar, login, renew
app.use('/api/auth', require('./routes/auth'));
// //TODO CRUD: events | obtener, crear, eliminar, actualizar
app.use('/api/events', require('./routes/events'));
// //TODO CRUD: config | pendiente
app.use('/api/config', require('./routes/config'));
// //TODO CRUD: Costos Dia extra | obtener, crear, eliminar, actualizar
app.use('/api/cost/extraDay', require('./routes/extraDayCosts'));

// Directorio Publico backend
app.use(express.static('public'))

// Se escucha la peticion en puerto
app.listen(process.env.PORT, () => {
    console.log(pc.bgBlue(`servidor corriendo en puerto ${process.env.PORT}`))
})