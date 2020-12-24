const { User, Reservation, Aliment } = require("../sequelize-config");

const getReservations = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations({
                    include: [Aliment]
                });
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
                const { alimentsIds } = req.body;
                if (alimentsIds) {
                    const newReservation = await Reservation.create(req.body);
                    newReservation.userId = user.id;

                    for (let i = 0; i < alimentsIds.length; i++) {
                        const foundAliment = await Aliment.findByPk(alimentsIds[i]);
                        newReservation.addAliment(foundAliment);
                    }
                    await newReservation.save();
                    res.status(201).json(newReservation);
                } else {
                    res.status(400).json({ message: 'Select at least one aliment to reserve' });
                }
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
                    const aliments = await Aliment.findAll({
                        where: {
                            reservationId: reservation.id
                        }
                    });
                    let newAliments = aliments;
                    for (let aliment of newAliments) {
                        aliment.status = 'AVAILABLE';
                        await aliment.save();
                    }
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