import * as calendarModule from "nativescript-ui-calendar";
import { Event } from "../model/Event";
import { Periodo } from "../model/Perido";
import { Color } from "tns-core-modules/color/color";

export class EventMapper {
    public static eventstoCalendarEvent(events: Event[]) : calendarModule.CalendarEvent[]{
        let eventsCalendar = [];
        let colors = [new Color(200, 188, 26, 214), new Color(220, 255, 109, 130), new Color(255, 55, 45, 255), new Color(199, 17, 227, 10), new Color(255, 255, 54, 3)];

        events.forEach(evento => {
            let startDate: Date;
            let endDate: Date;

            startDate = new Date(evento.fecha.getFullYear(), evento.fecha.getMonth(), evento.fecha.getDate());
            startDate.setHours(evento.periodo.empiezaHora);
            startDate.setMinutes(evento.periodo.empiezaMinuto);

            endDate = new Date(evento.fecha.getFullYear(), evento.fecha.getMonth(), evento.fecha.getDate());
            endDate.setHours(evento.periodo.acabaHora);
            endDate.setMinutes(evento.periodo.acabaMinuto);

            let event = new calendarModule.CalendarEvent(evento.titulo, startDate, endDate, false, colors[Math.floor(Math.random() * (colors.length - 0 + 1)) + 0]);

            eventsCalendar.push(event);
        });

        return eventsCalendar;
    }

    public static eventsJSONtoEvent(eventsJSON) : Event[]{
        let events: Event[] = [];

        eventsJSON["events"].forEach((eve) => {
            //faltara posar els users
            let evento: Event = new Event();
            evento.idEvento = eve.IdEvento;
            evento.titulo = eve.Titulo;
            evento.descripcion = eve.Descripcion;

            let fechaSpliteada = eve.Fecha.split("T", 1)[0].split("-", 3);
            let fecha: Date =  new Date(fechaSpliteada[0], fechaSpliteada[1] - 1, fechaSpliteada[2]);

            evento.fecha = fecha;

            let periodo:Periodo = new Periodo();
            
            let horasMinutosEmpieza = eve.Empieza.split("T", 2)[1].split(":", 2);
            let horasMinutosAcaba = eve.Acaba.split("T", 2)[1].split(":", 2);

            periodo.empiezaHora = horasMinutosEmpieza[0];
            periodo.empiezaMinuto = horasMinutosEmpieza[1];

            periodo.acabaHora = horasMinutosAcaba[0];
            periodo.acabaMinuto = horasMinutosAcaba[1];

            evento.periodo = periodo;

            evento.motivoCancelacion = eve.MotivoCancelacion;

            evento.estado.idEstado = eve.Estado;

            if(eve.IdUserEmpresa){
                evento.userEmpresa.idUserEmprea = eve.IdUserEmpresa;
            }

            events.push(evento);
        });

        return events;
    }
}