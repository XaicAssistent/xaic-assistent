import { UserNormal } from "./UserNormal";
import { UserEmpresa } from "./UserEmpresa";
import { UserData } from "./UserData";
import { Periodo } from "./Perido";
import { EstadoEvento } from "./EstadoEvento";

export class Event{
    idEvento: number;
    userEmpresa: UserEmpresa = new UserEmpresa();
    user: UserData;
    titulo: string;
    descripcion: string;
    fecha: Date;
    location: string;
    periodo: Periodo = new Periodo();
    estado: EstadoEvento = new EstadoEvento();
    motivoCancelacion: string;

    constructor(){
    }
}