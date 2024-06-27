const express = require('express');
const cors = require('cors')
const pc = require('picocolors');

require('dotenv').config()
const {dbConnectMySql} = require('./src/database/config');

// Se Crea el servidor con express
const app = express()

// Conectamos bd
dbConnectMySql()

// CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// RUTAS
//TODO: auth | obtener, crear, eliminar, actualizar, login, renewJWT
app.use('/api/auth', require('./src/routes/auth'));
//TODO CRUD: events | obtener, crear, eliminar, actualizar
app.use('/api/events', require('./src/routes/events'));
//TODO CRUD: Costos Tabla kms | obtener, actualizar
app.use('/api/cost/kmsTable', require('./src/routes/config'));
//TODO CRUD: Costos especiales primer dia | obtener, actualizar
app.use('/api/cost/firstDaySpecialCosts', require('./src/routes/firstDaySpecialCosts'));
//TODO CRUD: Costos Dia extra | obtener, crear, eliminar, actualizar
app.use('/api/cost/extraDay', require('./src/routes/extraDayCosts'));

// Directorio Publico backend
app.use(express.static('public'))

// Se escucha la peticion en puerto
app.listen(process.env.PORT, () => {
    console.log(pc.bgBlue(`servidor corriendo en puerto ${process.env.PORT}`))
})