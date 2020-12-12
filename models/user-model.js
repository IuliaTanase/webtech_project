module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    message: 'Please enter your userName!'
                },
                len: [4, 20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    message: 'Please enter your password!'
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
                    message: 'Please enter your email!'
                },
                isEmail: true,
                len: [10, 50],
            }
        },
    },
        {
            defaultScope: {
                attributes: {
                    exclude: ['password']
                },
            }
        });

}
