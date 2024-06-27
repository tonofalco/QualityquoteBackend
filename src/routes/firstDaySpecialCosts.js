const { Router } = require('express')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const { actualizarCostosEspeciales, obtenerCostosEspeciales } = require('../controllers/firstDayspecialCosts')

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
// router.use(validarJwt)

/* ----- OBTENER COSTOS TABLA KMS ----- */
router.get(
    '/',
    [

    ],
    obtenerCostosEspeciales
)

/* ----- ACTUALIZAR COSTOS TABLA KMS ----- */
router.put(
    '/:id',
    [
        validarCampos
    ],
    validarJwt,
    actualizarCostosEspeciales
)


module.exports = router;