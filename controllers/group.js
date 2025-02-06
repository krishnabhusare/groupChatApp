const Group = require('../models/group');
const User = require('../models/user');

const createGroup = async (req, res, next) => {
    try {
        const { groupname } = req.body;

        const group = await Group.create({ groupname, admin: req.user.id });
        const user = await User.findByPk(req.user.id);
        await group.addUser(user);
        res.status(201).json({ msg: 'group created successfully', group });

    } catch (err) {
        res.status(500).json({ msg: 'failed while creating group', err })
    }
}

const getGroups = async (req, res, next) => {
    try {
        const groups = await Group.findAll({
            include: {
                model: User,
                where: { id: req.user.id }
            }
        });

        res.status(200).json({ msg: 'successfully created group', groups })

    } catch (err) {
        res.status(500).json({ msg: 'failed while getting groups ', err })
    }
}

const getUsers = async (req, res, next) => {
    try {
        const { groupid } = req.params;
        const group = await Group.findByPk(groupid);
        if (group.admin == req.user.id) {
            const users = await User.findAll();
            res.status(200).json({ msg: 'successfully got users', users })
        }
        else {
            return res.status(404).json({ msg: 'user is not a admin' })
        }


    } catch (err) {
        res.status(500).json({ msg: 'failed while ', err })
    }
}

const addUsers = async (req, res, next) => {
    try {
        const { userid, groupid } = req.params;
        const user = await User.findByPk(userid);
        const group = await Group.findByPk(groupid);
        await group.addUser(user);
        res.status(200).json({ msg: 'added user in group successfully' })

    } catch (err) {
        res.status(500).json({ msg: 'failed while adding user to the group ', err })
    }
}

const getUsersRmove = async (req, res, next) => {
    try {
        const { groupid } = req.params;
        const group = await Group.findByPk(groupid);
        if (group.admin == req.user.id) {
            const usersInGroup = await User.findAll({
                include: {
                    model: Group,
                    where: {
                        id: groupid
                    }
                }
            })
            res.status(200).json({ msg: 'users in group get successfully', usersInGroup });

        }
        else {
            return res.status(404).json({ msg: 'user is not a admin' })
        }



    }
    catch (err) {
        res.status(500).json({ msg: 'failed while geting users from group for removing' })
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { userid, groupid } = req.params;
        const group = await Group.findByPk(groupid);
        const user = await group.removeUser(userid);
        res.status(200).json({ msg: `${user}user removed` });

    } catch (err) {
        res.status(500).json({ msg: 'failed while removing users from group' })
    }
}



module.exports = {
    createGroup,
    getGroups,
    getUsers,
    addUsers,
    getUsersRmove,
    removeUser
}