import { Component, OnInit } from "@angular/core";
import * as calendarModule from "nativescript-ui-calendar";
import { Color } from "tns-core-modules/color/color";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { EventService } from "../services/EventService";
import { FeedBack } from "../utils/FeedBack";
import { EventMapper } from "../mapper/EventMapper";
import { Event } from "../model/Event";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
  moduleId: module.id,
  providers: [EventService]
})
export class CalendarPageComponent implements OnInit {

  sideDrawer = <RadSideDrawer>app.getRootView();

  calendarEvents = [];
  modoVista = true;

  constructor(private _page: Page, private routerExtensions: RouterExtensions, private _eventService: EventService) {
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this.sideDrawer.gesturesEnabled = true;
    this._eventService.getEvents().subscribe(
      (ok) => {
        if(ok["events"] !== "null"){
          this.calendarEvents = EventMapper.eventstoCalendarEvent(EventMapper.eventsJSONtoEvent(ok));
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

  onDateSelected(args) {
      console.log("onDateSelected: " + args.date);
  }

  onDateDeselected(args) {
      console.log("onDateDeselected: " + args.date);
  }

  onNavigatedToDate(args) {
      console.log("onNavigatedToDate: " + args.date);
  }

  onNavigatingToDateStarted(args) {
      console.log("onNavigatingToDateStarted: " + args.date);
  }

  onViewModeChanged(args) {
      console.log("onViewModeChanged: " + args.newValue);
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
    console.log(evento);
  }

  addPersonalEvent(){
    this.routerExtensions.navigateByUrl("newEvent");
  }
}
