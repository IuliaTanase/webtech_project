const { User, Aliment } = require('../sequelize-config');

const getUserAliments = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliments = await user.getAliments();
                res.status(200).json(aliments);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const createUserAliment = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliment = await Aliment.create(req.body);
                aliment.userId = user.id;
                await aliment.save();
                res.status(201).json(aliment);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const getUserAliment = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliments = await user.getAliments({ where: { id: req.params.aid } });
                const aliment = aliments.shift();
                if (aliment) {
                    res.status(200).json(aliment);
                } else {
                    res.status(404).json({ message: 'Aliment not found' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const updateUserAliment = async (req, res) => {
    console.log(1);
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliment = await Aliment.findByPk(req.params.aid);
                if (aliment) {
                    aliment.id = req.body.id;
                    aliment.name = req.body.name;
                    aliment.category = req.body.category;
                    aliment.expirationDate = req.body.expirationDate;
                    aliment.ingredients = req.body.ingredients;
                    aliment.weight = req.body.weight;
                    aliment.status = req.body.status;
                    aliment.reservationId = req.body.reservationId;
                    await aliment.save();
                    res.status(200).json(aliment);
                } else {
                    res.status(404).json({ message: 'Aliment not found' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const deleteUserAliment = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliments = await user.getAliments({ where: { id: req.params.aid } });
                const aliment = aliments.shift();
                console.log("aliment", aliment)
                if (aliment) {
                    await aliment.destroy();
                    res.status(204).json({ message: 'No content' });
                } else {
                    res.status(404).json({ message: 'Aliment not found' });
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
    getUserAliments,
    createUserAliment,
    getUserAliment,
    updateUserAliment,
    deleteUserAliment
}