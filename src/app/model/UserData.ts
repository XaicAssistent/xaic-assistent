import { TypeUser } from "../utils/TypeUser";

export class UserData{
    idUser: string;
    token: string;
    gmail: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    premium: boolean;
    direccion: string;
    latitud: string;
    longitud: string;
    foto: string;
    tipoUsuario: TypeUser;
    pass: string;

    constructor(){
    }
}