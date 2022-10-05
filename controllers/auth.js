const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt');

//---------CREAR------------
const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario(req.body) //agregar usuario

        //generar JWT
        const token = await generarJWT(usuario.id, usuario.name)


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con al admin'
        })
    }

}


//----------LOGIN-----------
const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body

    try {

        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //confirmar los passwords
        const validPassword = bcrypt.compare(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            })
        }

        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name)


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con al admin'
        })
    }
}



//---------REVALIDAR------------
const revalidarToken = async (req, res) => {

    // const uid = req.uid
    // const name = req.name

    const { uid, name } = req

    //generar JWT
    const token = await generarJWT(uid, name)


    res.json({
        ok: true,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}