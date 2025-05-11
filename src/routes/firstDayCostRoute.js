const { Router } = require('express')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const { updateFirstDayCosts, getFirstDayCosts } = require('../controllers/firstDayCostController')

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
router.use(validarJwt)

/* ----- OBTENER COSTOS TABLA KMS ----- */
router.get(
    '/',
    [

    ],
    getFirstDayCosts
)

/* ----- ACTUALIZAR COSTOS TABLA KMS ----- */
router.put(
    '/:id',
    [
        validarCampos
    ],
    validarJwt,
    updateFirstDayCosts
)

module.exports = router;