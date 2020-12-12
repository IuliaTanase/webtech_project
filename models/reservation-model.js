const { Aliment } = require("../sequelize-config");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reservation', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true,
                notEmpty: true,
            }
        },
        minutesUntilCancel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                min: 5,
                notEmpty: true
            }
        }
    },
        {
            include: [Aliment]
        });
}