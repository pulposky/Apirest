const fs = require('fs')
const path = require('path')

const {
    consultarProducto,
    consultarProductoPorNombre,
    registrarProducto,
    eliminarProducto,
    actualizarProducto,
    RegistrarImagenes
} = require('../model/modelobd')


// funcion para traer productos y enlistar (local) y controladores centralizados
// function traerProductoListar(){
//     const data = fs.readFileSync('./public/data/productos.json', 'utf-8')
//     return JSON.parse(data)
// }

// const mibdplistar = traerProductoListar() // Carga inicial de productos en memoria

// funcion para traer productos (local) y controladores centralizados
// function traerProducto(){
//     const data = fs.readFileSync('./public/data/productos.json', 'utf-8')
//     return JSON.parse(data)
// }

// const mibdp1 = traerProducto()
// const mibdp = mibdp1.data

// Traer productos desde la base de datos
async function traerProducto(){
    try{
        return await consultarProducto()
    }catch{
        console.error('Error al leer los datos')
    }
}
const mibdp = traerProducto()

const consultarProductosController = async (req, res) => {
    const producto = await mibdp
    res.json(producto)
}

const listarProductosController = async (req, res) =>{
    const producto = await mibdp
    res.json({data: producto})
}

// Consultar producto por nombre
// const consultarProductoPorNombreController = (req, res)=>{
//     // capturar valor de la peticion

//     let nombrePeticion = req.params.nombre


//     let consulta = mibdp.find(producto=> producto.nombre === nombrePeticion)

//     if(consulta){
//         res.json(consulta)
//     }else{
//         res.status(404).json({error: `Producto no encontrado`})
//     }
// }


//controlador para consultar producto por nombre desde la base de datos
const consultarProductoPorNombreController = async (req, res)=>{
    // capturar valor de la peticion
        let nombrePeticion = req.params.nombre 

    const ProductoPorNombre = await consultarProductoPorNombre(nombrePeticion)
    res.json(ProductoPorNombre)
}

// const registrarProductoController = (req, res) =>{

//     let id = parseInt(req.body.id),
//         nombre = req.body.nombre,
//         descripcion = req.body.descripcion,
//         precio = parseFloat(req.body.precio),
//         cantidad = parseInt(req.body.cantidad),
//         fotosp = req.files

//         let imagenes = fotosp.map(file => file.filename)

//     mibdp.push({
//         id,nombre,descripcion,precio,cantidad, fotosp: imagenes
//     })

//     let datos = JSON.stringify(mibdp)

//     fs.writeFileSync('./public/data/productos.json', datos)
    
//     res.send(mibdp)
// }


const registrarProductoController = async (req, res) =>{

    let  nombre = req.body.nombre,
        descripcion = req.body.descripcion,
        precio = parseFloat(req.body.precio),
        cantidad = parseInt(req.body.cantidad)
        //fotos = req.files

        //validar que existan las imagenes
        if(!req.files || req.files === 0){
            return res.status(400).json({message: 'Deben existir una imagen'})
        }


        const productoId = await registrarProducto(nombre, descripcion, precio, cantidad)

        const imagenes = req.files.map((archivo,index)=>({
            ruta: `/Adse/fotoproducto/${nombre}/${archivo.filename}`
        }))


        await RegistrarImagenes(productoId, imagenes)

        res.json({message: 'Producto registrado', res: productoId})
}

const eliminarProductoController =  async (req, res) =>{
    let id = parseInt(req.params.id)


    const Eliminar = await eliminarProducto(id)
    return res.json({message: 'Producto eliminado', res: Eliminar})
}

const actualizarProductoController = async (req, res) => {
    let id = parseInt(req.params.id)


    // let producto = mibdp.find(p => p.id === id)

    // if (!producto) {
    //     return res.status(404).json({ error: 'Producto no encontrado' })
    // }

    // // Actualiza todos los campos recibidos en el body
    // producto.nombre = req.body.nombre
    // producto.descripcion = req.body.descripcion
    // producto.precio = parseFloat(req.body.precio)
    // producto.cantidad = parseInt(req.body.cantidad)

    // fs.writeFileSync('./public/data/productos.json', JSON.stringify(mibdp.data))
    // res.json(producto)

    const actualizar = await actualizarProducto(
        id,
        req.body.nombre,
        req.body.descripcion,
        parseFloat(req.body.precio),
        parseInt(req.body.cantidad)
    )
    res.json({message: 'Producto actualizado', res: actualizar})
}



module.exports = { 
    consultarProductosController,
    consultarProductoPorNombreController,
    registrarProductoController,
    eliminarProductoController,
    actualizarProductoController,
    listarProductosController
}