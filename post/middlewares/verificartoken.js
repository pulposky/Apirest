
const jwt = require('jsonwebtoken')


const dotenv = require('dotenv')
dotenv.config()

const secret = process.env.SECRETJWT


function verificartoken(req, res, next){

    const portadora = req.cookies.token

    if(portadora){

        req.token = portadora

        jwt.verify(req.token, secret, (error, datos)=>{
            if(error){
                return res.status(401).json({error: 'Token no valido'})
            }
            // adjuntar los datos decodificados al request para que middlewares posteriores puedan usar el rol
            req.user = datos
            next()
        })

    }else{
        res.status(401).json({error: 'Token no proveido'})
    }

}




module.exports = verificartoken
