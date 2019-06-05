import { Component, OnInit } from "@angular/core";
import * as calendarModule from "nativescript-ui-calendar";
import { Color } from "tns-core-modules/color/color";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { EventService } from "../services/EventService";
import { FeedBack } from "../utils/FeedBack";
import { EventMapper } from "../mapper/EventMapper";
import { Event } from "../model/Event";

@Component({
  selector: 'ns-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
  moduleId: module.id,
  providers: [EventService]
})
export class CalendarPageComponent implements OnInit {

  calendarEvents = [];
  events: Event[] = [];
  modoVista = true;
  date: Date = new Date();

  constructor(private _page: Page, private routerExtensions: RouterExtensions, private _eventService: EventService) {
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;

    this._eventService.getEvents().subscribe(
      (ok) => {
        if(ok["events"] !== "null"){
          this.events = EventMapper.eventsJSONtoEvent(ok);
          this.calendarEvents = EventMapper.eventstoCalendarEvent(this.events);
        }else{
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      },
      (erro) => {
        console.log("ERROR PMV");
        console.log(erro);
      }
    );
  }

  selectedEvent(args){
    const event: calendarModule.CalendarEvent = args.eventData;
    let evento: Event = new Event();
    evento.fecha = event.startDate;
    evento.titulo = event.title;
    evento.periodo.empiezaHora = event.startDate.getHours();
    evento.periodo.empiezaMinuto = event.startDate.getMinutes();
    evento.periodo.acabaHora = event.endDate.getHours();
    evento.periodo.acabaMinuto = event.endDate.getMinutes();
    
    let id = (this.events.filter(eve => eve.titulo == event.title && eve.fecha.getDate() == evento.fecha.getDate() && eve.fecha.getFullYear() == evento.fecha.getFullYear() && eve.fecha.getMonth() == evento.fecha.getMonth() && eve.periodo.empiezaHora == evento.periodo.empiezaHora && eve.periodo.empiezaMinuto && evento.periodo.empiezaMinuto)[0]).idEvento;
    
    var params = {
      queryParams: {
        "idEvento" : id,
        "rutaAnterior" : "calendar"
      },
      clearHistory : true
    }
    this.routerExtensions.navigate(["/infoDaily"], params);
  }

  addPersonalEvent(){
    var params = {
      queryParams: {
        "fecha" : this.date
      },
      clearHistory : true
    }
    this.routerExtensions.navigate(["/newEvent"], params);
  }

  onDateSelected(args) {
    let now = new Date();
    this.date = args.date < now ? now : args.date;
  }
}
