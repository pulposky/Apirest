//Login Post
export async function loginpost(datosJson) {
    const urllogin = '/usuarios/login'

    const config ={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosJson)
    }

    try{

    let respuesta = await fetch(urllogin, config)
    console.log(respuesta)
    let valores = await respuesta.json()
    console.log(valores) 

    if(!respuesta.ok){
        alert('Credenciales Incorrectas')
        return
    }

    let usuario = valores.nombreus
    let token = valores.token

    console.log(usuario, token)
    sessionStorage.setItem(usuario, token)


    document.cookie = `token=${token}; path=/`

    if(valores.rol === 'administrador'){
        window.location = '/indice_admin'
    }else{
        window.location = '/indice'
    }

    }catch(error){
        alert('Error en la conexion')
        console.error('Error', error)
    } 


}

document.querySelectorAll('.item_menu').forEach(buttom =>{
    buttom.addEventListener('click', function(e){
        e.preventDefault()

        let rutaUrl = this.dataset.value
        console.log(rutaUrl)
        rutamenu(rutaUrl)
    })
})


export async function rutamenu(rutaUrl){

//    const url = '/rutas'

    // const config = {
    //     method: 'POST',
    //     headers:{
    //         'Content-Type' : 'application/json',
    //     },
    //     body: JSON.stringify({'ruta': rutaUrl})
    // }

    // let respuesta = await fetch(url, config)

    // let valores = await respuesta.json()

    // console.log(valores)

    // window.location.href = valores.ruta

    
const rutas = { // Mapa de nombres lógicos a rutas de navegación
    //User
    'consultar':'/consultar',
    'registrar':'/registrar',
    'eliminar':'/eliminar',
    'actualizar':'/actualizar',
    'registroUsu':'/registroUsu',
    'indice':'/indice',
    'login':'/',
    'noAutenticado':'/noAutenticado',
    'listar':'/listar',
    //Admin
    'consultarUsu':'/consultarUsu',
    'eliminarUsu':'/eliminarUsu',
    'actualizarUsu':'/actualizarUsu',
    'indice_admin':'/indice_admin'
}
    if(rutas[rutaUrl]){
        window.location.href = rutas[rutaUrl]
    }else{
        console.error('Ruta no encontrada')
    }
}



//Consultar Productos
let exito = document.getElementById('exito') 
let error = document.getElementById('error') 

export async function pedirDatos(dato1){ // Función asincrónica que realiza la petición al servidor

    const url = `/productos/consultar/${dato1}` // Construye la URL de la API para consultar el producto por id o nombre

    try{ // Intento de petición y parseo
        const respuesta = await fetch(url, { credentials: 'same-origin' }) // Realiza la petición HTTP GET incluyendo cookies
        const datos = await respuesta.json() // Parsea la respuesta JSON del servidor

        // Si el campo de búsqueda está vacío (revisamos el value) -> error
        if (!dato1 || !dato1.trim()) {
            mostrarError()
            return
        }

        // Si la respuesta no es OK -> mostrar error y salir
        if(!respuesta.ok){
            mostrarError()
            return
        }

        // Respuesta OK y campo válido: mostrar datos y mensaje de éxito
        mostrarDatos(datos)
        exito.textContent = 'READY'
        error.textContent = ''
    
    }catch(error){
        mostrarError() 
    }

} 

function mostrarDatos(datos){ 

    console.log(datos)

    const producto = Array.isArray(datos) ? datos[0] : datos // Maneja el caso si datos es un array o un objeto

    let id = document.getElementById('idp'), 
        nombre = document.getElementById('nombrep'), 
        descripcion = document.getElementById('descripcionp'), 
        cantidad = document.getElementById('cantidadp'), 
        precio = document.getElementById('preciop')


    id.textContent = producto.id 
    nombre.textContent = producto.nombre 
    descripcion.textContent = producto.descripcion 
    cantidad.textContent = producto.cantidad 
    precio.textContent = producto.precio    
    
    // limpiar imágenes previas
    let imagenes = document.getElementById('imagenes') 
    if (imagenes) {
        imagenes.innerHTML = ''
        
        // Si datos es un array (resultado del JOIN con imagenes_producto), iterar sobre todas las filas
        if (Array.isArray(datos) && datos.length > 0) {
            datos.forEach(fila => {
                // cada fila tiene ruta_img con la ruta de la imagen
                if (fila.ruta_img) {
                    let img = document.createElement('img')
                    img.src = fila.ruta_img // La ruta ya viene completa desde la BD
                    img.width = 100
                    img.style.marginRight = '5px'
                    imagenes.appendChild(img)
                    console.log('Imagen añadida:', fila.ruta_img)
                }
            })
        }
    }
} 


function mostrarError(){ 
    exito.textContent = '' 
    error.textContent = 'Producto no encontrado' 
}









//eliminacion de productos
export async function pedirDatosEliminar(dato1){
    let url = `/productos/consultar/${dato1}`

    let respuesta = await fetch(url)

    let datos = await respuesta.json()


    const producto = Array.isArray(datos) ? datos[0] : datos // Maneja el caso si datos es un array o un objeto

    let id = document.getElementById('idp'), 
        nombre = document.getElementById('nombrep'), 
        descripcion = document.getElementById('descripcionp'), 
        cantidad = document.getElementById('cantidadp'), 
        precio = document.getElementById('preciop') 

    id.textContent = producto.id 
    nombre.textContent = producto.nombre
    console.log(producto) 
    descripcion.textContent = producto.descripcion 
    cantidad.textContent = producto.cantidad 
    precio.textContent = producto.precio 

    let btndel = document.getElementById('btndel')

    let botondel = document.createElement('button')
    botondel.setAttribute('class', 'btn')
    botondel.textContent = 'eliminar'
    btndel.appendChild(botondel)
    
        botondel.addEventListener('click', function() {
            botondel.disabled = true
            confirmar()
        })
}


//generacion del evento de eliminacion
    function confirmar(){

        let confirmar = document.getElementById('confirmar')

        btndel.removeEventListener('click', confirmar)
        let contenconfirm = document.createElement('td')
        contenconfirm.setAttribute('class', 'eliminar')

        contenconfirm.textContent = 'Seguro?'

        confirmar.appendChild(contenconfirm)

        let botonremover = document.createElement('button')
        botonremover.setAttribute('class', 'remover')
        botonremover.addEventListener('click', eliminardatos)

        let botoncancelar = document.createElement('button')
        botoncancelar.setAttribute('class', 'cancelar')
        botoncancelar.addEventListener('click', cancelarEliminacion)

        contenconfirm.appendChild(botonremover)
        botonremover.textContent = 'Si'
        contenconfirm.appendChild(botoncancelar)
        botoncancelar.textContent = 'No'
        
    }
//confirmacion por si

export async function eliminardatos(){
    // console.log('cancelado')

    let dato = document.getElementById('idp').textContent

    let url = `/productos/eliminar/${dato}`

    let config = {
        method : 'DELETE',
        headers : {
            'Content-Type':'application/json'
        }
    }
    try{
        let peticion = await fetch(url, config)

        if(!peticion.ok){
            throw new Error('Error')
        }

        let valores = await peticion.json()

        alert('Eliminado')
        location.reload()

    }catch(error){
        console.log('Error')
    }
    
}

//confirmacion por no

function cancelarEliminacion(){
    alert('Se cancelo la eliminacion')
    location.reload()
}






//Registro de productos
export async function registroproducto() {

    let form = document.getElementById('contenedor')
    let datos = new FormData(form)

    const urlpeticion = '/productos/registrar'
    const config = {
        method: 'POST',
        body: datos
    }

    let peticion =  await fetch(urlpeticion, config)
    let values = await peticion.json()
    alert('Producto registrado')
    document.getElementById('boton2')
    document.getElementById('contenedor').reset()
    console.log(`Respuesta desde el servidor, ${values}`)
}

















export async function registrousuario() {

    let form = document.getElementById('registrarse')

    let datos = new FormData(form)

    let datosJson = Object.fromEntries(datos.entries())

    const urlpeticion = '/usuarios/registroUsu'

    const config = {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(datosJson)
    }

    console.log(urlpeticion)
    console.log(config)
    console.log(datos)

    let peticion =  await fetch(urlpeticion, config)

    let values = await peticion.json()

    alert('Usuario registrado')

    document.getElementById('registrarse').reset()

    console.log(`Respuesta desde el servidor, ${values}`)
}




















export async function pedirDatosA(dato1){

    const url = `/productos/consultar/${dato1}`


    try{
        const respuesta = await fetch(url)
        const datos = await respuesta.json()

        if(!respuesta.ok){
            mostrarErrorA()
            mostrarDatosA(datos)
            document.getElementById('contenedor').reset()
        }else{
            mostrarDatosA(datos)
                exito.textContent = 'READY'
                error.textContent = ''
        }
    


    }catch(error){
        mostrarErrorA()
    }

}

function mostrarDatosA(datos){


        const producto = Array.isArray(datos) ? datos[0] : datos // Maneja el caso si datos es un array o un objeto

    let id = document.getElementById('idp'), 
        nombre = document.getElementById('nombrep'), 
        descripcion = document.getElementById('descripcionp'), 
        cantidad = document.getElementById('cantidadp'), 
        precio = document.getElementById('preciop') 

    id.value = producto.id
    id.readOnly = true
    nombre.value = producto.nombre 
    descripcion.value = producto.descripcion 
    cantidad.value = producto.cantidad 
    precio.value = producto.precio 
}


function mostrarErrorA(){
    exito.textContent = ''
    error.textContent = 'Producto no encontrado'
}

export async function actualizarDatos(){

    let id = document.getElementById('idp').value
    let nombre = document.getElementById('nombrep').value
    let descripcion = document.getElementById('descripcionp').value
    let cantidad = document.getElementById('cantidadp').value
    let precio = document.getElementById('preciop').value

    const datos = {
        nombre: nombre,
        descripcion: descripcion,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio)
    };

    const url = `/productos/actualizar/${id}`
    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    try{
        const respuesta = await fetch(url, config)
        const datosRespuesta = await respuesta.json()

        if(!respuesta.ok){
            mostrarErrorA();
            document.getElementById('contenedor').reset()
        }else{
            exito.textContent = 'Producto actualizado'
            error.textContent = ''
            setTimeout(() => {
                document.getElementById('contenedor').reset()
                document.getElementById('dato1').value = ''
            }, 1000)
        }

    }catch(error){
        mostrarErrorA()
    }
}









//Eliminacion de usuarios
export async function eliminardatosU(){
    // console.log('cancelado')

    let dato = document.getElementById('idu').textContent

    let url = `/usuarios/eliminarUsu/${dato}`

    let config = {
        method : 'DELETE',
        headers : {
            'Content-Type':'application/json'
        }
    }
    try{
        let peticion = await fetch(url, config)

        if(!peticion.ok){
            throw new Error('Error')
        }

        let valores = await peticion.json()

        alert('Eliminado')
        location.reload()

    }catch(error){
        console.log('Error')
    }
    
}


function confirmaru(){

        let confirmar = document.getElementById('confirmar')

        btndel.removeEventListener('click', confirmar)
        let contenconfirm = document.createElement('td')
        contenconfirm.setAttribute('class', 'eliminar')

        contenconfirm.textContent = 'Seguro?'

        confirmar.appendChild(contenconfirm)

        let botonremover = document.createElement('button')
        botonremover.setAttribute('class', 'remover')
        botonremover.addEventListener('click', eliminardatosU)

        let botoncancelar = document.createElement('button')
        botoncancelar.setAttribute('class', 'cancelar')
        botoncancelar.addEventListener('click', cancelarEliminacion)

        contenconfirm.appendChild(botonremover)
        botonremover.textContent = 'Si'
        contenconfirm.appendChild(botoncancelar)
        botoncancelar.textContent = 'No'
        
    }

//consultar usuarios desde la base de datos
export async function pedirDatosUsuario(dato1){
    let url = `/usuarios/consultarUsu/${dato1}`

    let respuesta = await fetch(url)
    let datos = await respuesta.json()

    const usuarios = Array.isArray(datos) ? datos[0] : datos

    let id = document.getElementById('idu'),
        nombre = document.getElementById('nombreu'),
        usuario = document.getElementById('usuariou'),
        correo = document.getElementById('correou'),
        rol = document.getElementById('rolu')

    id.textContent = usuarios.id || ''
    nombre.textContent = usuarios.nombres || ''
    usuario.textContent = usuarios.nombreusu || ''
    correo.textContent = usuarios.correo || ''
    rol.textContent = usuarios.rol || ''

    let btndel = document.getElementById('btndel')
    let botondel = document.createElement('button')
    botondel.setAttribute('class', 'btn')
    botondel.textContent = 'eliminar'
    btndel.appendChild(botondel)

    botondel.addEventListener('click', function() {
        botondel.disabled = true
        confirmaru()
    })
}








//actualizar productos desde la base de datos
export async function pedirDatosU(dato1){

    const url = `/usuarios/consultarUsu/${dato1}`


    try{
        const respuesta = await fetch(url)
        const datos = await respuesta.json()
        
        console.log(respuesta)
        console.log(datos)

        if(!respuesta.ok){
            mostrarError()
            mostrarDatosu(datos)
            document.getElementById('contenedor').reset()
        }else{
            mostrarDatosu(datos)
                exito.textContent = 'READY'
                error.textContent = ''
        }
    


    }catch(error){
        mostrarError()
    }

}


function mostrarDatosu(datos) {

    const usuario= Array.isArray(datos) ? datos[0] : datos


    document.getElementById('idu').value = usuario.id || '';
    document.getElementById('nombreu').value = usuario.nombres || '';
    document.getElementById('usuariou').value = usuario.nombreusu || '';
    document.getElementById('correou').value = usuario.correo || ''
    document.getElementById('rolu').value = usuario.rol || ''
    
    document.getElementById('idu').readOnly = true;
}



function mostrarErrorU(){
    exito.textContent = ''
    error.textContent = 'Usuario no actualizado'
}

export async function actualizarDatosU(){

    let id = document.getElementById('idu').value;
    let nombreu = document.getElementById('nombreu').value;
    let usuariou = document.getElementById('usuariou').value;
    let correou = document.getElementById('correou').value;
    let rolu = document.getElementById('rolu').value;

    const datos = {
        nombres: nombreu,
        nombreusu: usuariou,
        correo: correou,
        rol: rolu
    };

    const url = `/usuarios/actualizarUsu/${id}`
    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }

    try{

        
        const respuesta = await fetch(url, config)
        const datosRespuesta = await respuesta.json()

        if(!respuesta.ok){
            mostrarErrorU();
            document.getElementById('contenedor').reset()
        }else{
            exito.textContent = 'Usuario actualizado'
            error.textContent = ''
            setTimeout(() => {
                document.getElementById('contenedor').reset()
                document.getElementById('contenedor2').value = ''
            }, 1000)
        }

    }catch(error){
        mostrarErrorU()
    }
}

