import { UserData } from "./UserData";
import { TypeUser } from "../utils/TypeUser";

export class UserEmpresa extends UserData{
    fechaNacimiento: Date;
    alergias: string;

    constructor();
    constructor(user: UserData); 
    constructor(user?: any) {
        super();    
        this.gmail = user && user.gmail || "";
        this.nombre = user && user.nombre || "";
        this.apellidos = user && user.apellidos || "";
        this.telefono = user && user.telefono || "";
        this.direccion = user && user.direccion || "";
        this.foto = user && user.foto || "";
        this.pass = user && user.pass || "";
        this.tipoUsuario = TypeUser.Normal;
    }   
}