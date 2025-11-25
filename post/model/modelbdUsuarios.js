//metodos de consulta a la base de datos de productos

const conectar = require('../database/conexion')

//metodo para obtener los productos


//metodo para obtener todos los productos
async function consultausuario(){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('SELECT * FROM usuarios', (error, registros)=>{
            if(error){
                rechazada(error)
            }
            resuelta(registros)
        })
})
}

//metodo para obtener producto por nombre
async function consultarUsuarioPorNombre(nombreusu){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('SELECT * FROM usuarios WHERE nombreusu = ?', [nombreusu], (error, registros)=>{
            if(error){
                rechazada(error)
            }
            resuelta(registros)
        })
})
}

//metodo para registrar un nuevo producto
async function registrarUsuario(nombres, nombreusu, password, correo, telefono, rol){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('INSERT INTO usuarios (nombres, nombreusu, password, correo, telefono, rol) values(?,?,?,?,?,?)', [nombres,nombreusu, password, correo, telefono, rol], (error, resultados)=>{
            if(error){
                rechazada(error)
            }
            resuelta(resultados)
        })
})
}


//metodo para eliminar un producto
async function eliminarUsuario(id){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('DELETE FROM usuarios WHERE id = ?', [id], (error, resultados)=>{
            if(error){
                rechazada(error)
            }
            resuelta(resultados)
        })
    })
}



//metodo para actualizar un producto
async function actualizarUsuario(id,nombres,nombreusu, correo, rol){
    return new Promise((resuelta, rechazada)=>{
        conectar.query('UPDATE usuarios SET nombres = ?, nombreusu= ?, correo = ?, rol = ? WHERE id = ?', [nombres,nombreusu, correo, rol, id], (error, resultados)=>{
            if(error){
                rechazada(error)
            }
            resuelta(resultados)
        })
    })
}

//metodo para exportar los metodos
module.exports = {
    consultausuario,
    consultarUsuarioPorNombre,
    registrarUsuario,
    eliminarUsuario,
    actualizarUsuario
}    