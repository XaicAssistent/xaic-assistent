import { Component, OnInit, ViewChild } from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { ModalComponent } from '../modal';
import { EstadoEventoService } from '../services/EstadoEventoService';
import { FeedBack } from '../utils/FeedBack';
import { EstadoEvento } from '../model/EstadoEvento';
import { EstadosEventosMapper } from '../mapper/EstadosEventosMapper';
import { EventService } from '../services/EventService';
import { EventMapper } from '../mapper/EventMapper';
import { Event } from '../model/Event';
import { UserLoged } from '../utils/UserLoged';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css'],
  moduleId: module.id,
  providers: [EstadoEventoService, EventService]
})
export class DailyComponent implements OnInit {
  @ViewChild("modalChoseEstado") modalChoseEstado: ModalComponent;
  @ViewChild("modalCancelarCita") modalCancelarCita: ModalComponent;
  @ViewChild("modalDuracion") modalDuracion: ModalComponent;

  sideDrawer = <RadSideDrawer>app.getRootView();

  estadosNames: Array<string> = [];
  selectedEstado = 0;
  estados: EstadoEvento[] = [];
  userLoged;
  motivoCancelacion;

  eventoSelected: Event;

  events: Event[] = [];
  maxTime: number = 100;
  time: number = 10;

  constructor(private _estadoEventoService: EstadoEventoService, private _eventService: EventService,private page:Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.sideDrawer.gesturesEnabled = true;                      
    this.userLoged = UserLoged.getInstance().getUserLoged();
    this._estadoEventoService.getAllEstados().subscribe(
      (ok) => {
        if(ok["estados"] !== "null"){
          this.estados = EstadosEventosMapper.estadosEventoJSONToEstadoEvento(ok["estados"]);
          this.estadosNames.push("Todos los estados");
          let i = 0;
          this.estados.forEach((estado) => {
            i++;
            if(estado.codigo == "PA") this.selectedEstado = i;
            this.estadosNames.push(estado.descripcion);
          });
          this.buscarEventos();
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

  cancelarCita(id){
    this.motivoCancelacion = "";
    this.eventoSelected = this.events.filter(eve => eve.idEvento == id)[0];
    this.modalCancelarCita.show();
  }

  confirmacionCancelarCita(){
    this._eventService.cancelarEvento(this.eventoSelected.idEvento, this.motivoCancelacion).subscribe(
      (ok) => {
        if(ok["response"] == "true"){
          FeedBack.feedBackSucces("Evento cancelado correctamente");
          this.buscarEventos();
          this.modalCancelarCita.hide();
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

  aceptarCita(id){
    this.eventoSelected = this.events.filter(eve => eve.idEvento == id)[0];
    let empieza: Date = new Date();
    empieza.setHours(this.eventoSelected.periodo.empiezaHora);
    empieza.setMinutes(this.eventoSelected.periodo.empiezaMinuto);
    empieza.setSeconds(0);
    let acaba: Date = new Date();
    acaba.setHours(this.eventoSelected.periodo.acabaHora);
    acaba.setMinutes(this.eventoSelected.periodo.acabaMinuto);
    acaba.setSeconds(0);

    this.maxTime = ((acaba.getTime() - empieza.getTime()) / 1000) / 60;
    this.modalDuracion.show();
  }

  confirmacionCita(){
    let horaFin: Date = new Date();
    horaFin.setHours(this.eventoSelected.periodo.empiezaHora);
    horaFin.setMinutes(this.eventoSelected.periodo.empiezaMinuto);
    horaFin.setSeconds(0);

    horaFin.setTime(horaFin.getTime() + ((this.time*60)*1000));

    this.eventoSelected.periodo.acabaHora = horaFin.getHours();
    this.eventoSelected.periodo.acabaMinuto = horaFin.getMinutes();

    this._eventService.aceptarEvento(this.eventoSelected).subscribe(
      (ok) => {
        if(ok["response"] == "true"){
          FeedBack.feedBackSucces("Evento aceptado correctamente");
          this.buscarEventos();
          this.modalDuracion.hide();
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

  buscarEventos(){
    this._eventService.getEventsPorEstado(this.selectedEstado == 0 ? null : this.estados[this.selectedEstado - 1]).subscribe(
      (ok) => {
        this.events = EventMapper.eventsJSONtoEvent(ok);
        this.events.forEach((eve) => {
          eve.estado = this.estados.filter(est => est.idEstado == eve.estado.idEstado)[0];
        });
      },
      (erro) => {
        console.log("ERROR PMV");
        console.log(erro);
      }
    );
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

  tapInEvent(args){
    console.log("You tapped: " + args.index);
  }
}
