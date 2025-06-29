/**
    Event Route
    /api/events
 */

import { Router } from 'express';
import { check } from 'express-validator';

import { validarJwt } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';

import { getAirEvents, getAirEventById, createAirEvent, updateAirEvent, deleteAirEventById } from '../controllers/airEvent.controller';

const router = Router()

// todas las rutas tienen que pasar por la validacion del JWT
router.use(validarJwt)

//----------OBTENER EVENTOS TERRESTRE-----------
router.get(
  '/',
  [

  ],
  getAirEvents
)

//----------OBTENER EVENTO TERRESTRE POR ID-----------
router.get(
  '/:id',
  [
    check('destination', 'El destino es obligatorio').not().isEmpty(),
  ],
  getAirEventById
)

//----------CREAR EVENTO TERRESTRE-----------
router.post(
  '/',
  [
    check('startDate', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('startDate', 'La fecha de inicio debe ser una fecha válida').isISO8601(),
    check('endDate', 'La fecha de fin es obligatoria').not().isEmpty(),
    check('endDate', 'La fecha de fin debe ser una fecha válida').isISO8601(),
    check('destination', 'El destino es obligatorio').not().isEmpty(),
    check('destination', 'El destino debe tener entre 3 y 255 caracteres').isLength({ min: 3, max: 255 }),
    check('customerName', 'El nombre del cliente es obligatorio').not().isEmpty(),
    check('customerName', 'El nombre del cliente debe tener entre 3 y 255 caracteres').isLength({ min: 3, max: 255 }),
    check('priceBreakdowns').optional().isArray(),
    check('priceBreakdowns.*.concept', 'El concepto es obligatorio').if(check('priceBreakdowns').exists()).not().isEmpty(),
    check('priceBreakdowns.*.description', 'La descripción es obligatoria').if(check('priceBreakdowns').exists()).not().isEmpty(),
    check('priceBreakdowns.*.cost', 'El costo debe ser un número entero positivo').if(check('priceBreakdowns').exists()).isInt({ min: 0 }),
    check('priceBreakdowns.*.pax', 'El número de pasajeros debe ser un entero positivo').if(check('priceBreakdowns').exists()).isInt({ min: 1 }),
    validarCampos
  ],
  createAirEvent
)

//----------ACTUALIZAR EVENTO TERRESTRE-----------
router.put(
  '/:id',
  [
    check('id', 'El ID debe ser un número válido').isInt().toInt(),
    check('startDate', 'La fecha de inicio debe ser una fecha válida').optional().isISO8601(),
    check('endDate', 'La fecha de fin debe ser una fecha válida').optional().isISO8601(),
    check('destination', 'El destino debe tener entre 3 y 255 caracteres').optional().isLength({ min: 3, max: 255 }),
    check('customerName', 'El nombre del cliente debe tener entre 3 y 255 caracteres').optional().isLength({ min: 3, max: 255 }),
    check('priceBreakdowns').optional().isArray(),
    check('priceBreakdowns.*.concept', 'El concepto es obligatorio').if(check('priceBreakdowns').exists()).not().isEmpty(),
    check('priceBreakdowns.*.description', 'La descripción es obligatoria').if(check('priceBreakdowns').exists()).not().isEmpty(),
    check('priceBreakdowns.*.cost', 'El costo debe ser un número entero positivo').if(check('priceBreakdowns').exists()).isInt({ min: 0 }),
    check('priceBreakdowns.*.pax', 'El número de pasajeros debe ser un entero positivo').if(check('priceBreakdowns').exists()).isInt({ min: 1 }),
    validarCampos
  ],
  updateAirEvent
)

//----------ELIMINAR EVENTO TERRESTRE-----------
router.delete(
  '/:id',
  [

  ],
  deleteAirEventById
)

module.exports = router;