const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const createUser = require('./libs/createUser')
require('dotenv').config()

require('./database')

const app = express();

app.set('Port', process.env.PORT);

//ruta para los archivos cargados
app.use('/public', express.static(__dirname + "/storage/docs"))

app.get(createUser.create())

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: '*'}));

app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/documento', require('./routes/documento.route'));

app.listen(app.get('Port'), () => {
    console.log('servidor corriendo en el puerto ', app.get('Port'))
});