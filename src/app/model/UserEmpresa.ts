import { UserData } from "./UserData";
import { Category } from "./Category";

export class UserEmpresa extends UserData{
    direccionFija: boolean;
    fotosEmpresa: string[];
    category: Category;

    constructor(){
        super();
    }
}