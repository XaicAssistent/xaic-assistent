import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePicker } from 'tns-core-modules/ui/date-picker/date-picker';
import { TimePicker } from 'tns-core-modules/ui/time-picker/time-picker';
import { RouterExtensions } from 'nativescript-angular/router';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { Event } from '../model/Event';
import * as app from "tns-core-modules/application";
import { EventService } from '../services/EventService';
import { FeedBack } from '../utils/FeedBack';
import { ModalComponent } from '../modal';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'ns-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  moduleId: module.id,
  providers: [EventService]
})
export class NewEventComponent implements OnInit {
  @ViewChild("horaInicio") angularhoraInicio: ElementRef;
  @ViewChild("horaFin") angularhoraFin: ElementRef;

  @ViewChild("modalfecha") modalfecha: ModalComponent;
  @ViewChild("modalEmpieza") modalEmpieza: ModalComponent;
  @ViewChild("modalAcaba") modalAcaba: ModalComponent;

  sideDrawer = <RadSideDrawer>app.getRootView();
  
  horaInicio: TimePicker;
  horaFin: TimePicker;

  newEvent: Event = new Event();

  constructor(private routerExtensions: RouterExtensions, private _eventService: EventService) { }

  ngOnInit() {
    this.sideDrawer.gesturesEnabled = false;
    this.horaInicio = this.angularhoraInicio.nativeElement;
    this.horaFin = this.angularhoraFin.nativeElement;
  }

  onPickerLoaded(args) {
    let datePicker = <DatePicker>args.object;
    let now = new Date();

    datePicker.date = now;
    datePicker.minDate = now;
    datePicker.maxDate = new Date(now.getFullYear() + 150, 12, 31);
  }
  
  onDateChanged(args) {
    this.newEvent.fecha = args.value;
    this.newEvent.fecha.setHours(2);
  }

  onTimeChangedInicio(args) {
    let timePicker = <TimePicker>args.object;

    this.horaFin.hour = timePicker.hour == 23 ? 0 : timePicker.hour + 1;
    this.horaFin.minute = timePicker.minute;

    this.updatePeriodo();
  }

  onTimeChangedFin(args) {
    //falta validar que no de la vuelta el horario
    let timePicker = <TimePicker>args.object;

    if(timePicker.hour < this.horaInicio.hour && timePicker.hour != 0){
      timePicker.hour = this.horaInicio.hour;
    }

    if(timePicker.hour == this.horaInicio.hour && (timePicker.minute - 5) < this.horaInicio.minute){
      timePicker.minute = this.horaInicio.minute + 5;
    }

    this.updatePeriodo();
  }

  updatePeriodo(){
    this.newEvent.periodo.empiezaHora = this.horaInicio.hour;
    this.newEvent.periodo.empiezaMinuto = this.horaInicio.minute;
    this.newEvent.periodo.acabaHora = this.horaFin.hour;
    this.newEvent.periodo.acabaMinuto = this.horaFin.minute;
  }

  onFocus(args: TouchGestureEventData) {
    if (args.action == "down") {
      args.view.scaleX = 0.9;
      args.view.scaleY = 0.9;
    } else if (args.action == "up") {
      args.view.scaleX = 1;
      args.view.scaleY = 1 ;
    }
  }

  addEvent(){
    this.newEvent.periodo.empiezaHora = this.horaInicio.hour;
    this.newEvent.periodo.empiezaMinuto = this.horaInicio.minute;
    this.newEvent.periodo.acabaHora = this.horaFin.hour;
    this.newEvent.periodo.acabaMinuto = this.horaFin.minute;

    this._eventService.addEvent(this.newEvent).subscribe(
      (ok) => {
        if(ok["response"] == "true"){
          FeedBack.feedBackSucces("Evento añadido correctamente");
          this.routerExtensions.navigateByUrl('calendar', { clearHistory: true });
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
}
