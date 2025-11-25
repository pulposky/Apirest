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
    return new Promise((resuelta, rechazada)=>{
        conectar.query('SELECT * FROM productos p JOIN imagenes_producto i ON p.id = i.producto_id WHERE nombre = ?', [nombre], (error, registros)=>{
            if(error){
                rechazada(error)
            }
            resuelta(registros)
        })


// JOIN clientes c ON p.cliente_id = c.cliente_id
// WHERE c.nombre = 'Juan Perez'
// ORDER BY p.fecha ASC, p.pedido_id ASC;
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