import { UserData } from "./UserData";
import { Category } from "./Category";
import { Periodo } from "./Perido";
import { TypeUser } from "../utils/TypeUser";

export class UserEmpresa extends UserData{
    idUserEmprea: number;
    direccionFija: boolean;
    fotosEmpresa: string[];
    category: Category = new Category();
    periodos: Periodo[];

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
        this.tipoUsuario = TypeUser.Empresa;
        this.periodos = [];
    }
    
    public passData(user: UserData){
        this.gmail = user.gmail;
        this.nombre = user.nombre;
        this.apellidos = user.apellidos;
        this.telefono = user.telefono;
        this.direccion = user.direccion;
        this.foto = user.foto;
        this.pass = user.pass;
    }
}