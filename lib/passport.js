
const passport = require ('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const { User, Test } = require('../models');

async function verify( username, password, done) {
    try {
        const user = await User.authenticate({username, password})

        return done(null, user)
    }
    catch(err) {
        return done(null, false, { message: err.message })
    }
}

passport.use(
    new LocalStrategy ( { usernameField: 'username', passwordField: 'password'}, verify)
)

passport.serializeUser(
    (user, done) => done(null, user.id)
)
passport.deserializeUser(
    async (id, done) => done(null, await User.findByPk(id))
)


const options = {

    jwtFromRequest: ExtractJwt.fromHeader('authorization'),

    secretOrKey: 'Ini rahasia jangan disebar',

}

passport.use(new JwtStrategy( options, async (payload, done ) => {

    User.findByPk(payload.id)
    .then(user => done(null, user ))
    .catch(err => done (err, false))
} ))

module.exports = passport;