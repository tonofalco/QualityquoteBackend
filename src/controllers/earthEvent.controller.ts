import { response } from 'express';
import { EarthEvent } from '../models/EarthEvent.model';
import { User } from '../models/User.model';

//----------OBTENER EVENTOS TERRESTRE-----------
export const getEarthEvent = async (req: any, res:any) => {
    try {

        console.log('req.uid', req.uid)
        // Obtener eventos
        const eventos = await EarthEvent.findAll({
            include: {
                model: User,
                attributes: ['name'],
            },
        });

        res.status(200).json({
            ok: true,
            eventos,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los eventos',
        });
    }
};

//----------CREAR EVENTO TERRESTRE-----------
export const createEarthEvent = async (req: any, res:any) => {
    try {
        // Extraer los datos del evento del cuerpo de la solicitud
        const {  id, transport, transportNumber, seats, nameClient, phone, departure, destination, status, notes, start, end, price, advance } = req.body;

        // Crear el evento
        const evento = await EarthEvent.create({
            id,
            seats,
            transport,
            transportNumber,
            nameClient,
            phone,
            departure,
            destination,
            price,
            advance,
            status,
            notes,
            start,
            end,
            userId: req.uid, // Asignar el ID del usuario actual como userId
        });

        res.status(201).json({
            ok: true,
            evento,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el evento',
        });
    }
};

//----------ACTUALIZAR EVENTO TERRESTRE-----------
export const updateEarthEvent = async (req: any, res:any) => {
    try {
        const eventoId = req.params.id;
        const uid = req.uid;

        // Buscar el evento por su ID
        const evento = await EarthEvent.findByPk(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe',
            });
        }

        if (evento.get('userId') !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento',
            });
        }

        evento.set({
            transport: req.body.transport,
            transportNumber: req.body.transportNumber,
            seats: req.body.seats,
            nameClient: req.body.nameClient,
            phone: req.body.phone,
            departure: req.body.departure,
            destination: req.body.destination,
            price: req.body.price,
            advance: req.body.advance,
            status: req.body.status,
            notes: req.body.notes,
            start: req.body.start,
            end: req.body.end,
        });

        // Guardar los cambios en la base de datos
        await evento.save();

        res.json({
            ok: true,
            evento,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento',
        });
    }
};

//----------ELIMINAR  EVENTO TERRESTRE-----------
export const deleteEarthEventById = async (req: any, res:any = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await EarthEvent.findByPk(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        }

        if (evento.get('userId') !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }

        await EarthEvent.destroy({ where: { id: eventoId } });

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
