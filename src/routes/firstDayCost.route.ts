import { Router } from 'express';

import { validarJwt } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';


import { updateFirstDayCosts, getFirstDayCosts } from '../controllers/firstDayCost.controller';

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
    ],
    validarJwt,
    updateFirstDayCosts
)

module.exports = router;