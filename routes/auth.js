
/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { crearUsuario, loginUsuario, revalidarToken, obtenerUsuarios, eliminarUsuario } = require('../controllers/auth')

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


/* ----- CREAR ----- */
router.post(
    '/new',
    [
        //midelwares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
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


/* ----- REVALIDAR ----- */
router.get('/renew', validarJwt ,revalidarToken)

// borrar eventos
router.delete(
    '/:id',
    [

    ],
    eliminarUsuario
)


module.exports = router

