untuk mengakses MVC

- ketik npm index di terminal\
- ketik localhost:3002/\
- klik TRIAL jika ingin main game sederhana :D\
- klik Login untuk mengelola database\
- untuk id password ada di file db ejs \
- setelah itu silahkan buat data baru ( inget ya id sama id_user itu harus sama )\
- lalu submit\
- klik back untuk mengelola data tersebut\
- done :D

untuk mengakses MCR

- ketik npm server di terminal\
- buka postman
- ketik localhost:8000/api/v1/auth/register dan isi body untuk membuat akun
- lalu lakukan login di localhost:8000/api/v1/auth/login dan isi body untuk mendapatkan token sebagai authorization
- untuk mengakses beberapa endpoint perlu memasukkan token di header dengan key Authorization dan value token
- untuk membuat room ketik localhost:8000/api/v1/auth/create-room dan masukkan token dan isi body nama_room

pembagian tugas 

MVC => dikerjakan oleh Wilando Putrayuda
Register & login (serta akun admin) => dikerjakan oleh Faris Fahmi
Create Room => dikerjakan oleh Ihsan Alamsyah
Fight logic => dikerjakan oleh Zuhri Saifudin (tidak selesai)


