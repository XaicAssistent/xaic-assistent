import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class MapsService {

    constructor(private http: HttpClient) { }

    getDirection(latitude, longitude) {
        let serverUrl = "https://maps.googleapis.com/maps/api/geocode/json?&latlng=" + latitude + "," + longitude + "&key=AIzaSyCV0Ajoq_x_QYYmHgaHKhDDcGcGEX9E56U";
        return this.http.get(serverUrl, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }

    getCoordinates(direction) {
        var urlDirection = direction.replace(" ", "+");

        let serverUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + urlDirection + "&key=AIzaSyCV0Ajoq_x_QYYmHgaHKhDDcGcGEX9E56U";
        return this.http.get(serverUrl, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }



}