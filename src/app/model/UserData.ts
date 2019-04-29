import { Periodo } from "./Perido";

export class UserData{
    idUser: string;
    token: string;
    gmail: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    premium: boolean;
    direccion: string;
    foto: string;
    tipoUsuario: TypeUser;
    pass: string;
    periodos: Periodo[];

    constructor(){

    }
}