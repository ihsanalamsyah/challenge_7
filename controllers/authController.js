

const { User, Test, Room } = require('../models');
const passport = require('../lib/passport');

function format(user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken: user.generateToken()
    }
}
module.exports = {
    //membuat fungsi register, isinya user dari model melakukan fungsi register isinya req.body
    // dimana req.body itu isinya username, dan password
    register: (req, res, next) => {

        User.register(req.body)
        .then((user) => {
            res.json(user)
        })
        .catch(err => next(err))
    },
    login: (req, res) => {
        
        User.authenticate (req.body)
        .then(user => {
            res.json(
                format(user)
            )
        })
    },   
    whoami: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser)
    },
    createRoom: (req, res, next) => {

        Room.createRoom (req.body)
        .then(room => {
            res.json(room)
        })
        .catch(err => next(err))
    },

    fight: (req, res) => {
        
    }
}
