
const { User } = require('../sequelize-config');


const loginUser = async (req, res) => {
    try {
        const username = req.body.userName;
        const pass = req.body.password;
        if (username) {
            if (pass) {
                const userlogged = await User.findOne({
                    where: {
                        userName: username,
                        password: pass
                    },
                });

                if (userlogged) {
                    res.status(200).json(userlogged);
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            } else {
                res.status(400).json({ message: "Password is mandatory" });
            }
        } else {
            res.status(400).json({ message: "Username is mandatory" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" });
    }
}

module.exports = { loginUser }