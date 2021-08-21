const Usuario = require('../../models/user.models');
const Perfiles = require('../../models/perfil.models');

const { listarUsuarios } = require('../../controllers/usuarios.controller');

const chai = require('chai');
const expect = chai.expect;
const faker = require('faker');
const sinon = require('sinon');

describe('validar controller usuarios',()=>{
    let expectedStubValue;
    let stubValue;
    // let userRepository;
    // let userService;

    describe('/get usuarios', async()=>{

        // before(function () {
        //     userRepository = new UserRepository();
        //     userService = new UserService(userRepository);
        // });

        beforeEach(function () {
            expectedStubValue = [{
              id: faker.datatype.number(),
              nombre: faker.name.findName(),
              apellido: faker.name.firstName(),
              email: faker.internet.email(),
              fecha_creacion: faker.date.past(),
              admin: faker.datatype.boolean(),
              activo: faker.datatype.boolean(),
            }];
            stubValue = expectedStubValue;
          });

        it.only('listar todos los usuarios', async()=>{
            const stub = sinon.stub(Usuario, "findAll").returns(stubValue);

            const usuarios = await listarUsuarios();
            
            expect(stub.calledOnce).to.be.true;
            expect(usuarios[0].id).to.equal(expectedStubValue[0].id);

        })
    })
})