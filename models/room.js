'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }


    // Buat fungsi create-room
    static createRoom = async ({ nama_room }) => {
  
      return this.create({ nama_room })
  
    }
    
    checkChoice1 = (choice1) =>{
      return choice1 ='gunting'
    }


    static main = async ({ choice1, choice2 }) =>{
    
    
    }
  }

  Room.init({
    nama_room: DataTypes.INTEGER,
    player1: DataTypes.STRING,
    player2: DataTypes.STRING,
    choice1: DataTypes.ARRAY( DataTypes.STRING),
    choice2: DataTypes.ARRAY( DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};