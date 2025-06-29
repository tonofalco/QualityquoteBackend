import express from 'express';
import cors from 'cors'
import pc from 'picocolors';



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
    origin: function (origin: any, callback: any) {
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

// RUTAS CENTRALIZADAS
app.use(require('./src/routes'));

// Directorio Público
app.use(express.static('public'));

// Se escucha la peticion en puerto
app.listen(process.env.PORT, () => {
    console.log(pc.bgBlue(`servidor corriendo en puerto ${process.env.PORT}`))
})