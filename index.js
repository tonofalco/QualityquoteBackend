const express = require('express');
const cors = require('cors')
const pc = require('picocolors');

require('dotenv').config()
const { dbConnectMySql } = require('./src/database/config');

// Se Crea el servidor con express
const app = express()

// Conectamos bd
dbConnectMySql()

// CORS
const allowedOrigins = [
    'http://localhost:4100',
    'https://vqc.netlify.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Lectura y parseo del body
app.use(express.json())

// RUTAS
//TODO: auth | obtener, crear, eliminar, actualizar, login, renewJWT
app.use('/api/users', require('./src/routes/userRoute'));
//TODO CRUD: events | obtener, crear, eliminar, actualizar
app.use('/api/earthEvents', require('./src/routes/earthEventRoute'));
// //TODO CRUD: events | obtener, crear, eliminar, actualizar
// app.use('/api/aerialEvents', require('./src/routes/aerialEvents'));
//TODO CRUD: Costos Tabla kms | obtener, actualizar
app.use('/api/cost/firstDayCosts', require('./src/routes/firstDayCostRoute'));
//TODO CRUD: Costos especiales primer dia | obtener, actualizar
app.use('/api/cost/specialFirstDayRules', require('./src/routes/SpecialFirstDayRulesRoute'));
//TODO CRUD: Costos Dia extra | obtener, crear, eliminar, actualizar
app.use('/api/cost/extraDay', require('./src/routes/extraDayCosts'));

// Directorio Publico backend
app.use(express.static('public'))

// Se escucha la peticion en puerto
app.listen(process.env.PORT, () => {
    console.log(pc.bgBlue(`servidor corriendo en puerto ${process.env.PORT}`))
})