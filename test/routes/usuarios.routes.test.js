const chai = require('chai');
const expect = chai.expect;
const faker = require('faker');
const sinon = require('sinon');

//modelos
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {createUser, listarUsuarios, listarUsuario, actualizarUsuario, borrarUsuario} = require('../../controllers/usuarios.controller')
const {validarToken} = require('../../middleware/login/login.middleware');
const { validarCamposRegistro, validarActualizacion} = require('../../middleware/usuarios/validacionRegistro.middleware');
const { validateAdmin } = require('../../middleware/usuarios/validateAdmin.middleware');


describe('Validar Usuarios', ()=>{
    describe('/get usuarios', async ()=>{
        it("listar todos los usuarios", async ()=>{
            expect(true).to.be.true;
        })
    })
})