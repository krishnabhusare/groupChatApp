const Message = require('../models/message');

const User = require('../models/user');

const sendMessage = async (req, res, next) => {
    try {
        const { msg } = req.body;

        const message1 = await req.user.createMessage({ message: msg, groupId: req.headers.groupid });

        res.status(201).json({ msg: 'success in sending msg', message1, name: req.user.name });

    } catch (err) {
        res.status(500).json({ msg: 'failed while sending msg' });
    }
}

const getMessage = async (req, res, next) => {
    try {
        const { groupid } = req.params;
        const allmsg = await Message.findAll({
            include: {
                model: User,
                attributes: ['name']
            },
            where: {
                groupId: groupid
            }
        })
        res.status(200).json({ allmsg });


    } catch (err) {
        res.status(500).json({ msg: 'failed while getting all msg in group', err })
    }
}


module.exports = {
    sendMessage,
    getMessage

}