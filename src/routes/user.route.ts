/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
import { Router } from 'express';
import { check } from 'express-validator';

import { validarJwt } from '../middlewares/validarJwt';
import { validarCampos } from '../middlewares/validarCampos';

import { createUser, loginUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller'

const router = Router()

/* ----- INGRESAR ----- */
router.post(
    '/',
    [
        //midelwares
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser
)

/* ----- OBTENER USUARIOS ----- */
router.get(
    '/',
    [

    ],
    validarJwt,
    getUsers,
)

/* ----- CREAR USUARIO ----- */
router.post(
    '/new',
    [
        //midelwares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
        check('role', 'el rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJwt,
    createUser,
)

/* ----- ACTUALIZAR USUARIO ----- */
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        // check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    validarJwt,
    updateUser,
)

/* ----- REVALIDAR ----- */
router.get(
    '/renew',
    [],
    validarJwt,
    deleteUser
)

/* ----- ELIMINAR USUARIO ----- */
router.delete(
    '/:id',
    [

    ],
    deleteUser
)

module.exports = router;