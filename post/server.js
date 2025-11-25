
console.clear() 

// importar modulos necesarios para implementacion
const express = require('express') // Framework web Express
const path = require('path') // Utilidades de rutas del sistema de archivos
const fs = require('fs') // Módulo para operaciones de sistema de archivos
const cors = require('cors')

const anticache = require('./middlewares/anticache') // Middleware para deshabilitar caché


const rutaApp = require('./routes/admin_router') // Router principal que agrupa rutas de la app
const dotenv = require('dotenv') // Cargador de variables de entorno desde .env
const cookies = require('cookie-parser') // Middleware para parsear cookies
// configuracion de variables de entorno

dotenv.config() // Carga variables de entorno en process.env
const app = express() // Crea la aplicación Express

//configuracion del puerto motor de plantillas

app.set('view engine', 'ejs') // Establece EJS como motor de plantillas

//establecemos ruta por defecto para las plantillas
app.set('views', __dirname + '/public/Views') // Define la carpeta de vistas
//establecemos ruta por defecto para las plantillas admin

//app.set('views', __dirname + '/public/Admin/Views') // Define la carpeta de vistas
const puerto = process.env.PUERTO // Lee el puerto desde variables de entorno

app.use(express.json()) // Permite parsear cuerpos JSON en las peticiones
app.use(express.text()) // Permite parsear cuerpos como texto plano
app.use(cors()) // Habilita CORS con configuración por defecto
app.use(express.static('public')) // Sirve archivos estáticos desde la carpeta 'public'
app.use(cookies()) // Habilita el parsing de cookies en req.cookies
app.use(rutaApp) // Monta el router principal con las rutas de la aplicación
app.use(anticache) // Deshabilita el caché para todas las respuestas


// ruta absoluta
global._basedir = __dirname // Define una variable global con la ruta base del proyecto

app.listen(puerto, ()=>{ // Inicia el servidor en el puerto configurado
        console.log(`Servidor en funcionamiento http://localhost:${puerto}`) 
})