const CostosDiaExtra = require("../models/CostosDiaExtra");



//---------OBTENER COSTOS DIA EXTRA------------
const obtenerCostosDiaExtra = async (req, res) => {
    try {
            // console.log(req.body);

        // Obtener usuarios
        const costosDiaExtra = await CostosDiaExtra.findAll()

        // console.log(CostosDiaExtra);

        res.status(200).json({
            ok: true,
            costosDiaExtra,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los costos',
        });
    }
};

//---------CREAR COSTO DIA EXTRA------------
const crearCostoDiaExtra = async (req, res) => {
    try {
        // Extraer los datos de la tabla costosDiaExtra
        const { cost, valueEs, valueFs } = req.body;

        // Crear el evento
        const costoDiaExtra = await CostosDiaExtra.create({
            cost, 
            valueEs, 
            valueFs,
        });

        res.status(201).json({
            ok: true,
            costoDiaExtra,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el nuevo costo',
        });
    }
};

//---------ACTUALIZAR COSTO DIA EXTRA------------
const actualizarCostoDiaExtra = async (req, res) => {
    try {
        const eventoId = req.params.id;

        // Buscar el evento por su ID
        const costoDiaExtra = await CostosDiaExtra.findByPk(eventoId);

        if (!costoDiaExtra) {
            return res.status(404).json({
                ok: false,
                msg: 'Costo no existe',
            });
        }


        // Actualizar los campos del evento
        costoDiaExtra.cost = req.body.cost;
        costoDiaExtra.valueEs = req.body.valueEs;
        costoDiaExtra.valueFs = req.body.valueFs;

        // Guardar los cambios en la base de datos
        await costoDiaExtra.save();

        res.json({
            ok: true,
            costoDiaExtra,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el costo de dia extra',
        });
    }
};

//---------Eliminar COSTO DIA EXTRA------------
const eliminarCostoDiaExtra = async (req, res = response) => {

    const eventoId = req.params.id;

    try {
        const costoDiaExtra = await CostosDiaExtra.findByPk(eventoId);

        if (!costoDiaExtra) {
            return res.status(404).json({
                ok: false,
                msg: 'Costo no existe'
            });
        }

        await costoDiaExtra.destroy({ where: { id: eventoId } });

        res.json({
            ok: true,
            msg: 'Costo eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    obtenerCostosDiaExtra,
    crearCostoDiaExtra,
    actualizarCostoDiaExtra,
    eliminarCostoDiaExtra,
}