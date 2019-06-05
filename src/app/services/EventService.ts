import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Event } from "../model/Event";
import * as appSettings from "tns-core-modules/application-settings";
import { EstadoEvento } from "../model/EstadoEvento";

@Injectable()
export class EventService {
    
    constructor(private http:HttpClient){}

    private createRequestHeader() {
        return new HttpHeaders({ 'Content-Type': 'application/json'});     
    }

    addEvent(event: Event){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/addEvent/" + appSettings.getString("tokenUser", "");
        return this.http.post(serverUrl, event, {headers: this.createRequestHeader()});
    }

    updateEvent(event: Event){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/updateEvent/" + appSettings.getString("tokenUser", "");
        return this.http.post(serverUrl, event, {headers: this.createRequestHeader()});
    }

    getEvents(){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getCalendar/" + appSettings.getString("tokenUser", "");
        return this.http.get(serverUrl, {headers: this.createRequestHeader()});
    }

    getEventsPorEstado(estadoEvento: EstadoEvento){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getCitasPorEstado/" + appSettings.getString("tokenUser", "") + "/" + (!estadoEvento ? "todos" : estadoEvento.codigo);
        return this.http.get(serverUrl, {headers: this.createRequestHeader()});
    }

    getHorasPorDia(fecha, idUserEmpresa){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getHorasPorDia/" + appSettings.getString("tokenUser", "") + "/" + fecha + "/" + idUserEmpresa;
        return this.http.get(serverUrl, {headers: this.createRequestHeader()});
    }

    cancelarEvento(idEvento, motivo:string){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/cancelarEvento/" + appSettings.getString("tokenUser", "") + "/" + idEvento;
        return this.http.post(serverUrl, {"motivo" : motivo}, {headers: this.createRequestHeader()});
    }

    aceptarEvento(evento: Event){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/aceptarEvento/" + appSettings.getString("tokenUser", "");
        return this.http.post(serverUrl, evento, {headers: this.createRequestHeader()});
    }

    getEvent(idEvento){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getEventoById/" + appSettings.getString("tokenUser", "") + "/" + idEvento;
        return this.http.get(serverUrl, {headers: this.createRequestHeader()});
    }

    deleteEvent(idEvento){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/deleteEvent/" + appSettings.getString("tokenUser", "") + "/" + idEvento;
        return this.http.delete(serverUrl, {headers: this.createRequestHeader()});
    }
}