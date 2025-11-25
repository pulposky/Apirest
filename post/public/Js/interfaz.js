// Seleccion del contenedor principal
const container = document.getElementById('contenedor')

// Elementos de datos personales
// const id = document.createElement('input')
// id.setAttribute('class','cuadro')
// id.setAttribute('id','id')
// id.setAttribute('name','id')

const nombre = document.createElement('input')
nombre.setAttribute('class','cuadro')
nombre.setAttribute('id','nombre')
nombre.setAttribute('name','nombre')

const descripcion = document.createElement('input')
descripcion.setAttribute('class','cuadro')
descripcion.setAttribute('id','descripcion')
descripcion.setAttribute('name','descripcion')

const cantidad = document.createElement('input')
cantidad.setAttribute('class','cuadro')
cantidad.setAttribute('id','cantidad')
cantidad.setAttribute('name','cantidad')

const precio  = document.createElement('input')
precio.setAttribute('class','cuadro')
precio.setAttribute('id','precio')
precio.setAttribute('name','precio')

const foto = document.createElement('input')
foto.setAttribute('class','cuadro')
foto.setAttribute('id','imagenesp')
foto.setAttribute('name','imagenesp')
foto.setAttribute('type','file')
foto.setAttribute('multiple',true)
foto.setAttribute('enctype','multipart/form-data')

// Campos de texto
const camposTexto = document.createElement('h5')
camposTexto.setAttribute('class','camposTexto')
camposTexto.textContent = 'Producto'

const camposTexto3 = document.createElement('h5')
camposTexto3.setAttribute('class','camposTexto3')
camposTexto3.textContent = 'Informacion'



// Boton

const boton = document.createElement('button')
boton.setAttribute('class', 'boton')
boton.setAttribute('id','boton')
boton.textContent = 'Enviar'

const eliminar = document.createElement('button')
eliminar.setAttribute('class', 'boton')
eliminar.setAttribute('id', 'boton2')
eliminar.textContent = 'Limpiar'



// Style de los elementos

camposTexto.style.color = 'white'
camposTexto3.style.color = 'white'


// Atributos de los elementos
// id.setAttribute('placeholder','id')
// id.setAttribute('type','text')
// id.readOnly = true
// id.disabled = true

nombre.setAttribute('placeholder','nombre')
nombre.setAttribute('type','text')

descripcion.setAttribute('placeholder','descripcion')
descripcion.setAttribute('type','text ')

cantidad.setAttribute('placeholder','cantidad')
cantidad.setAttribute('type','text')


precio.setAttribute('placeholder','precio')
precio.setAttribute('type','text')


// Mostrar los elementos al contenedor
container.appendChild(camposTexto)
// container.appendChild(id)
container.appendChild(nombre)
container.appendChild(camposTexto3)
container.appendChild(descripcion)
container.appendChild(precio)
container.appendChild(cantidad)
container.appendChild(foto)
container.appendChild(boton)
container.appendChild(eliminar)
