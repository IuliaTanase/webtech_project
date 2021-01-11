const Sequelize = require('sequelize');

const sequelize = new Sequelize('project_webtech', 'root', 'welcome123', {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});


const User = require('./models/user-model')(sequelize, Sequelize);
const Aliment = require('./models/aliment-model')(sequelize, Sequelize);
const Reservation = require('./models/reservation-model')(sequelize, Sequelize);

User.hasMany(Aliment);
Aliment.belongsTo(User);

User.hasMany(Reservation);
Reservation.belongsTo(User);

Reservation.hasMany(Aliment);
Aliment.belongsTo(Reservation);

// sequelize.sync(
//     { force: true }
// );

module.exports = {
    User,
    Aliment,
    Reservation
}