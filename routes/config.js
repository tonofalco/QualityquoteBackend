
const {actualizarCostos, obtenerCostos} = require('../controllers/config') 

const { Router } = require('express')
const { validarCampos } = require('../middlewares/validarCampos')

const router = Router()

/* ----- OBTENER COSTOS ----- */
router.get(
    '/costs',
    [

    ],
    obtenerCostos
)

// Actualizar eventos
router.put(
    '/costs/:id',
    [
        validarCampos
    ],
    actualizarCostos)

module.exports = router;