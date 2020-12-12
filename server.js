const express = require('express');
const Sequelize = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


const userRouter = require('./routers/user-router');
const userAlimentsRouter = require('./routers/userAliments-router');
const alimentRouter = require('./routers/aliment-router');
const reservationRouter = require('./routers/reservation-router');
const loginRouter = require('./routers/loginUser-router');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ force: true });
        res.status(201).json({ message: 'Created' });
    } catch (error) {
        next(error);
    }
});


app.use('/api/users', userRouter);
app.use('/api/users', userAlimentsRouter);
app.use('/api/aliments', alimentRouter);
app.use('/api/users', reservationRouter);
app.use('/api/users', loginRouter);

app.use((error, req, res, next) => {
    console.warn(error);
    res.status(500).json({ message: 'Server error' });
})

app.listen(8080);



