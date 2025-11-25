const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const bcryptjs = require('bcryptjs')
dotenv.config()

const jwt = require('jsonwebtoken')
const secretjwt = process.env.SECRETJWT
const secreHash = process.env.SALTAPP_SECRET

const {
    consultausuario,
    consultarUsuarioPorNombre,
    registrarUsuario,
    eliminarUsuario,
    actualizarUsuario
} = require ('../model/modelbdUsuarios')


// Traer usuarios desde la base de datos
async function traerUsuario(){
    try{
        return await consultausuario()
    }catch{
        console.error('Error al leer los datos')
    }
}
const mibdu = traerUsuario()

// controlador para consultar usuarios
const ConsultarusuariosController =  async (req, res) => {
    const producto = await mibdu
    res.json(producto)
}

const consultarUsuarioPorNombreController = async (req, res) => {
    const nombreusu = req.params.nombre;

    const ProductoPorNombre = await consultarUsuarioPorNombre(nombreusu)
    res.json(ProductoPorNombre)
}

// controlador para login de usuarios
const loginUsuarioController = async (req, res)=>{
    const credenciales ={
        nombreuser : req.body.usuario,
        password : req.body.password
    }
    const nombreUs = credenciales.nombreuser

    const mibdu = await traerUsuario()

    // cargar usuarios desde archivo

    // encontrar usuario por nombre de usuario (la contraseña ya fue verificada por el middleware)
    const usuario = mibdu.find(user => user.nombreusu === nombreUs)

    if (usuario) {

        let expiresIn = '600s' // Tiempo de expiración del token
        let rutahtml = '/indice'
        if(usuario.rol === 'administrador'){
            rutahtml = '/indice_admin'
        }

        jwt.sign({ usuario: nombreUs, rol: usuario.rol}, secretjwt, {expiresIn}, (error, token) => {
            if (error){
            
                res.status(500).json({ error: 'Error generando token' })

            }
            res.json({ nombreUs, rutahtml, rol: usuario.rol, token })

        })
    }else{
        res.status(401).json({ error: 'Credenciales incorrectas' })
    }
}

const registrarUsuarioController = async (req, res) =>{

    let nombre = req.body.nombre,
        nombreusu = req.body.usuario,
        password = req.body.password,
        correo = req.body.correo,
        telefono = req.body.telefono,
        rol = req.body.rol
        
        // let passwordcheck = await bcryptjs.hash(password, 10)

        let passwordhash = await (async(password)=>{

            const hashmejorado = password + secreHash
            return await bcryptjs.hash(hashmejorado, 10)
        })(password)

        const nuevoUsuario = await registrarUsuario(nombre,nombreusu, passwordhash, correo, telefono, rol)
        res.json({message: 'Usuario registrado', res: nuevoUsuario})
}


const eliminarUsuarioController =  async (req, res) =>{
    let id = parseInt(req.params.id)

    const Eliminar = await eliminarUsuario(id)
    return res.json({message: 'Usuario eliminado', res: Eliminar})
}



const actualizarUsuarioController = async (req, res) => {
    let id = parseInt(req.params.id)

    const actualizar = await actualizarUsuario(
        id,
        req.body.nombres,
        req.body.nombreusu,
        req.body.correo,
        req.body.rol
    )

    console.log(actualizar)
    res.json({message: 'Usuario actualizado', res: actualizar})
}

module.exports = { 
    ConsultarusuariosController,
    consultarUsuarioPorNombreController,
    loginUsuarioController,
    registrarUsuarioController,
    eliminarUsuarioController,
    actualizarUsuarioController
}