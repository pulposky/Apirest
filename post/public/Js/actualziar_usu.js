
import {pedirDatosU, actualizarDatosU} from './Scripts/scripts.js'

document.getElementById('consulta').addEventListener('click', (e)=>{
    e.preventDefault()
    let dato1 = document.getElementById('dato1').value
    if (!dato1){
        alert('No deje campos vacios')
        return
    } 
    pedirDatosU(dato1)
})

document.getElementById('actualizar').addEventListener('click', (e)=>{

    e.preventDefault();
    actualizarDatosU();
})