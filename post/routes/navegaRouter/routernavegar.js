const express = require('express') // Importa Express para crear routers y manejar rutas
const path = require('path') // Utilidad para gestionar rutas de archivos
const cors = require('cors') 
//const jwt = require('jsonwebtoken') // Biblioteca para manejar JWT
const dotenv = require('dotenv') // Carga variables de entorno
dotenv.config() // Inicializa dotenv para cargar process.env
//const secretjwt = process.env.SECRETJWT // Lee la clave secreta JWT desde variables de entorno


// creamos el router para las url

const navegarRouter = express.Router() // Crea un router específico para navegación y vistas



const {
    navegarAconsultar,
    navegarAregistrar,
    navegarAeliminar,
    navegarAactualizar,
    navegarAindice,
    navegarAlogin,
    navegarAlistar,
    navegarIndex,
    //rutas de usuario
    navegarConsultarusuario,
    navegadorEliminarusuario,
    navegarActualizarusuario,
    navegarIndiceadmin,
} = require('../../controllers/navegadorcontroller') // Importa funciones del controlador de navegación (ruta corregida a la raíz)


// Endpoint que recibe una clave 'ruta' y responde con la ruta real

// navegarRouter.post('/rutas', rutasController)

//User

navegarRouter.get('/consultar', navegarAconsultar)

navegarRouter.get('/registrar', navegarAregistrar)

navegarRouter.get('/registroUsu', (req, res) =>{ // Sirve la vista pública de registro de usuarios
    res.sendFile(path.join(global._basedir, 'public/Views/registro_usu.html'))
})

navegarRouter.get('/', navegarAlogin)

navegarRouter.get('/noAutenticado', (req, res) =>{ // Sirve la vista cuando el usuario no está autenticado
    res.sendFile(path.join(global._basedir, 'public/Views/noAutenticado.html'))
})


navegarRouter.get('/indice', navegarAindice)

navegarRouter.get('/eliminar', navegarAeliminar)

navegarRouter.get('/actualizar', navegarAactualizar)

navegarRouter.get('/listar', navegarAlistar)

//Admin

navegarRouter.get('/actualizarUsu', navegarActualizarusuario)

navegarRouter.get('/consultarUsu', navegarConsultarusuario)

navegarRouter.get('/eliminarUsu', navegadorEliminarusuario)

navegarRouter.get('/indice_admin', navegarIndiceadmin)


//ruta hacia index.ejs

navegarRouter.get('/', navegarIndex)




module.exports = navegarRouter