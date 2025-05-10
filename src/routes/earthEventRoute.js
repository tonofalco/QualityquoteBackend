/**
    Event Route
    /api/events
 */

const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')
const { getEarthEvent, createEarthEvent, updateEarthEvent, deleteEarthEvent } = require('../controllers/earthEventController')


const router = Router()

// todas tienen que pasar por la validacion del JWT
router.use(validarJwt)

// obtener eventos
router.get(
    '/',
    [

    ],
    getEarthEvent
)

// crear un nuevo eventos
router.post(
    '/',
    [
        check('seats', 'El numero de transportes es obligatorio').not().isEmpty(),
        check('status', 'El status es obligatorio').not().isEmpty(),
        check('transport', 'El tipo de transporte es obligatorio').not().isEmpty(),
        check('transportNumber', 'El numero de plazas es obligatorio').not().isEmpty(),
        check('nameClient', 'El nombre del cliente es obligatorio').not().isEmpty(),
        check('phone', 'El telefono del cliente es obligatorio').not().isEmpty(),
        check('departure', 'El punto de salida es obligatorio').not().isEmpty(),
        check('destination', 'El punto de llegada es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('advance', 'El anticipo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    createEarthEvent
)

// Actualizar eventos
router.put(
    '/:id',
    [
        check('seats', 'El numero de transportes es obligatorio').not().isEmpty(),
        check('transport', 'El tipo de transporte es obligatorio').not().isEmpty(),
        check('transportNumber', 'El numero de plazas es obligatorio').not().isEmpty(),
        check('nameClient', 'El nombre del cliente es obligatorio').not().isEmpty(),
        check('phone', 'El telefono del cliente es obligatorio').not().isEmpty(),
        check('departure', 'El punto de salida es obligatorio').not().isEmpty(),
        check('destination', 'El punto de llegada es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('advance', 'El anticipo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    updateEarthEvent)

// borrar eventos
router.delete(
    '/:id',
    [

    ],
    deleteEarthEvent
)


module.exports = router;