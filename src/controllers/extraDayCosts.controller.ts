import { ExtraDayCost } from "../models/ExtraDayCost.model";



//---------OBTENER COSTOS DIA EXTRA------------
export const getExtraDayCosts = async (req: any, res: any) => {
    try {

        // Obtener usuarios
        const costosDiaExtra = await ExtraDayCost.findAll()

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
export const createExtraDayCosts = async (req: any, res: any) => {
    try {
        // Extraer los datos de la tabla costosDiaExtra
        const { id, cost, valueEs, valueFs } = req.body;

        // Crear el evento
        const costoDiaExtra = await ExtraDayCost.create({
            id,
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
export const updateExtraDayCosts = async (req: any, res: any) => {
    try {
        const eventoId = req.params.id;

        // Buscar el evento por su ID
        const costoDiaExtra = await ExtraDayCost.findByPk(eventoId);

        if (!costoDiaExtra) {
            return res.status(404).json({
                ok: false,
                msg: 'Costo no existe',
            });
        }


        // Actualizar los campos del evento
        costoDiaExtra.set({
            cost: req.body.cost,
            valueEs: req.body.valueEs,
            valueFs: req.body.valueFs,
        });

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
export const deleteExtraDayCosts = async (req: any, res: any) => {

    const eventoId = req.params.id;

    try {
        const costoDiaExtra = await ExtraDayCost.findByPk(eventoId);

        if (!costoDiaExtra) {
            return res.status(404).json({
                ok: false,
                msg: 'Costo no existe'
            });
        }

        await ExtraDayCost.destroy({ where: { id: eventoId } });


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
