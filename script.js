$(document).ready(function(){
    let formulario = $('form');

    
    formulario.on('submit', function(event){
        event.preventDefault();
        console.log('funciona');
    })
})