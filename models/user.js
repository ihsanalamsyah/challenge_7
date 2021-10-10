'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    // proses enkripsi password
    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    //proses membuat user dengan fungsi register yang isinya username, dan password
    //namun password dilakukan encrypt dulu lalu ditampilkan username, dan password (isinya sudah di enkripsi)
    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password)


      return this.create({ username, password: encryptedPassword })
    };
    // proses membandingkan password dengan method compareSync dari module bcrypt
    checkPassword = password => bcrypt.compareSync(password, this.password);
    
    // proses mem-generate token kasus (passport-jwt) digunakan pada controller 'format' untuk memberikan token pada saat login
    generateToken = () => {
      
      const payload = {
        id: this.id,
        username: this.username
      }
      
      const rahasia = 'Ini rahasia jangan disebar'
      
      const token = jwt.sign( payload, rahasia)
      return token
    }

    
    //proses authentikasi, mencocokan username dan password
    static authenticate = async ({username, password}) => {
      try {
        const user = await this.findOne ({ where: { username }})
        if (!user)
        return Promise.reject("User not found!")
  
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid){
          return Promise.reject("Wrong password")
        }
        return Promise.resolve(user)
        
      }
      catch (err) {
        return Promise.reject(err)
      }
    }
  
  };
  
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

