import express from 'express';
import mongoose from 'mongoose';
import OrderModel from './models/Order.js';
import cors from 'cors';

mongoose.set('strictQuery', false);
// Подключение к базе данных
mongoose
    .connect(
      'mongodb+srv://Max1der:maxider2908@rgrdb.samnjs8.mongodb.net/AutoExclusive?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log('Database Error', err);
    });
// Инициализация приложения
const app = express();

// Подключение json
app.use(express.json());
app.use(cors());

// Методы
app.post('/', async (req, res) => {
    try {
        const doc = new OrderModel({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            board: req.body.board,
        });
        const user = await doc.save();

        return res.json({
            message: 'Пользователь успешно сохранен!',
        });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.get('/', async(req, res) => {
    try {
        let orders = await OrderModel.find();
        return res.json(orders);
    } catch (error) {
        console.log(err);
        res.status(500);
    }
})

app.delete('/:id', async(req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        return res.json({
            message: 'Заказ успешно удалён!',
        });
    } catch (error) {
        console.log(err);
        res.status(500);
    }
})

// Запуск приложения
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started');
});
