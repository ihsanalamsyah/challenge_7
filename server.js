
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');

const { port = 8000 } = process.env;

// saat dipostman kita isi data-nya pake x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// setting session handlernya
// (session ini harus diatas inisialisasi passport (passport.initialize()))
app.use(session ( {
    secret: 'Ini rahasia jangan disebar',
    resave: false,
    saveUninitialized: false
}))

//setting passport
// (sebelum router dan view engine)
const passport = require('./lib/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.set('view engine', 'ejs');

//setting router
const router = require('./router');
app.use(router);
app.listen( port, () => {
    console.log(`Server nyala di localhost:${port}`)
});