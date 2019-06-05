import { Periodo } from "../model/Perido";
import { DaysEnum } from "../utils/DaysEnum";

export class PeriodoMapper {
    public static periodoJSONToPeriodo(periodoJSON): Periodo{

        let periodo:Periodo = new Periodo();
        let per = periodoJSON;

        let horasMinutosEmpieza = per.Empieza.split("T", 2)[1].split(":", 2);
        let horasMinutosAcaba = per.Acaba.split("T", 2)[1].split(":", 2);

        periodo.empiezaHora = horasMinutosEmpieza[0];
        periodo.empiezaMinuto = horasMinutosEmpieza[1];

        periodo.acabaHora = horasMinutosAcaba[0];
        periodo.acabaMinuto = horasMinutosAcaba[1];

        if(per.Dia){
            periodo.dia = per.Dia;
        }

        return periodo;
    }
}