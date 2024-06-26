const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const { obtenerCostosDiaExtra, crearCostoDiaExtra, actualizarCostoDiaExtra, eliminarCostoDiaExtra } = require('../controllers/extraDayCosts');

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
// router.use(validarJwt)

/* ----- OBTENER COSTOS ----- */
router.get(
    '/',
    [

    ],
    obtenerCostosDiaExtra
)

/* ----- CREAR COSTO ----- */
router.post(
    '/new',
    [
        check('cost', 'El nombre del costo es obligatorio').not().isEmpty(),
        check('valueEs', 'El valor entre semana es obligatorio').not().isEmpty(),
        check('valueFs', 'El valor en fin de semana es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJwt,
    crearCostoDiaExtra
)

/* ----- ACTUALIZAR COSTO ----- */
router.put(
    '/:id',
    [
        check('cost', 'El nombre del costo es obligatorio').not().isEmpty(),
        check('valueEs', 'El valor entre semana es obligatorio').not().isEmpty(),
        check('valueFs', 'El valor en fin de semana es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJwt,
    actualizarCostoDiaExtra
)

/* ----- ELIMINAR COSTO ----- */
router.delete(
    '/:id',
    [

    ],
    validarJwt,
    eliminarCostoDiaExtra
)

module.exports = router;