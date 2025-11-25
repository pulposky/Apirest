//controlador de rutas de navegacion

const path = require('path')

const jwt =  require('jsonwebtoken')
const secretjwt = process.env.SECRETJWT

//const dotenv = require('dotenv') // Carga variables de entorno
//dotenv.config() // Inicializa dotenv para cargar process.env




// const rutas = { // Mapa de nombres lógicos a rutas de navegación
//     //User
//     'consultar':'/consultar',
//     'registrar':'/registrar',
//     'eliminar':'/eliminar',
//     'actualizar':'/actualizar',
//     'registroUsu':'/registroUsu',
//     'indice':'/indice',
//     'login':'/',
//     'noAutenticado':'/noAutenticado',
//     'listar':'/listar',
//     //Admin
//     'consultarUsu':'/consultarUsu',
//     'eliminarUsu':'/eliminarUsu',
//     'actualizarUsu':'/actualizarUsu',
//     'indice_admin':'/indice_admin'
// }


const verificarCokie = (req, res, ruta) =>{ // Sirve la vista de consultar producto si el token es válido
    
    const token = req.cookies.token // Lee el token desde las cookies

    if(!token){ // Si no hay token, redirige al login
        console.log('No hay token, redirigiendo a login')
        return res.redirect('/')
    }

        jwt.verify(token, secretjwt, (error, data)=>{ // Verifica token usando la clave secreta
            if(error){ // Si hay error (token inválido/expirado)
                console.log('Token no valido')
                    res.redirect('/')
                return
            } 
            console.log('Token recibido: ', token) // Log del token recibido
            //res.sendFile(path.join(global._basedir, ruta)) // Envía el archivo HTML al cliente
            res.render(ruta)
        })
    
}

const navegarAconsultar = (req, res) =>{
    const ruta = 'consultar_pro'
    verificarCokie(req, res, ruta)
}

const navegarAregistrar = (req, res) =>{
    const ruta = 'registrar'
    verificarCokie(req, res, ruta)
}

const navegarAeliminar = (req, res) =>{
    const ruta = 'eliminar_pro'
    verificarCokie(req, res, ruta)
}

const navegarAactualizar = (req, res) =>{
    const ruta = 'actualizar_pro'
    verificarCokie(req, res, ruta)
}

const navegarAindice = (req, res) =>{
    res.render('indice') // Renderiza la vista indice.ejs
}

const navegarAlogin = (req, res) =>{
    res.render('index') // Renderiza la vista index.ejs
}

const navegarAlistar = (req, res) =>{
    const ruta = 'listar_productos'
    verificarCokie(req, res, ruta)
}


// rutas utilizadas en el navegador

const navegarConsultarusuario = (req, res) =>{
    const ruta = 'consultar_usu'
    verificarCokie(req, res, ruta)
}

const navegadorEliminarusuario = (req, res) =>{
    const ruta = 'eliminar_usu'
    verificarCokie(req, res, ruta)
}

const navegarActualizarusuario = (req, res) =>{
    const ruta = 'actualizar_usu'
    verificarCokie(req, res, ruta)
}

const navegarIndiceadmin = (req, res) =>{
    res.render('indice_admin') // Renderiza la vista indice_admin.ejs
}


const navegarIndex = (req, res) =>{
    res.render('index') // Renderiza la vista index.ejs
}

// const rutasController = (req, res) =>{
//     // recibo como clave del cliente ruta que contiene los data-value lo de los botones oprimidos

//     let ruta = req.body.ruta // Lee la ruta lógica enviada por el cliente
//     console.log(ruta) // Log para depuración

//     if(rutas[ruta]){ // Si la ruta lógica existe en el mapa
//         res.json({ // Devuelve la ruta real al cliente
//             succes: true,
//             ruta: rutas[ruta]
//         })
//     }else{
//         res.json({ // Si no existe, indica que no está disponible
//             succes: false,
//             message: 'Ruta no disponible'
//         })
//     }
// }





module.exports = {
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
    navegarIndiceadmin
}