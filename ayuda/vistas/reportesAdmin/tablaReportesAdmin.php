<?php
    session_start();
    include "../../clases/Conexion.php";
    $con = new Conexion();
    $conexion = $con->conectar();
    $idUsuario = $_SESSION['usuario']['id'];
    $contador = 1;
    $sql = "SELECT 
            reporte.id_reporte as idReporte,
            reporte.id_usuario as idUsuario,
            concat(persona.paterno,
            ' ',
            persona.materno,
            ' ',
            persona.nombre) as nombrePersona,
            equipo.id_equipo as idEquipo,
            equipo.nombre as nombreEquipo,
            reporte.descripcion_problema as problema,
            reporte.estatus as estatus,
            reporte.solucion_problema as solucion,
            reporte.fecha as fecha
        FROM
            t_reportes AS reporte
                INNER JOIN
            t_usuarios AS usuario ON reporte.id_usuario = usuario.id_usuario
                INNER JOIN
            t_persona AS persona ON usuario.id_persona = persona.id_persona
            inner join 
            t_cat_equipo as equipo on reporte.id_equipo = equipo.id_equipo
            ORDER BY reporte.fecha DESC";
    $respuesta = mysqli_query($conexion,$sql);
?>
<table class="table table-sm table-bordered dt-responsive nowrap" 
                style="width:100%" id="tablaReportesAdminDataTable">
    <thead>
        <tr>
            <th>#</th>
            <th>Persona</th>
            <th>Dispositivo</th>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Estatus</th>
            <th>Solucion</th>
            <th>Eliminar</th>
            </tr>   
    </thead>
    <tbody>
        <?php
            while($mostrar = mysqli_fetch_array($respuesta)){
        ?>
        <tr>
            <td><?php echo $contador++ ?></td>
            <td><?php echo $mostrar['nombrePersona']; ?></td>
            <td><?php echo $mostrar['nombreEquipo']; ?></td>
            <td><?php echo $mostrar['fecha']; ?></td>
            <td><?php echo $mostrar['problema']; ?></td>
            <td>
                <?php 
                    $estatus = $mostrar['estatus'];  
                    $cadenaEstatus = '<span class="badge badge-danger">Abierto</span>';
                    if($estatus == 0){
                        $cadenaEstatus = '<span class="badge badge-success">Cerrado</span>';
                    }
                    echo $cadenaEstatus;
                ?>
            </td>
            <td>
                <button class="btn btn-info btn-sm"
                      onclick="obtenerDatosSolucion('<?php echo $mostrar['idReporte']; ?>' )"
                      data-toggle="modal" data-target="#modalAgragarSolucionReporte">
                    Solucion
                </button>
            <?php echo $mostrar['solucion'];?>
        </td>
            <td>
                <?php
                    if($mostrar['solucion'] == ""){
                ?>
                <button class="btn btn-danger btn-sm" 
                    onclick="eliminarReporteAdmin(<?php echo $mostrar['idReporte']; ?>)"> 
                    Eliminar
                </button>
                <?php
                    }
                ?>
            </td>
        </tr>
        <?php } ?>
    </tbody>
</table>
<script>
$(document).ready(function() {
    $('#tablaReportesAdminDataTable').DataTable();
    
});
</script>