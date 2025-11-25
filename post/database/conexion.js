//Conexion a la base de datos


//importamos modulo de mysql2
const mysql = require('mysql2')
const dotenv =  require('dotenv')
dotenv.config()

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DB_NAME

//creamos la conexion a la base de datos
const conexion = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
})



///exportamos la conexion
module.exports = conexion