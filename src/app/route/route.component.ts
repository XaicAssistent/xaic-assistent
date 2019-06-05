import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as utils from "tns-core-modules/utils/utils";
import { Page, Color } from 'tns-core-modules/ui/page/page';
import { MapboxMarker, LatLng } from "nativescript-mapbox";

@Component({
  selector: 'ns-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
  moduleId: module.id,
})
export class RouteComponent implements OnInit {
  @ViewChild("map") public mapbox: ElementRef;

  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;

  }

  public onMapReady(args: any) {
    this.mapbox.nativeElement.setOnMapClickListener((point: LatLng) => {
      console.log("Map clicked at latitude: " + point.lat + ", longitude: " + point.lng);
      this.mapbox.nativeElement.removeMarkers();
      this.mapbox.nativeElement.addMarkers([
        {
          lat: point.lat,
          lng: point.lng
        }
      ])
    });
    /*this.mapbox.nativeElement.addMarkers([
      {
        lat: 41.3857257,
        lng: 2.1629916,
        title: "STUCOM",
        subtitle: "STUCOM SOM TOTS",
        onCalloutTap: () => {
          utils.openUrl("https://www.thepolyglotdeveloper.com");
        }
      },
      {
        lat: 41.523572, // mandatory
        lng: 2.3651682,
        title: "MI CASA",
        subtitle: "CABRILS SOM TOTS",
        onCalloutTap: () => {
          utils.openUrl("https://www.thepolyglotdeveloper.com");
        }
      }
    ]);*/
  }

}
