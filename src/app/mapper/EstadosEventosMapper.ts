import { EstadoEvento } from "../model/EstadoEvento";

export class EstadosEventosMapper {
    public static estadosEventoJSONToEstadoEvento(estadosJSON): EstadoEvento[]{
            
        let estados: EstadoEvento[] = [];

        estadosJSON.forEach((esta) => {
            let estado: EstadoEvento = new EstadoEvento();
            estado.idEstado = esta.IdEstado;
            estado.codigo = esta.Codigo;
            estado.descripcion = esta.Descripcion;
            estados.push(estado);
        });

        return estados;
    }
}