
const express = require('express');

const port = 3002;
const app = express();

// mengambil models
const { User_Game, User_Game_Biodata, User_Game_History } = require('./models');

// mengambil data dari db
let dataUser = require('./db/dataUser.json');

// dipakai untuk dapat membaca <form>
app.use(
    express.urlencoded({
        extended: false
    })
);

// membaca file 'public' menggunakan middleware static sehingga css, img, js dapat terbaca di ejs views
app.use(express.static('public'));

// untuk membaca ejs (yang ada di direktori views) harus pakai miidleware ini
app.set('view engine', 'ejs');

// data dalam bentuk json harus melakukan middleware ini. middleware = urutan setelah response dan sebelum routing
app.use(express.json());

// melihat dataUser pada postman
app.get('/api/v1/users', (req, res) => {
    res.status(200).json(dataUser);

});

// melihat dataUser yang sesuai dengan id-nya
app.get('/api/v1/users/:id', (req, res) => {

    const user = dataUser.find((item) => {

        return item.id == req.params.id
    });
    res.status(200).json(user);
});

// masukkan data baru dengan method post diisi bodynya
app.post('/api/v1/users', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const lastItem = dataUser[dataUser.length - 1];
    const id = lastItem.id + 1;

    const newUser = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    }
    
    // masukkan data newUser baru dengan method push pada dataUser
    dataUser.push(newUser);

    res.status(201).json({status: "berhasil"});
    res.end();
});

/* 
    delete dataUser berdasarkan "id"
    req.params.id sesuai dengan id yang kita tentukan di route
 */
app.delete('/api/v1/users/:id', (req, res) => {
    dataUser = dataUser.filter((item) => {
        return item.id != req.params.id;
    })

    res.status(200).json({
        message: `Post dengan id ${req.params.id} sudah berhasil dihapus!`

    });
});

/* 
    buat fungsi login, 
    lakukan looping untuk mendapatkan semua array ada di database 
    jika email dan password berbeda dengan yang ada di db maka, keluar pesan jika sama maka masuk ke halaman game
    variabel email dan password untuk mengambil data dari database json
*/
login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let i = 0;
    for (; i < dataUser.length; i++){

        if (dataUser[i].email != email){
            console.log('email invalid');
            return res.render ('login').json({
                message: "Invalid email"
            })
        }
        else if (dataUser[i].password != password){
            console.log('wrong pass')
            return res.render ('login').json({
                message: "Invalid password"
            })
        }
        else if ((dataUser[i].email == email) && (dataUser[i].password == password)){
             return res.render('game');
        } 
    }

}

// routing
app.get('/', (req, res) => {
    res.render('index');
    res.status(200);
});

app.get('/register', (req, res) => {
    res.render('users/create');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/game', (req, res) =>{
    res.render('game')
})

// Action form dari login.ejs dengan fungsi login
app.post('/login', login);


// challenge ch. 6

// API dashboard semua user
app.get('/users', (req, res) =>{
    User_Game.findAll()
    .then(user_games => {
        res.render('users/index', {
            user_games
        })
    })
})

// Action dari form create.ejs untuk membuat data
app.post('/users', (req, res) =>{
    User_Game.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(user => {
        res.send('User berhasil dibuat')
    })
});

// API untuk mengarah ke form create.ejs
app.get('/users/create', (req, res) => {
    res.render('users/create')
});

// Action dari form createBiodata.ejs untuk membuat data
app.post('/usersBiodata', (req, res) =>{
    User_Game_Biodata.create({
        user_id: req.body.user_id,
        name: req.body.name,
        umur: req.body.umur,
        pekerjaan: req.body.pekerjaan
    })
    .then(user => {
        res.send('User biodata berhasil dibuat')
    })
});

// API untuk mengarah ke form createBiodata.ejs
app.get('/users/create/biodata', (req, res) => {
    res.render('users/createBiodata')
});

// API untuk melihat detail data sesuai id yang di tekan
app.get('/users/:id', (req, res) =>{
    User_Game.findOne({
        where: {id: req.params.id}
    })
    .then(user_games => {
        res.render('users/show', { user_games }
        );
    });
})

// API menghapus data
app.get('/users/delete/:id', (req, res) => {
    User_Game.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.send(`User dengan ID ${req.params.id} berhasil dihapus`);
      });
  })

//API mengupdate data
app.get('/users/update/:id', (req, res) => {
    User_Game.findOne({ where: { id: req.params.id } })
      .then((user_games) => {
        res.render('users/update', { user_games });
      });
});
 
// Action dari form update.ejs untuk mengupdate data
app.post('/users/update/:id', (req, res) => {
    User_Game.update({ username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },
    { where: { id: req.params.id } }
    )
    .then(() => {
      res.send(`User dengan ID ${req.params.id} berhasil diupdate`);
    });
});

app.listen(port, () => {
    console.log(`server jalan di https://localhost:${port}`)
})

console.log(dataUser);