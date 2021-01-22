const { User, Friend } = require("../sequelize-config");

const getAllFriends = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            req.status(400).json({ message: "User ID should be a number" });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const friends = await user.getFriends();
                res.status(200).json(friends);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const addFriend = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(400).json({ message: "User ID should be a number" });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const friend = await Friend.create(req.body);
                friend.userId = userId;
                await friend.save();
                res.status(201).json(friend);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const getFriendAliments = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid)
        const usernameFriend = req.params.usernameFriend;
        if (isNaN(userId)) {
            res.status(400).json({ message: "User ID should be a number" });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const friends = await user.getFriends()
                friend = friends.shift();
                if (friend) {
                    const userFriend = await User.findOne({ where: { userName: usernameFriend } });
                    if (userFriend) {
                        const aliments = await userFriend.getAliments();
                        res.status(200).json(aliments);
                    } else {
                        res.status(400).json({ message: 'userFriend not found' });
                    }
                } else {
                    res.status(400).json({ message: 'Friend not found' });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    getAllFriends,
    addFriend,
    getFriendAliments
}