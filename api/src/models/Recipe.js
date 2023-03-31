const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        customValidator(value){
          if(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value)===false){
           throw new Error("Only letters can be entered to name")
          }
         }
       }      
    },
    image:{
      type: DataTypes.STRING,

    },
    summary:{ 
      type: DataTypes.TEXT,
      customValidator(value){
        if(value.length>300){
          throw new Error("the summary cannot be longer than 300 characters")
        }
      }
  
    },
    healthScore:{
      type: DataTypes.INTEGER,
      validate: {
        customValidator(value){
         if (value <0 && value>100){
          throw new Error("the health score value must be between 0 and 100")
         }
         if(isNaN(value)){
          throw new Error("Only numbers can be entered")
         }
        }
      }
    },
  
    steps:{
       type: DataTypes.JSON,

     },
    createInDB:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,

    }

  },
  { timestamps: false }
  );
};
