

// const { response } = require('express');
const Configuracion = require('../models/Configuracion');

// Ruta para obtener los valores de configuración
const obtenerCostos = async (req, res) => {
    try {
        // Obtener usuarios
        const configuracion = await Configuracion.findAll();

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


module.exports = {
    obtenerCostos,
    actualizarCostos,
}