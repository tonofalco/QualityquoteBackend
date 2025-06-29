import { FirstDayCost } from '../models/FirstDayCost.model';

//---------OBTENER COSTOS POR KMS------------
export const getFirstDayCosts = async (req: any, res: any) => {
    try {

        // Obtener costes de bd
        const costesKms = await FirstDayCost.findAll()

        res.status(200).json({
            ok: true,
            costesKms,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los costos',
        });
    }
};


//---------ACTUALIZAR COSTO POR KMS------------
export const updateFirstDayCosts = async (req: any, res: any) => {
    const { id } = req.params; // Obtener el ID de configuración de los parámetros de la solicitud
    const nuevosValores = req.body; // Obtener los nuevos valores de configuración de la solicitud

    // Convertir los valores necesarios a enteros
    // nuevosValores.gasoline = parseFloat(nuevosValores.gasoline, 10);

    try {
        let costesPorId = await FirstDayCost.findByPk(id);

        // Verificar si la configuración existe
        if (!costesPorId) {
            return res.status(404).json({
                ok: false,
                msg: 'Configuración no encontrada',
            });
        }

        // Actualizar los campos de la configuración con los nuevos valores
        Object.assign(costesPorId, nuevosValores);

        // Guardar los cambios en la base de datos
        await costesPorId.save();

        res.status(200).json({
            ok: true,
            configuracion: costesPorId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la configuración',
        });
    }
};
