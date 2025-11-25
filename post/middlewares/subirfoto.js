const multer = require('multer')

const almacenaminento = multer.diskStorage({
    //destino donde va estar la foto

    destination: function(req, file, destino){
        destino(null, 'public/Adse/fotoperfil')
    },  
    filename: function(req, file, nombre){

        let extension = file.mimetype.split('/')[1]

        nombre(null, `${file.originalname.split('.')[0]}.${extension}`)

    }
})

const subir = multer({storage: almacenaminento})

module.exports = subir
//ruta para subir la foto