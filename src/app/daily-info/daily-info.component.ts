import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../model/Event';
import { EventService } from '../services/EventService';
import { EventMapper } from '../mapper/EventMapper';
import { FeedBack } from '../utils/FeedBack';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-daily-info',
  templateUrl: './daily-info.component.html',
  styleUrls: ['./daily-info.component.css'],
  moduleId: module.id,
  providers: [EventService]
})
export class DailyInfoComponent implements OnInit {
  evento:Event = new Event();
  ruta: string = "";

  constructor(private route: ActivatedRoute, private _eventService: EventService, private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => {
        this.ruta = params['rutaAnterior'];
        this._eventService.getEvent(params['idEvento']).subscribe(
          (ok) => {
          if(ok["evento"] !== "null"){
            this.evento = EventMapper.infoEventJSONtoEvent(ok);
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
    );
  }

  updateEvent(){
    this._eventService.updateEvent(this.evento).subscribe(
      (ok) => {
        if(ok["response"] !== "false"){
          FeedBack.feedBackSucces("Evento actualizado");
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

  onFocus(args: TouchGestureEventData) {
    if (args.action == "down") {
      args.view.scaleX = 0.9;
      args.view.scaleY = 0.9;
    } else if (args.action == "up") {
      args.view.scaleX = 1;
      args.view.scaleY = 1 ;
    }
  }

  goBack(){
    this.routerExtensions.navigateByUrl(this.ruta, { clearHistory: true });
  }
}