const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generarJWT } = require('../helpers/jwt');

//----------LOGIN-----------
const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    try {

        // const usuario = await Usuario.findOne({ email })
        let usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name, usuario.role)

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            role: usuario.role,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con al admin'
        })
    }
};

//---------OBTENER------------
const getUsers = async (req, res) => {
    
    try {
        // Obtener usuarios
        const usuarios = await User.findAll();
        // console.log(usuarios);
        
        res.status(200).json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los usuarios',
        });
    }
};

//---------CREAR------------
const createUser = async (req, res = response) => {

    const { email, password } = req.body

    try {

        // let usuario = await Usuario.findOne({ email })
        let usuario = await User.findOne({ where: { email } });


        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new User(req.body) //agregar usuario

        //generar JWT
        const token = await generarJWT(usuario.id, usuario.name, usuario.role)


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            role: usuario.role,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con un admin'
        })
    }

};

//---------ACTUALIZAR------------
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
        // Verificar si el usuario existe
        let usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }

        // Actualizar los campos del usuario
        usuario.name = name;
        usuario.email = email;
        usuario.role = role;
        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el usuario',
        });
    }
};

//---------Eliminar------------
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el usuario existe
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }

        // Eliminar el usuario
        await usuario.destroy();

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error por favor hable con un administrador',
        });
    }
};

//---------REVALIDAR------------
const revalidarToken = async (req, res) => {

    // const uid = req.uid
    // const name = req.name

    const { uid, name, role } = req
    // console.log(role)

    //generar JWT
    const token = await generarJWT(uid, name, role)

    // console.log('Revalidar Token response:', {
    //     ok: true,
    //     uid,
    //     name,
    //     role,
    //     token
    // });

    res.json({
        ok: true,
        uid,
        name,
        role,
        token
    })
};


module.exports = {
    loginUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    revalidarToken,
}