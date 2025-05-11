const { Router } = require('express')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const { getSpecialFirstDayRules, updateSpecialFirstDayRules } = require('../controllers/SpecialFirstDayRulesController')

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
// router.use(validarJwt)

/* ----- OBTENER COSTOS TABLA KMS ----- */
router.get(
    '/',
    [

    ],
    getSpecialFirstDayRules
)

/* ----- ACTUALIZAR COSTOS TABLA KMS ----- */
router.put(
    '/:id',
    [
        validarCampos
    ],
    validarJwt,
    updateSpecialFirstDayRules
)


module.exports = router;