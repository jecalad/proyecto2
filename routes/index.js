const router = require('express').Router();


const UserRoutes = require('./usuarios.routes');
const PerfilRoutes = require('./perfil.routes');
const ProductsRoutes = require('./productos.routes');
const PedidosRoutes = require('./pedidos.routes');
const LoginRoutes = require('./login.routes');
const MetodosPagoRoutes = require('./metodosPagos.routes');

//middleware
const {validarToken} = require('../middleware/login/login.middleware');

//login
router.use('/login', LoginRoutes);

// list, create , update and delete users
router.use('/usuarios', UserRoutes);

//update user profile only
router.use('/perfil', validarToken, PerfilRoutes);

//list, create, update and delete Products
router.use('/productos', validarToken, ProductsRoutes);

//create orders
router.use('/pedidos', validarToken, PedidosRoutes);

//crear, read,update and delete Payment Methods
router.use('/pagos', validarToken, MetodosPagoRoutes);


module.exports = router;
