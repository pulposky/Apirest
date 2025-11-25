const capital = (req, resp, next) =>{
    let texto = req.params.nombre

    texto = texto.toLowerCase()

    texto = texto.charAt(0).toUpperCase() + texto.slice(1)

    resp.locals.textoValido = texto

    next()
}


module.exports = capital