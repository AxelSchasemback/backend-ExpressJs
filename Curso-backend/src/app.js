import express from 'express';
import { apiRouter } from './Routers/apiRouter.js';
import { viewsRouter } from './Routers/ViewRouter.js';
import { engine } from 'express-handlebars';
import { Server as IOServer } from 'socket.io';
import { ProductManagerMongo } from './dao/ProductManagerMongo.js';
import mongoose from 'mongoose';
import { MONGODB_URL, PORT } from './config.js';
import { messagesManager } from './dao/messageManagerMongo.js';

const pm = new ProductManagerMongo();

await mongoose.connect(MONGODB_URL);
console.log(`Base de datos conectada a ${MONGODB_URL}`);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

viewsRouter.use('/static', express.static('./static'));

app.engine('handlebars', engine());

app.set('views', './static/views');

app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.use('/api', apiRouter);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const ioServer = new IOServer(server);

app.use('/realTimeProducts', (req, res, next) => {
    req.io = ioServer;
    next();
});

app.post('/api/realTimeProducts', async (req, res) => {
    const { title, category, description, price, thumbnail, code, stock } = req.body;
    const dataProducts = await pm.creteProduct({ title, category, description, price, thumbnail, code, stock });
    ioServer.sockets.emit('products', await pm.getProduct());
    res.json(dataProducts);
});

app.delete('/api/realTimeProducts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pm.delProduct(id);
        ioServer.sockets.emit('products', await pm.getProduct());
        res.json(`Se borró el producto de id: ${id}`);
    } catch (error) {
        res.send(error.message);
    }
});

ioServer.on('connection', (socket) => {
    console.log('Nueva conexión:', socket.id);

    socket.on('getProducts', async () => {
        const allProducts = await pm.getProduct();
        socket.emit('products', allProducts);
    });

    socket.on('message', async msgs => {
        console.log(msgs)
        const newMessage = await messagesManager.insertMessage(msgs)
        
        ioServer.sockets.emit('message', newMessage)
    })

    socket.on('postData', (data) => {
        console.log('Datos recibidos desde el cliente:', data);
    });

    socket.on('user', (usuario) => {
        socket.usuario = usuario;
    });

    socket.on('disconnect', () => {
        console.log('Desconexión:', socket.id);
    });
});
