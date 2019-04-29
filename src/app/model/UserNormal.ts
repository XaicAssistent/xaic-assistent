import { UserData } from "./UserData";

export class UserEmpresa extends UserData{
    fechaNacimiento: Date;
    alergias: string;
    
    constructor(){
        super();
    }
}