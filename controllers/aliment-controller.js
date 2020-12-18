
const { Aliment } = require('../sequelize-config');
const { Reservation } = require('../sequelize-config');

const getAliments = async (req, res) => {
    try {
        const aliments = await Aliment.findAll();
        res.status(200).json(aliments);
    } catch (error) {
        console.warn(error);
    }
}

const createAliment = async (req, res) => {
    try {
        if (req.body.name && req.body.expirationDate) {
            const newAliment = await Aliment.create(req.body);
            res.status(201).json(newAliment);
        } else {
            res.status(400).json({ message: "Name and expiration date are mandatory" })
        }
    } catch (error) {
        console.warn(error);
    }
}

const getAliment = async (req, res) => {
    try {
        const alimentId = req.params.aid;
        if (isNaN(alimentId)) {
            res.status(400).json({ message: 'Aliment ID should be a number' });
        } else {
            const foundAliment = await Aliment.findByPk(alimentId);
            if (foundAliment) {
                res.status(200).json(foundAliment);
            } else {
                res.status(404).json({ message: 'Aliment not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const updateAliment = async (req, res) => {
    try {
        const alimentId = req.params.aid;
        if (isNaN(alimentId)) {
            res.status(400).json({ message: 'Aliment ID should be a number' });
        } else {
            const foundAliment = await Aliment.findByPk(alimentId);
            if (foundAliment) {
                if (req.body.name && req.body.expirationDate) {
                    foundAliment.name = req.body.name;
                    foundAliment.category = req.body.category;
                    foundAliment.expirationDate = req.body.expirationDate;
                    foundAliment.ingredients = req.body.ingredients;
                    foundAliment.weight = req.body.weight;
                    foundAliment.status = req.body.status;
                    await foundAliment.save();
                    res.status(200).json(foundAliment);
                } else {
                    res.status(400).json({ message: "Name and expiration date are mandatory" })
                }
            } else {
                res.status(404).json({ message: 'Aliment not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const deleteAliment = async (req, res) => {
    try {
        const alimentId = req.params.aid;
        if (isNaN(alimentId)) {
            res.status(400).json({ message: 'Aliment ID should be a number' });
        } else {
            const foundAliment = await Aliment.findByPk(alimentId);
            if (foundAliment) {
                await foundAliment.destroy();
                res.status(204).json({ message: 'No content' });
            } else {
                res.status(404).json({ message: 'Aliment not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    getAliments,
    createAliment,
    getAliment,
    updateAliment,
    deleteAliment
}