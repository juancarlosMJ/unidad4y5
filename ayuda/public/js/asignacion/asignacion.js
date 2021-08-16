
$(document).ready(function(){
    $('#tablaAsignacionesLoad').load('asignacion/tablaAsignacion.php');
});
function asignarEquipo(){
    $.ajax({
        type:"POST",
        data:$('#frmAsignaEquipo').serialize(),
        url:"../procesos/asignacion/asignar.php",
        success:function(respuesta) {
            respuesta = respuesta.trim();
            if (respuesta == 1) {
                $('#frmAsignaEquipo')[0].reset();
                $('#tablaAsignacionesLoad').load('asignacion/tablaAsignacion.php');
                swal.fire(":)","Agregado La Asignacion","success");
                
            }else{
                swal.fire(":O","Fallo la Asignacion" + respuesta,"error");
            }

        }
    });
    return false;
}

    function eliminarAsignacion(idAsignacion){
        Swal.fire({
            title: 'Estas seguro de eliminar este registro?',
            text: "Una vez eliminado no podra ser recuperado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type:"POST",
                    data:"idAsignacion=" + idAsignacion,
                    url:"../procesos/asignacion/eliminarAsignacion.php",
                    success:function(respuesta){
                        if (respuesta == 1) {
                            $('#tablaAsignacionesLoad').load('asignacion/tablaAsignacion.php');
                            swal.fire(":)","Eliminado Con Exito","success");
                        }else{
                            swal.fire(":O","Fallo al eliminacion" + respuesta,"error");
                        }
                    }
                });
            
            }
        })
        return false;
    }

    