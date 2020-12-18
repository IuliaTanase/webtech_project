module.exports = (sequelize, DataTypes) => {
    return sequelize.define('aliment', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    message: 'Please enter the aliment!'
                },
                len: [1, 30],
            }
        },
        category: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: ['Vegetables', 'Fruits', 'Bakery', 'Meat', 'Fish', 'Dairy', 'Cereals', 'Sweets', 'Home made', 'Drinks']
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true,
                notEmpty: true,
                notNull: {
                    message: 'Please enter the expiration date!'
                },
            }
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
            }
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: ['AVAILABLE', 'RESERVED'],
            defaultValue: 'AVAILABLE'
        }
    });
}
