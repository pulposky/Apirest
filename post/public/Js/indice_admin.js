import { rutamenu } from "./Scripts/scripts.js"

document.querySelectorAll('.item_menu').forEach(buttom =>{
    buttom.addEventListener('click', function(e){
        e.preventDefault()

        let rutaUrl = this.dataset.value
        console.log(rutaUrl)
        rutamenu(rutaUrl)
    })
})