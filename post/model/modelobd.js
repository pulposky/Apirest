//metodos de consulta a la base de datos de productos

const conectar = require('../database/conexion')

//metodo para obtener los productos


//metodo para obtener todos los productos
async function consultarProducto(){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('SELECT * FROM productos', (error, registros)=>{
            if(error){
                rechazada(error)
            }
            resuelta(registros)
        })
})
}

//metodo para obtener producto por nombre
async function consultarProductoPorNombre(nombre){
    return new Promise((resuelta, rechazada) => {
        conectar.query('SELECT * FROM imagenes_producto i JOIN  productos p  ON p.id = i.producto_id WHERE nombre = ?', [nombre], (error, registros) => {
            if (error) {
                rechazada(error)
                return
            }

            // Agrupar las filas en un solo objeto producto usando reduce()
            const producto = registros.reduce((acc, row) => {
                // inicializar campos del producto con la primera fila
                if (!acc.id) {
                    acc.id = row.id
                    acc.nombre = row.nombre
                    acc.descripcion = row.descripcion
                    acc.precio = row.precio
                    acc.cantidad = row.cantidad
                    acc.imagenes = []
                }

                // añadir la ruta de imagen si existe
                if (row.ruta_img) {
                    acc.imagenes.push(row.ruta_img)
                }

                return acc
            }, {})

            console.log('registros recibidos:', registros.length)
            console.log('producto agrupado:', producto)

            // Devolver un array con un único producto para conservar compatibilidad
            resuelta([producto])
        })
    })
}

//metodo para registrar un nuevo producto
async function registrarProducto(nombre, descripcion, precio, cantidad){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('INSERT INTO productos (nombre, descripcion, precio, cantidad) values(?,?,?,?)', [nombre, descripcion, precio, cantidad], (error, registro)=>{
            if(error){
                rechazada(error)
            }
            resuelta(registro.insertId)
        })
})
}


async function RegistrarImagenes(productoId, imagenes) {
    return new Promise((resuelta, rechazada)=>{
        //crear constantes para dar un orden al registro de las imagenes
        const tipos = ['primera','segunda','tercera']
        const valores = []

        for(let i = 0; i < Math.min(imagenes.length, 3); i++){
            valores.push([productoId, imagenes[i].ruta,tipos[i],i])
        }
        conectar.query('INSERT INTO imagenes_producto (producto_id, ruta_img, tipo, orden) VALUES ?', [valores], (error)=>{
            if(error){
                rechazada(error)
            }
            resuelta()
        })
    })
}

//metodo para eliminar un producto
async function eliminarProducto(id){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('DELETE FROM productos WHERE id = ?', [id], (error, resultados)=>{
            if(error){
                rechazada(error)
            }
            resuelta(resultados)
        })
    })
}



//metodo para actualizar un producto
async function actualizarProducto(id,nombre, descripcion, precio, cantidad){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?', [nombre, descripcion, precio, cantidad, id], (error, resultados)=>{
            if(error){
                rechazada(error)
            }
            resuelta(resultados)
        })
    })
}

//metodo para exportar los metodos
module.exports = {
    consultarProducto,
    consultarProductoPorNombre,
    registrarProducto,
    eliminarProducto,
    actualizarProducto,
    RegistrarImagenes
}    