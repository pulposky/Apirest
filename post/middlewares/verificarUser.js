
const bcryptjs = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config()

const secreHash = process.env.SALTAPP_SECRET


const {
    consultausuario
} = require ('../model/modelbdUsuarios')

async function traerUsuario(){
    try{
        return await consultausuario()
    }catch{
        console.error('Error al leer los datos')
    }
}

const verificaruser = async(req, resp, next) =>{

    const credenciales = {
        nombreus : req.body.usuario,
        contraus : req.body.password
    }

    const mibdu = await traerUsuario()

    if(!credenciales.nombreus || !credenciales.contraus){
        return resp.sendStatus(404)
    }
    
    let user = mibdu.find( user => user.nombreusu === credenciales.nombreus)

console.log(credenciales)


    const hashmejorado = credenciales.contraus + secreHash
    const comprobarpassword = await bcryptjs.compare(hashmejorado, user.password)

    if(!user) return resp.status(401).json('nombre de usuario no valido')

    // if(user.password != credenciales.contraus) return resp.status(403).json('contraseña no valida')
        
    if(!comprobarpassword){
        return resp.status(401).json({error:'malo'})
    }
    
    next()
}

module.exports = verificaruser