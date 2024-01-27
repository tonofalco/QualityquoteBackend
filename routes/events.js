/**
    Event Route
    /api/events
 */

const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')


const router = Router()

// todas tienen que pasar por la validacion del JWT
router.use(validarJwt)

// obtener eventos
router.get(
    '/',
    [

    ],
    getEventos
)

// crear un nuevo eventos
router.post(
    '/',
    [
        // check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
)

// Actualizar eventos
router.put(
    '/:id',
    [
        // check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento)

// borrar eventos
router.delete(
    '/:id',
    [

    ],
    eliminarEvento
)


module.exports = router;