module.exports = (sequelize, DataTypes) => {
    return sequelize.define('friend', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    message: 'Please enter the userName!'
                },
                len: [4, 20]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [3, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    message: 'Please enter the email!'
                },
                isEmail: true,
                len: [10, 50]
            }
        }
    });
}
