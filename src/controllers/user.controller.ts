
import bcrypt from 'bcryptjs';

import { User } from '../models/User.model';
import { generarJWT } from '../helpers/jwt';


//----------LOGIN-----------
export const loginUser = async (req: any, res:any) => {

    const { email, password } = req.body

    try {

        let usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.get('password') as string);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar nuestro JWT
        const token = await generarJWT(
            usuario.get('id') as string,
            usuario.get('name') as string,
            usuario.get('role') as string,
        );

        res.json({
            ok: true,
            uid: usuario.get('id') as string,
            name: usuario.get('name') as string,
            role: usuario.get('role') as string,
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
export const getUsers = async (req: any, res: any) => {

    try {
        // Obtener usuarios
        const usuarios = await User.findAll();

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
export const createUser = async (req: any, res: any) => {

    const { email, password } = req.body

    try {

        let usuario = await User.findOne({ where: { email } });


        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new User(); //agregar usuario
        Object.assign(usuario, req.body)

        //Generar nuestro JWT
        const token = await generarJWT(
            usuario.get('id') as string,
            usuario.get('name') as string,
            usuario.get('role') as string,
        );


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.set('password', bcrypt.hashSync(password, salt));

        await usuario.save()

        res.status(201).json({
            ok: true,
            uid: usuario.get('id') as string,
            name: usuario.get('name') as string,
            role: usuario.get('role') as string,
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
export const updateUser = async (req: any, res: any) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

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
        usuario.set({
            name,
            email,
            role
        });

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
export const deleteUser = async (req: any, res: any) => {
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
export const revalidarToken = async (req: any, res: any) => {

    const { uid, name, role } = req

    //generar JWT
    const token = await generarJWT(uid, name, role)

    res.json({
        ok: true,
        uid,
        name,
        role,
        token
    })
};
