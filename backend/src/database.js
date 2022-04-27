const mongoose = require('mongoose');
require('dotenv').config()

//URLDBATLAS para conectar a atlas
//URLDB para local


mongoose.connect(process.env.URLDBATLAS,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('base de datos conectada',db.connection.name))
    .catch((error) => console.log(error.message))

module.exports=mongoose