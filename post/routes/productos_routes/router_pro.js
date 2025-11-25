const express = require('express')

const fs = require('fs')
const path = require('path')

const subirArchivos = require('../../middlewares/subirfotos')
const verificartoken = require('../../middlewares/verificartoken')

//creamos router productos
const productosRouter = express.Router()

// funcion para traer productos (local) y controladores centralizados
function traerProducto(){ // Lee y parsea el JSON de productos desde la carpeta public
    const data = fs.readFileSync('./public/data/productos.json', 'utf-8')
    return JSON.parse(data)
}

const mibdp = traerProducto() // Carga inicial de productos en memoria

//importar controladores
const{
    consultarProductosController,
    consultarProductoPorNombreController,
    registrarProductoController,
    eliminarProductoController,
    actualizarProductoController,
    listarProductosController
} = require('../../controllers/productocontroller') // Ruta al controlador en la raíz del proyecto


productosRouter.get('/productos/consultar', consultarProductosController)

productosRouter.post('/productos/registrar', subirArchivos.array('imagenesp', 3), registrarProductoController)

productosRouter.delete('/productos/eliminar/:id', verificartoken, eliminarProductoController)

productosRouter.get('/productos/consultar/:nombre', verificartoken, consultarProductoPorNombreController)

productosRouter.patch('/productos/actualizar/:id', verificartoken, actualizarProductoController)

productosRouter.get('/productos/listar', listarProductosController)

module.exports = productosRouter