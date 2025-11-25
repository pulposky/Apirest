document.getElementById('consulta').addEventListener('click', (e)=>{
    e.preventDefault()

    let dato1 = document.getElementById('dato1').value

    pedirDatos(dato1)
})

let exito = document.getElementById('exito')
let error = document.getElementById('error')

async function pedirDatos(dato1){

    const url = `/usuarios/consultarUsu/${dato1}`

    try{
        const respuesta = await fetch(url)
        const datos = await respuesta.json()

        console.log(respuesta)
        console.log(datos)

        if(!respuesta.ok || document.getElementById('dato1').value === ''){ 
            console.log(respuesta)
            console.log(dato1)
            mostrarError()
            mostrarDatos(datos)
        }else{
            mostrarDatos(datos)
                exito.textContent = 'READY'
                error.textContent = ''
        }
    
    }catch(error){
        mostrarError()
    }

}

function mostrarDatos(datos) {

    const usuario= Array.isArray(datos) ? datos[0] : datos


    document.getElementById('idu').textContent = usuario.id || '';
    document.getElementById('nombreu').textContent = usuario.nombres || '';
    document.getElementById('usuariou').textContent = usuario.nombreusu || '';
    document.getElementById('correou').textContent = usuario.correo || ''
    document.getElementById('rolu').textContent = usuario.rol || ''

    // let fotoperfil = document.getElementById('fotou')
    // let fotou = document.createElement('img')
    // let fotoruta = datos.foto
    // console.log(fotoruta)

    // if (fotoruta) {
    //     fotoruta = fotoruta.replace(/\\/g,'/')
    //     fotoruta = fotoruta.replace('public/','../')
    //     fotou.src = fotoruta
    //     fotoperfil.appendChild(fotou)
    // }
}


function mostrarError(){
    exito.textContent = ''
    error.textContent = 'Usuario no encontrado'
}