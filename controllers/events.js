const { response } = require('express')
const Evento = require('../models/Evento')
const Usuario = require('../models/Usuario');


const getEventos = async (req, res) => {
    try {
        // Obtener eventos
        const eventos = await Evento.findAll({
            include: {
                model: Usuario,
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


const crearEvento = async (req, res) => {
    try {
        // Extraer los datos del evento del cuerpo de la solicitud
        const { transport, transportNumber, seats, nameClient, phone, departure, destination, title, notes, start, end, price, advance } = req.body;

        // Crear el evento
        const evento = await Evento.create({
            seats,
            transport,
            transportNumber,
            nameClient,
            phone,
            departure,
            destination,
            price,
            advance,
            // title,
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


const actualizarEvento = async (req, res) => {
    try {
        const eventoId = req.params.id;
        const uid = req.uid;

        // Buscar el evento por su ID
        const evento = await Evento.findByPk(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe',
            });
        }

        if (evento.userId !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento',
            });
        }

        // Actualizar los campos del evento
        evento.transport = req.body.transport;
        evento.transportNumber = req.body.transportNumber;
        evento.seats = req.body.seats;
        evento.nameClient = req.body.nameClient;
        evento.phone = req.body.phone;
        evento.departure = req.body.departure;
        evento.destination = req.body.destination;
        evento.price = req.body.price;
        evento.advance = req.body.advance;
        // evento.title = req.body.title;
        evento.notes = req.body.notes;
        evento.start = req.body.start;
        evento.end = req.body.end;

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


const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findByPk(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        }

        if (evento.userId !== uid.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }

        await Evento.destroy({ where: { id: eventoId } });

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



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}