
const { User, Aliment, Reservation, Friend } = require("../sequelize-config");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.warn(error);
    }
}

const createUser = async (req, res) => {
    try {
        if (req.body.userName && req.body.password && req.body.email) {
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { userName: req.body.userName },
                        { email: req.body.email }
                    ]
                }
            });
            if (existingUser) {
                res.status(409).json({ message: 'User already exist' });
            } else {
                const newUser = await User.create(req.body);
                res.status(201).json(newUser);
            }
        } else {
            res.status(400).json({ message: "Username, password and email are mandatory" });

        }
    } catch (error) {
        console.warn(error);
    }
}

const getUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const foundUser = await User.findByPk(userId, {
                include: [Reservation, Aliment, Friend]
            });
            if (foundUser) {
                res.status(200).json(foundUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const foundUser = await User.findByPk(userId);
            if (foundUser) {
                if (req.body.userName && req.body.email) {
                    const anotherSameUser = await User.findOne({
                        where: {
                            [Op.or]: [
                                { userName: req.body.userName },
                                { email: req.body.email }
                            ]
                        }
                    });
                    if (anotherSameUser && (anotherSameUser.id !== foundUser.id)) {
                        res.status(409).json({ message: "User already exists" });
                    } else {
                        foundUser.userName = req.body.userName;
                        foundUser.name = req.body.name;
                        foundUser.email = req.body.email;
                        await foundUser.save();
                        res.status(200).json(foundUser);
                    }
                } else {
                    res.status(400).json({ message: "Username, password and email are mandatory" });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }

}

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'User ID should be a number' });
        } else {
            const foundUser = await User.findByPk(userId);
            if (foundUser) {
                await foundUser.destroy();
                res.status(204).json({ message: 'No content' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}



module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}