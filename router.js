

const router = require('express').Router();

const auth = require('./controllers/authController');
const adminOnly = require('./middlewares/adminOnly');
const restrict = require('./middlewares/restrict');

router.get('/', restrict, (req, res) => res.render('index'));

router.get('/register', (req, res) => res.render('register'))
router.post('/register', auth.register)


router.get('/login', (req, res) => res.render('login'));

router.post('/login', auth.login);


router.get('/whoami', restrict, auth.whoami);

// Postman Register (auth.register adalah controllernya)
router.post('/api/v1/auth/register', auth.register);
// Postman Login
router.post('/api/v1/auth/login', auth.login);

// Postman whoami
router.get('/api/v1/auth/whoami', restrict, adminOnly, auth.whoami);

router.get('/api/v1/auth/all', restrict, auth.all);

//fungsi middleware dapat dipakai biar gak semua orang bisa ngakses suatu endpoint atau memilih user mana yang bisa ngakses
// pake next()

//challenge
router.post('/api/v1/auth/create-room', restrict, auth.createRoom);

router.get('/api/v1/auth/fight/main', restrict, auth.main);


router.post('/api/v1/auth/fight/:id', restrict, auth.fight);

router.get('/api/v1/auth/fight/:id', restrict, auth.pilihan);


module.exports = router;
