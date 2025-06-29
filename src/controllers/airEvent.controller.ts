import { AirEvent } from '../models/AirEvent.model';
import { PriceBreakdown } from '../models/PriceBreakdown.model';
import { Collection } from '../models/Collection.model';
import { User } from '../models/User.model';

//----------OBTENER EVENTOS AEREOS-----------
export const getAirEvents = async (req: any, res: any) => {
    try {
        const airEvents = await AirEvent.findAll({
            include: [{
                model: PriceBreakdown,
                as: 'priceBreakdowns'
            },
            {
                model: Collection,
                as: 'collection'
            },
            {
                model: User,
                attributes: ['name'],
            },]
        });

        // Formatear la respuesta como deseas
        const formattedEvents = airEvents.map(event => {
            const data = event.get({ plain: true }) as any;
            return {
                id: data.id,
                startDate: data.startDate,
                endDate: data.endDate,
                destination: data.destination,
                customerName: data.customerName,
                desglosePrecios: (data.priceBreakdowns ?? []).map((price: any) => ({
                    id: price.id,
                    concept: price.concept,
                    description: price.description,
                    cost: price.cost,
                    pax: price.pax
                })),
                Cobranza: (data.collection ?? []).map((co: any) => ({
                    id: co.id,
                    date: co.date,
                    concept: co.concept,
                    tc: co.tc,
                    tax: co.tax,
                })),
                user: {
                    id: data.userId,
                    name: data.user ? data.user.name : null // Asegúrate de que el modelo User esté correctamente relacionado
                }
            };
        });

        res.json({ eventos: formattedEvents });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: errorMessage });
    }
};

//----------OBTENER EVENTO AEREO POR ID-----------
export const getAirEventById = async (req: any, res: any) => {
    try {
        const airEvent = await AirEvent.findByPk(req.params.id, {
            include: [{
                model: PriceBreakdown,
                as: 'priceBreakdowns'
            },
            {
                model: Collection,
                as: 'collection'
            },
            {
                model: User,
                attributes: ['name'],
            },]
        });

        if (!airEvent) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        // Formatear la respuesta como deseas
        const data = airEvent.get({ plain: true }) as any;
        const formattedEvent = {
            id: data.id,
            startDate: data.startDate,
            endDate: data.endDate,
            destination: data.destination,
            customerName: data.customerName,
            desglosePrecios: (data.priceBreakdowns ?? []).map((price: any) => ({
                id: price.id,
                concept: price.concept,
                description: price.description,
                cost: price.cost,
                pax: price.pax
            })),
            Cobranza: (data.collection ?? []).map((co: any) => ({
                id: co.id,
                date: co.date,
                concept: co.concept,
                tc: co.tc,
                tax: co.tax,
            })),
            user: {
                id: data.userId,
                name: data.user ? data.user.name : null // Asegúrate de que el modelo User esté correctamente relacionado
            }
        };

        res.json({ evento: formattedEvent });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: errorMessage });
    }
};

//----------CREAR EVENTO TERRESTRE-----------
export const createAirEvent = async (req: any, res: any) => {
    try {
        const { startDate, endDate, destination, customerName, priceBreakdowns, collection } = req.body;

        // Crear el evento
        const airEvent = await AirEvent.create({
            startDate,
            endDate,
            destination,
            customerName,
            userId: req.uid,
        });

        // Si hay desglose de precios, crearlos
        if (priceBreakdowns && priceBreakdowns.length > 0) {
            const breakdowns = priceBreakdowns.map((item: any) => ({
                ...item,
                airEventId: airEvent.get('id')
            }));

            await PriceBreakdown.bulkCreate(breakdowns);
        }

        // Si hay desglose de cobranza, crearlos
        if (collection && collection.length > 0) {
            const co = collection.map((item: any) => ({
                ...item,
                airEventId: airEvent.get('id')
            }));

            await Collection.bulkCreate(co);
        }

        res.status(201).json(airEvent);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: errorMessage });
    }
};

//----------ACTUALIZAR EVENTO AEREO-----------
export const updateAirEvent = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, destination, customerName, priceBreakdowns, collection } = req.body;

        // 1. Verificar que el evento existe y pertenece al usuario
        const event = await AirEvent.findOne({
            where: {
                id: id,
                userId: req.uid // Asegura que solo el dueño puede editar
            }
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado o no autorizado'
            });
        }

        // 2. Actualizar los campos básicos del evento
        await event.update({
            startDate: startDate ?? (event as any).startDate,
            endDate: endDate ?? (event as any).endDate,
            destination: destination ?? (event as any).destination,
            customerName: customerName ?? (event as any).customerName
        });

        // 3. Manejar el desglose de precios
        if (priceBreakdowns) {
            // Eliminar los existentes (opcional, según tu lógica de negocio)
            await PriceBreakdown.destroy({
                where: { airEventId: id }
            });

            // Crear los nuevos
            const newBreakdowns = priceBreakdowns.map((item: any) => ({
                ...item,
                airEventId: id
            }));

            await PriceBreakdown.bulkCreate(newBreakdowns);
        }

        if (collection) {
            // Eliminar los existentes (opcional, según tu lógica de negocio)
            await Collection.destroy({
                where: { airEventId: id }
            });

            // Crear los nuevos
            const newCollection = collection.map((item: any) => ({
                ...item,
                airEventId: id
            }));

            await Collection.bulkCreate(newCollection);
        }

        // 4. Obtener el evento actualizado con sus precios
        const updatedEvent = await AirEvent.findByPk(id, {
            include: [{
                model: Collection,
                as: 'collection'
            }]
        });

        res.status(200).json({
            success: true,
            event: updatedEvent
        });

    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
            details: (error as any)?.errors?.map((err: { message: any; }) => err.message)
        });
    }
};

//----------ELIMINAR EVENTO AEREO-----------
export const deleteAirEventById = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        // Primero eliminamos los priceBreakdowns asociados
        await PriceBreakdown.destroy({
            where: { airEventId: id }
        });

        // Eliminar cobranza asociada
        await Collection.destroy({
            where: { airEventId: id }
        });

        // Luego eliminamos el evento
        const deleted = await AirEvent.destroy({
            where: { id: id }
        });

        if (deleted === 0) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Evento y su desglose de precios eliminados correctamente',
            deletedEventId: parseInt(id)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
            details: (error as any)?.errors?.map((err: { message: any; }) => err.message)
        });
    }
};

