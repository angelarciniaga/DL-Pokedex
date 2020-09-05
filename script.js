$(document).ready(function(){
    let formulario = $('.formulario'); 
    
    formulario.on('submit', function(event){
        event.preventDefault();
        let nombrePoke = $('#nombrePoke').val();
        let patronLetras = /^[a-z ,.'-]+$/gim;
        console.log(nombrePoke);
        
        if (nombrePoke && patronLetras.test(nombrePoke)=== true){
            $.ajax({
                type: 'get',
                url: 'https://pokeapi.co/api/v2/pokemon/' + nombrePoke,
                success: function(response){
                    console.log(response);
                    $('#resultado').html(`
                    <div class="card container" style="width: 20rem;">
                        <img src="${response.sprites.front_default}" class="card-img-top" alt="${response.name}">
                            <div class="card-body text-center">
                                <h3 class="text-light">Nombre: ${response.name}<h3>
                                <h3 class="card-text text-light">Experiencia: ${response.base_experience}</h3>
                            </div>
                        </div>
                    `);

                    let datosXY = [];
                    response.stats.forEach(element => {
                        console.log(element.base_stat);//y
                        console.log(element.stat.name);//label
                        datosXY.push(
                            {
                                label: element.stat.name, 
                                y:element.base_stat
                            });
                    });

                    var options = {
                        title: {
                            text: `Estadísticas de ${response.name}`              
                        },
                        data: [              
                            {
                                type: "column",
                                dataPoints: datosXY
                            }
                        ]
                    };
                
                    $('#chartContainer').CanvasJSChart(options);
                
                },
                error: function(error) {
                    $('.alert-danger').toggle();
                    console.error(error);
                }
            });
                
        }else {
            $('.alert-warning').toggle();

        }
    
    });

});