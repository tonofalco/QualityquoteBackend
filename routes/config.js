const { Router } = require('express')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const {actualizarCostos, obtenerCostos} = require('../controllers/config') 

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
router.use(validarJwt)

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