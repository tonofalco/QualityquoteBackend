import { Router } from 'express';

import { validarJwt } from '../middlewares/validarJwt';

import { getSpecialFirstDayRules, updateSpecialFirstDayRules } from '../controllers/SpecialFirstDayRule.controller';

const router = Router()

// -- todas tienen que pasar por la validacion del JWT -- //
router.use(validarJwt)

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

    ],
    validarJwt,
    updateSpecialFirstDayRules
)


module.exports = router;