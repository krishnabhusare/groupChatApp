const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const Group = require('./models/group');
const Message = require('./models/message');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const messageRoutes = require('./routes/message');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const path = require('path');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
})



app.use(cors());
app.use(express.json());




app.use('/user', userRoutes);
app.use('/group', groupRoutes);

io.use((socket, next) => {
    const user = jwt.verify(socket.handshake.auth.token, 'secreteKey');
    const groupId = socket.handshake.auth.groupId;
    socket.user = { user, groupId };
    next();
})

io.on("connection", (socket) => {

    io.emit("connecteduser", `${socket.user.user.name} joined group id--${socket.user.groupId}`)
    socket.on("msg", async (msg) => {
        try {

            const message1 = await Message.create({ message: msg, userId: socket.user.user.userId, groupId: socket.user.groupId });

            io.emit("msg", { message1, name: socket.user.user.name });
        } catch (err) {

            io.emit('eroor');
        }
    })
    socket.on("disconnect", () => {

        console.log("disconnected");
    })
})



app.use('/message', messageRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, `public/${req.url}`))
})




//association

User.hasMany(Message);
Message.belongsTo(User);


User.belongsToMany(Group, { through: 'usergroup' });
Group.belongsToMany(User, { through: 'usergroup' })

Group.hasMany(Message);
Message.belongsTo(Group);



sequelize.sync({})
    .then(result => {
        server.listen(3000, () => {
            console.log('server listening on port 3000');
        });
    })


