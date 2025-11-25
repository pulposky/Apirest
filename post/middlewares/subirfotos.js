const multer = require('multer')

const fs = require('fs')
const path = require('path')
const { match } = require('assert')


const almacenamiento = multer.diskStorage({
    destination: (req, file, destino)=>{
        let nombrePorducto = req.body.nombre

        const directorio = path.join(global._basedir, 'public/Adse/fotoproducto', nombrePorducto)


        if(!fs.existsSync(directorio)){
            fs.mkdirSync(directorio, {recursive: true})
        }


        destino(null, directorio)
    },

    filename: (req, file, nombre)=>{
        let extension = file.mimetype.split('/')[1]
        let nombrePorducto = req.body.nombre

        //generar nombre consecutivo
        let nuevonombre = nombrePorducto + (Date.now()+1) + (Math.floor() * 101)

        nombre(null, `${nuevonombre.split('.')[0]}.${extension}`)
    }
})


const subirArchivos = multer({storage: almacenamiento})

module.exports = subirArchivos