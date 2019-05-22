import { DaysEnum } from "../utils/DaysEnum";

export class Periodo{
    dia: DaysEnum;
    empiezaHora: number;
    empiezaMinuto: number;
    acabaHora: number;
    acabaMinuto: number;

    constructor(){
    }

    public equals(obj: Periodo) : boolean { 
        return this.dia === obj.dia && this.empiezaHora === obj.empiezaHora && this.empiezaMinuto === obj.empiezaMinuto && this.acabaHora === obj.acabaHora && this.acabaMinuto === obj.acabaMinuto;
    }

    public estaDentro(obj: Periodo) : boolean {
        if (this.dia != obj.dia) return false;
        if (((this.empiezaHora <= obj.empiezaHora && this.acabaHora >= obj.empiezaHora) && (this.empiezaMinuto <= obj.empiezaMinuto && this.acabaMinuto >= obj.empiezaMinuto)) || ((this.empiezaHora <= obj.acabaHora && this.acabaHora >= obj.acabaHora) && (this.empiezaMinuto <= obj.acabaMinuto && this.acabaMinuto >= obj.acabaMinuto))) return true;
        return false;
    } 
}