const express = require('express') // Importa Express para crear routers
const cors = require('cors') 
const fs = require('fs') 

const routerProductos = require('./productos_routes/router_pro') // Router de productos
const routerUsuarios = require('./usuarios_routes/router_usu') // Router de usuarios
const routerUrl = require('./navegaRouter/routernavegar') // Router de navegación (páginas)

const rutaprincipal = express.Router() // Crea el router principal que agrupará sub-routers

rutaprincipal.use(express.json()) 
rutaprincipal.use(express.text()) 
rutaprincipal.use(cors()) 

rutaprincipal.use(routerProductos) // Monta las rutas de productos en el router principal
rutaprincipal.use(routerUsuarios) 
rutaprincipal.use(routerUrl) 

module.exports = rutaprincipal // Exporta el router principal para ser usado por server.js