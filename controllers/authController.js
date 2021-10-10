

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
    all: (req, res, next) => {

        User.findAll()
        .then((user) => {
            res.json(user)
        })
        .catch(err => next(err))
    },
    createRoom: (req, res, next) => {

        Room.createRoom (req.body)
        .then(room => {
            res.json(room)
        })
        .catch(err => next(err))
    },

    fight: (req, res, next) => {

        
        Room.update({
            player1: req.body.player1,
            player2: req.body.player2
          },
          { where: { id: req.params.id } }
          )
          .then(() => {
            res.json(`User berhasil di masukkan kedalam room ID ${req.params.id}`);
          })
          .catch(err => next(err))
     

    },
    pilihan: (req, res, next) => {

        
            Room.update({
                choice1: req.body.choice1,
                choice2: req.body.choice2
              },
              { where: { id: req.params.id } }
              )
              .then(() => {
                res.json(`Pilihan berhasil di masukkan kedalam room ID ${req.params.id}`);
              })
              .catch(err => next(err))
         
    
        },
    main: (req, res) => {

        Room.main (req.body)
        .then(user => {
            res.json(user)
        })
    }
}
