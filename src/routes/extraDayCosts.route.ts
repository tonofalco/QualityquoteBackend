import { Router } from 'express';
import { check } from 'express-validator';

import { validarJwt } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';

import { getExtraDayCosts, createExtraDayCosts, updateExtraDayCosts, deleteExtraDayCosts } from '../controllers/extraDayCosts.controller';

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