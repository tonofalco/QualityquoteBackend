
/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { crearUsuario, loginUsuario, revalidarToken, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/auth')

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJwt } = require('../middlewares/validarJwt')

const router = Router()

/* ----- OBTENER USUARIOS ----- */
router.get(
    '/',
    [

    ],
    obtenerUsuarios
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
    crearUsuario
)

/* ----- INGRESAR ----- */
router.post(
    '/',
    [
        //midelwares
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
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
    actualizarUsuario
)

// /* ----- REVALIDAR ----- */
// router.get('/renew', validarJwt, revalidarToken)

/* ----- ELIMINAR USUARIO ----- */
router.delete(
    '/:id',
    [

    ],
    eliminarUsuario
)


module.exports = router

