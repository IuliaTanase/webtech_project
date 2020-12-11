const e = require("express");
const { User, Reservation } = require("../sequelize-config");

const getReservations = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations();
                res.status(200).json(reservations);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const getReservation = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations({ id: req.params.rid });
                console.log(reservations);
                const reservation = reservations.shift();
                if (reservation) {
                    res.status(200).json(reservation);
                } else {
                    res.status(404).json({ message: 'Reservation not found' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const createReservation = async (req, res) => {
    try {
        const userId = req.params.uid;
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const newReservation = await Reservation.create(req.body);
                newReservation.userId = user.id;
                await newReservation.save();
                res.status(201).json(newReservation);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const deleteReservation = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations({ id: req.params.rid });
                const reservation = reservations.shift();
                if (reservation) {
                    await reservation.destroy();
                    res.status(204).json('No content');
                } else {
                    res.status(404).json({ message: 'Reservation not found' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    getReservations,
    getReservation,
    createReservation,
    deleteReservation
}