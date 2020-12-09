const Sequelize = require('sequelize');

console.log("test: ", process.env.DB_NAME)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const User = require('./models/user-model')(sequelize, Sequelize);
const Aliment = require('./models/aliment-model')(sequelize, Sequelize);

User.hasMany(Aliment);
Aliment.belongsTo(User);

sequelize.sync(
    // { force: true }
)
    ;

module.exports = {
    User,
    Aliment
}