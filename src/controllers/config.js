const Configuracion = require('../models/Configuracion');
// const Usuario = require('../models/Usuario');

// Ruta para obtener los valores de configuración
const obtenerCostos = async (req, res) => {
    try {
            // console.log(req.body);

        // Obtener usuarios
        const configuracion = await Configuracion.findAll()

        res.status(200).json({
            ok: true,
            configuracion,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los costos',
        });
    }
};

const actualizarCostos = async (req, res) => {
    const { id } = req.params; // Obtener el ID de configuración de los parámetros de la solicitud
    const nuevosValores = req.body; // Obtener los nuevos valores de configuración de la solicitud

    // Convertir los valores necesarios a enteros
    nuevosValores.gasoline = parseFloat(nuevosValores.gasoline, 10);
    // Otros valores que necesiten ser convertidos a enteros

    try {
        // Verificar si la configuración existe
        let configuracion = await Configuracion.findByPk(id);

        if (!configuracion) {
            return res.status(404).json({
                ok: false,
                msg: 'Configuración no encontrada',
            });
        }

        // Actualizar los campos de la configuración con los nuevos valores
        Object.assign(configuracion, nuevosValores);

        // Guardar los cambios en la base de datos
        await configuracion.save();

        res.status(200).json({
            ok: true,
            configuracion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la configuración',
        });
    }
};

// const checkUserRole = (requiredRole) => {
//     return (req, res, next) => {
//         // Asumiendo que el rol del usuario está almacenado en req.user.role
//         const userRole = req.user.role;

//         // Verificar si el usuario tiene el rol necesario para acceder a la ruta
//         if (userRole === requiredRole || userRole === 'admin') {
//             next(); // Permitir el acceso
//         } else {
//             return res.status(403).json({ message: 'Acceso no autorizado' });
//         }
//     };
// };


module.exports = {
    obtenerCostos,
    actualizarCostos,
}