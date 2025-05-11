const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const { getExtraDayCosts, createExtraDayCosts, updateExtraDayCosts, deleteExtraDayCosts } = require('../controllers/extraDayCostsController');

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
router.use(validarJwt)

/* ----- OBTENER COSTOS ----- */
router.get(
    '/',
    [

    ],
    getExtraDayCosts
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
    createExtraDayCosts
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
    updateExtraDayCosts
)

/* ----- ELIMINAR COSTO ----- */
router.delete(
    '/:id',
    [

    ],
    deleteExtraDayCosts
)

module.exports = router;