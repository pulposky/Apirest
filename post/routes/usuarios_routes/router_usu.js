
const express = require('express')
const fs = require('fs')
const bcryptjs = require('bcryptjs')

const path = require('path')

const verificarusuarios = require('../../middlewares/verificarUser')
const subirArchivo = require('../../middlewares/subirfoto')
const verificartoken = require('../../middlewares/verificartoken')

const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')
const secretjwt = process.env.SECRETJWT

const secreHash = process.env.SALTAPP_SECRET


const usuarioRouter = express.Router()

const{
    ConsultarusuariosController,
    consultarUsuarioPorNombreController,
    loginUsuarioController,
    eliminarUsuarioController,
    actualizarUsuarioController,
    registrarUsuarioController
} = require('../../controllers/usuariocontroller')

usuarioRouter.get('/usuarios/login', ConsultarusuariosController)

usuarioRouter.post('/usuarios/login', verificarusuarios, loginUsuarioController)

usuarioRouter.post('/usuarios/registroUsu',registrarUsuarioController )

usuarioRouter.get('/usuarios/consultarUsu/:nombre', consultarUsuarioPorNombreController)

usuarioRouter.patch('/usuarios/actualizarUsu/:id', actualizarUsuarioController)

usuarioRouter.delete('/usuarios/eliminarUsu/:id',  eliminarUsuarioController)


module.exports = usuarioRouter