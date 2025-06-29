/**
    Event Route
    /api/events
 */

import { Router } from 'express';
import { check } from 'express-validator';

import { validarJwt } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';
import { isDate } from '../helpers/isDate';

import { getEarthEvent, createEarthEvent, updateEarthEvent, deleteEarthEventById } from '../controllers/earthEvent.controller';


const router = Router()

// todas las rutas tienen que pasar por la validacion del JWT
router.use(validarJwt)

//----------OBTENER EVENTOS TERRESTRE-----------
router.get(
    '/',
    [

    ],
    getEarthEvent
)

//----------CREAR EVENTO TERRESTRE-----------
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

//----------ACTUALIZAR EVENTO TERRESTRE-----------
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

//----------ELIMINAR  EVENTO TERRESTRE-----------
router.delete(
    '/:id',
    [

    ],
    deleteEarthEventById
)


module.exports = router;