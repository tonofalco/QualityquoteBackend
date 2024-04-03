const { Router } = require('express')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const { actualizarCostos, obtenerCostos } = require('../controllers/config')

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
router.use(validarJwt)

/* ----- OBTENER COSTOS TABLA KMS ----- */
router.get(
    '/',
    [

    ],
    obtenerCostos
)

/* ----- ACTUALIZAR COSTOS TABLA KMS ----- */
router.put(
    '/:id',
    [
        validarCampos
    ],
    actualizarCostos
)

module.exports = router;