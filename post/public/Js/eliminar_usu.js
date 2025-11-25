//capturar boton 
import {pedirDatosUsuario, eliminardatosU} from './Scripts/scripts.js'

document.getElementById('consulta').addEventListener('click', (e) =>{
    e.preventDefault()

    let dato1 = document.getElementById('dato1').value
    if (!dato1) {
        alert('No deje el campo vacío')
        return
    }

    // Deshabilitar el boton de consultar despues de la primera vez
    const btnConsulta = document.getElementById('consulta')
    btnConsulta.disabled = true
    pedirDatosUsuario(dato1)
})