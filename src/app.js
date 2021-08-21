const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); 
const sequelize = require('../database/connection')
require('dotenv').config();
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('../utils/swaggerOptions');

const EXPRESSPORT = process.env.EXPORT || 3000;

//Swagger Documentacion
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

//Rutas
const routes = require('../routes');
require('../models/associations');

//uso Cors
app.use(cors());

//helmet
app.use(helmet());

//Body Parse
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', routes);

app.listen(EXPRESSPORT, ()=>{ 
    console.log(`server listening on port ${EXPRESSPORT}`);

    //conexion a la BD
    sequelize.sync({alter:false}).then(()=>{
        console.log("nos hemos conectado a la BD");
    }).catch(error=>{
        console.error("se ha presentado un error", error)
    })
});