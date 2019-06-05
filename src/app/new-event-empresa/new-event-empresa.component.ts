import { Component, OnInit, ViewChild } from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/UserService';
import { UserEmpresa } from '../model/UserEmpresa';
import { UserMapper } from '../mapper/UserMapper';
import { FeedBack } from '../utils/FeedBack';
import { ModalComponent } from '../modal';
import { DatePicker } from 'tns-core-modules/ui/date-picker/date-picker';
import { Event } from '../model/Event';
import { EventService } from '../services/EventService';
import { Periodo } from '../model/Perido';
import { PeriodoMapper } from '../mapper/PeriodoMapper';
import { RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'ns-new-event-empresa',
  templateUrl: './new-event-empresa.component.html',
  styleUrls: ['./new-event-empresa.component.css'],
  moduleId: module.id,
  providers: [UserService, EventService]
})
export class NewEventEmpresaComponent implements OnInit {
  @ViewChild("modalfecha") modalfecha: ModalComponent;

  sideDrawer = <RadSideDrawer>app.getRootView();

  userEmpresa: UserEmpresa = new UserEmpresa();
  newEvent: Event = new Event();
  periodos: Periodo[] = [];

  horasDisponibles: Array<string> = [];
  selectedHorario = 0;

  constructor(private route: ActivatedRoute, private _userService: UserService, private _eventService: EventService, private routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.sideDrawer.gesturesEnabled = false;
    this._userService.getInfoNewEventEmpresa(this.route.snapshot.params["id"]).subscribe(
      (ok) => {
        if(ok["response"] !== "null"){
          this.userEmpresa = UserMapper.userEmpresaJSONToUserEmpresaInfoCita(ok["response"]);
          
          let now = new Date();
          this.newEvent.fecha = now;
          this.descargarPeriodos();
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

    this.descargarPeriodos();
  }

  descargarPeriodos(){
    this.periodos = [];
    this.horasDisponibles = [];

    let fecha = this.newEvent.fecha.getFullYear() + "-" + (this.newEvent.fecha.getMonth() + 1) + "-" + this.newEvent.fecha.getDate();

    if(this.userEmpresa.idUserEmprea){
      this._eventService.getHorasPorDia(fecha ,this.userEmpresa.idUserEmprea).subscribe(
        (ok) => {
          ok['response']['horasPosibles'].forEach(per => {
            let peri: Periodo = PeriodoMapper.periodoJSONToPeriodo(per);
            this.periodos.push(peri);
            this.horasDisponibles.push(peri.empiezaHora + ":" + peri.empiezaMinuto + " - " + peri.acabaHora + ":" + peri.acabaMinuto);
          });
        },
        (erro) => {
          console.log("ERROR PMV");
          console.log(erro);
        }
      );
    }
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
    this.newEvent.userEmpresa = this.userEmpresa;
    this.newEvent.periodo = this.periodos[this.selectedHorario];

    this._eventService.addEvent(this.newEvent).subscribe(
      (ok) => {
        if(ok["response"] == "true"){
          FeedBack.feedBackSucces("Evento añadido correctamente");
          this.routerExtensions.navigateByUrl('search', { clearHistory: true });
        }else{
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      }
    );
  }
}
