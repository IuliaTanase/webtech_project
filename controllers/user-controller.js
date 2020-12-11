
const { User, Aliment, Reservation } = require("../sequelize-config");

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
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
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
                include: [Reservation, Aliment]
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
                foundUser.userName = req.body.userName;
                foundUser.password = req.body.password;
                foundUser.name = req.body.name;
                foundUser.email = req.body.email;
                await foundUser.save();
                res.status(200).json(foundUser);
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