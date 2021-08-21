const express = require('express');
const router = express.Router();
const {createUser, listarUsuarios, listarUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios.controller')
const bcrypt = require('bcrypt');
//Middlewares
const {validarToken} = require('../middleware/login/login.middleware');
const { validarCamposRegistro, validarActualizacion} = require('../middleware/usuarios/validacionRegistro.middleware');
const { validateAdmin } = require('../middleware/usuarios/validateAdmin.middleware');

//const redis = require('redis');

// const redisClient = redis.createClient('redis://localhost:6379');

// async function GuardarRedis(req, res, next){
//     redisClient.hgetall('email', (err, data)=>{
//         if (err) throw err;

//         if (data){
//             console.log(data['jecalad@gmail.com']);
//             res.status(200).send(data);
//         }else{
//             next();
//         }
//     });
// }

/**
 *@swagger
 * /usuarios:
 *  get:
 *      summary: Returns users list to Admins only
 *      tags: [Users]
 *      parameters:
 *          -   in: query
 *              name: token
 *              type: string
 *      responses:
 *          200:
 *              description: return list of users in the database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/listUsers'
 *          401:
 *              description: authentication required
 */
router.get('/',validarToken, validateAdmin, async (req, res)=>{
    
    try{
        const usuarios = await listarUsuarios();
        // usuarios.forEach( (u, index) =>{
        //     redisClient.setex('email'+index, 60, u.email);
        // });

        // const emails = usuarios.map( u => u.email);
        
        // await redisClient.hmset("email", emails, function(err, data) {
        //     if (err) throw err;
        // });

        res.status(200).json(usuarios);

    }catch(err){
        res.status(500).json({"error": err})
    }
});

/**
 *@swagger
 * /usuarios/{id}:
 *  get:
 *      summary: Returns specific user
 *      tags: [Users]
 *      parameters:
 *          -   in: query
 *              name: token
 *              type: string
 *          -   in: path
 *              name: id
 *      responses:
 *          200:
 *              description: return specific user from database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/listUsers'
 *          401:
 *              description: authentication required
 */
router.get('/:id', validarToken, async(req, res)=>{

    const { id } = req.params;

    try{
        const usuario = await listarUsuario(id);
        return res.status(200).json(usuario);
    }catch(err){
        return res.status(500).json({"error": err});
    }
});

/**
 *@swagger
 * /usuarios:
 *  post:
 *      summary: create users
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createUser'
 *      responses:
 *          200:
 *              description: return list of users in the database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/listUsers'
 *          500:
 *              description: se ha producido un error
 */
router.post('/', validarToken, validarCamposRegistro, async (req, res)=>{

    const { nombre, apellido, email, nombre_usuario, contrasena:plainTextPassword, direccion, pais, telefono } = req.body;
    const contraHash = await bcrypt.hash(plainTextPassword, 10);

    try{
       const resUser = await createUser(nombre, apellido, email,nombre_usuario, contraHash, direccion, pais, telefono);
       await res.status(201).json(resUser);
    }catch(err){
        res.status(500).json({"error": err});
    }

});

/**
 *@swagger
 * /usuarios/{id}:
 *  patch:
 *      summary: update users (only administrator can update admin and activo fields)
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *          -   in: query
 *              name: token
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createUser'
 *      responses:
 *          200:
 *              description: user was updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          500:
 *              description: se ha producido un error
 */
router.patch('/:id',validarToken, validarActualizacion, async (req, res) => {
    const { id } = req.params;
    try{
        const usuarioActualizado = await actualizarUsuario(res.usuarioActualizar, id);
        res.status(201).json(usuarioActualizado);
    }catch(err){
        res.status(500).json({"error": err})
    }
});


/**
 *@swagger
 * /usuarios/{id}:
 *  delete:
 *      summary: delete specific user
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *          -   in: query
 *              name: token
 *              type: string
 *      responses:
 *          200:
 *              description: user was deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          500:
 *              description: se ha producido un error
 */
router.delete('/:id',validarToken, validateAdmin, async(req, res)=>{
    const { id } = req.params;

    try{
        await borrarUsuario(id);
        res.status(200).send("usuario borrado");
    }catch(err){
        res.status(500).json({"error": err});
    }

});

module.exports = router;

/**
 *@swagger
 * tags:
 *  name: Users
 *  description: user section
 * components:
 *  schemas:
 *      listUsers:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: user id
 *              nombre:
 *                  type: string
 *                  description: user first name
 *              apellido:
 *                  type: string
 *                  description: user last name
 *              email:
 *                  type: string
 *                  description: user email
 *              fecha_creacion:
 *                  type: date
 *                  description: user registration date
 *              admin:
 *                  type: boolean
 *                  description: determines if the user is an administrator or not
 *              activo:
 *                  type: boolean
 *                  description: determines if the user is active or not
 *              perfil:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          description: profile id
 *                      nombre_usuario:
 *                          type: string
 *                          description: user username for system authentication
 *                      contrasena:
 *                          type: string
 *                          description: user password for system authentication
 *                      direccion:
 *                          type: string
 *                          description: user home address
 *                      pais:
 *                          type: string
 *                          description: user country of residence
 *                      telefono:
 *                          type: number
 *                          description: user phone number
 *                      user_id:
 *                          type: number
 *                          description: profile owner
 *          example:
 *              id: 1
 *              nombre: Juan
 *              apellido: Calad
 *              email: jecalad@gmail.com
 *              fecha_creacion: 2021-08-10T01:35:39.000Z
 *              admin: false
 *              activo: true
 *              perfil:
 *                  id: 1
 *                  nombre_usuario: jecalad
 *                  contrasena: 12345678
 *                  direccion: cra64C348-56
 *                  pais: Colombia
 *                  telefono: 3122915658
 *                  user_id: 1
 *      createUser:
 *          type: object
 *          required:
 *              - nombre
 *              - apellido
 *              - email
 *              - nombre_usuario
 *              - contrasena
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: user first name
 *              apellido:
 *                  type: string
 *                  description: user last name
 *              email:
 *                  type: string
 *                  description: user email
 *              nombre_usuario:
 *                  type: string
 *                  description: user username for system authentication
 *              contrasena:
 *                  type: string
 *                  description: user password for system authentication
 *              direccion:
 *                  type: string
 *                  description: user home address
 *              pais:
 *                  type: string
 *                  description: user country of residence
 *              telefono:
 *                  type: number
 *                  description: user phone number
 */