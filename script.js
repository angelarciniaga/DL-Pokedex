$(document).ready(function(){
    $('#respuesta').empty();
    let formulario = $('.formulario'); 
    let nombrePoke = $('#nombrePoke').val() || 'pikachu';
    let patronLetras = /^[a-z ,.'-]+$/gim;
    console.log(nombrePoke);
    consulta(nombrePoke);

    formulario.on('submit', function(event){
        event.preventDefault();
        $('#resultado').empty();
        nombrePoke = $('#nombrePoke').val();
        console.log(nombrePoke);
        consulta(nombrePoke);
    });

    function consulta(nombrePoke){
        if (nombrePoke && patronLetras.test(nombrePoke)){
            $.ajax({
                dataType: 'jason',
                type: 'get',
                url: 'https://pokeapi.co/api/v2/pokemon/' + nombrePoke,
                success: function(response){
                    console.log(response);
                    $('#resultado').html(`
                        <div class='text-center'>
                            <h3>Nombre: ${response.name}</h3>
                            <img src='${response.sprites.front_default}' alt='${response.name}'>
                        </div>
                    `);
                    let resultado =`
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Potenciado 1</th>
                                    <th>Potenciador 2</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    response.held_items.forEach(element =>{
                        console.log(element.held_items.name);
                        resultado += `
                            <tr>
                                <th>${element[0].name}</th>
                                <th>${element[1].name}</th>
                            </tr>
                        `;
                    });
                    resultado += `
                        </tbody>
                        </table>
                    `;
                    $('#resultado').append(resultado);
                },
                error: function(error) {
                    console.error(error);
                }
            });
            
        }else {
            alert('Ingrese un nombre valido');
        }

    }
})








