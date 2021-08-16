$(document).ready(function(){
    $('#tablaReporteAdminLoad').load('reportesAdmin/tablaReportesAdmin.php');

});
function eliminarReporteAdmin(idReporte){
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "una vez eliminado no podra ser recuperado!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff1a00',
        cancelButtonColor: '#00286d',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type:"POST",
                data:"idReporte=" + idReporte,
                url:"../procesos/reportesAdmin/eliminarReporteAdmin.php",
                success:function(respuesta){
                    if(respuesta == 1){
                        $('#tablaReporteAdminLoad').load('reportesAdmin/tablaReporteAdmin.php');
                        Swal.fire(":D","Eliminado con exito ","success")
                    }else{
                        Swal.fire(":(","Fallo al eliminar "+ respuesta,"error")
                    }
                }
            });
        }
    })

return false;
}

function obtenerDatosSolucion(idReporte){
    $.ajax({
        type:"POST",
        data:"idReporte="+ idReporte,
        url:"../procesos/reportesAdmin/obtenerSolucion.php",
        success:function(respuesta){    
            respuesta = jQuery.parseJSON(respuesta);
             $('#idReporte').val(respuesta['idReporte']);
             $('#solucion').val(respuesta['solucion']);
             $('#estatus').val(respuesta['estatus']);
        }
    });
    return false;
}
function agregarSolucionReporte(){
    $.ajax({
        type:"POST",
        data:$('#frmAgregarSolucionReporte').serialize(),
        url:"../procesos/reportesAdmin/actualizarSolucion.php",
        success:function(respuesta){
            respuesta = respuesta.trim();
            if (respuesta == 1) {
                Swal.fire(":O","Agregado con exito!","success");
                $('#tablaReporteAdminLoad').load('reportesAdmin/tablaReportesAdmin.php');
            }else{
                Swal.fire(":X","Fallo al Agregar!" + respuesta,"success");
            }
        }
    });
    return false;

}


