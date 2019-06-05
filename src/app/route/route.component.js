"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var RouteComponent = /** @class */ (function () {
    function RouteComponent(page) {
        this.page = page;
    }
    RouteComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    RouteComponent.prototype.onMapReady = function (args) {
        var _this = this;
        this.mapbox.nativeElement.setOnMapClickListener(function (point) {
            console.log("Map clicked at latitude: " + point.lat + ", longitude: " + point.lng);
            _this.mapbox.nativeElement.removeMarkers();
            _this.mapbox.nativeElement.addMarkers([
                {
                    lat: point.lat,
                    lng: point.lng
                }
            ]);
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
    };
    __decorate([
        core_1.ViewChild("map"),
        __metadata("design:type", core_1.ElementRef)
    ], RouteComponent.prototype, "mapbox", void 0);
    RouteComponent = __decorate([
        core_1.Component({
            selector: 'ns-route',
            templateUrl: './route.component.html',
            styleUrls: ['./route.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], RouteComponent);
    return RouteComponent;
}());
exports.RouteComponent = RouteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBRXpFLHNEQUE0RDtBQVM1RDtJQUdFLHdCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFFbkMsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUVuQyxDQUFDO0lBRU0sbUNBQVUsR0FBakIsVUFBa0IsSUFBUztRQUEzQixpQkErQkM7UUE5QkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsVUFBQyxLQUFhO1lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxlQUFlLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25GLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztnQkFDbkM7b0JBQ0UsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO29CQUNkLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztpQkFDZjthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFtQks7SUFDUCxDQUFDO0lBeENpQjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBZ0IsaUJBQVU7a0RBQUM7SUFEakMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FJMEIsV0FBSTtPQUhuQixjQUFjLENBMkMxQjtJQUFELHFCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgUGFnZSwgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBNYXBib3hNYXJrZXIsIExhdExuZyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLXJvdXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JvdXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcm91dGUuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJtYXBcIikgcHVibGljIG1hcGJveDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gIH1cblxuICBwdWJsaWMgb25NYXBSZWFkeShhcmdzOiBhbnkpIHtcbiAgICB0aGlzLm1hcGJveC5uYXRpdmVFbGVtZW50LnNldE9uTWFwQ2xpY2tMaXN0ZW5lcigocG9pbnQ6IExhdExuZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJNYXAgY2xpY2tlZCBhdCBsYXRpdHVkZTogXCIgKyBwb2ludC5sYXQgKyBcIiwgbG9uZ2l0dWRlOiBcIiArIHBvaW50LmxuZyk7XG4gICAgICB0aGlzLm1hcGJveC5uYXRpdmVFbGVtZW50LnJlbW92ZU1hcmtlcnMoKTtcbiAgICAgIHRoaXMubWFwYm94Lm5hdGl2ZUVsZW1lbnQuYWRkTWFya2VycyhbXG4gICAgICAgIHtcbiAgICAgICAgICBsYXQ6IHBvaW50LmxhdCxcbiAgICAgICAgICBsbmc6IHBvaW50LmxuZ1xuICAgICAgICB9XG4gICAgICBdKVxuICAgIH0pO1xuICAgIC8qdGhpcy5tYXBib3gubmF0aXZlRWxlbWVudC5hZGRNYXJrZXJzKFtcbiAgICAgIHtcbiAgICAgICAgbGF0OiA0MS4zODU3MjU3LFxuICAgICAgICBsbmc6IDIuMTYyOTkxNixcbiAgICAgICAgdGl0bGU6IFwiU1RVQ09NXCIsXG4gICAgICAgIHN1YnRpdGxlOiBcIlNUVUNPTSBTT00gVE9UU1wiLFxuICAgICAgICBvbkNhbGxvdXRUYXA6ICgpID0+IHtcbiAgICAgICAgICB1dGlscy5vcGVuVXJsKFwiaHR0cHM6Ly93d3cudGhlcG9seWdsb3RkZXZlbG9wZXIuY29tXCIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYXQ6IDQxLjUyMzU3MiwgLy8gbWFuZGF0b3J5XG4gICAgICAgIGxuZzogMi4zNjUxNjgyLFxuICAgICAgICB0aXRsZTogXCJNSSBDQVNBXCIsXG4gICAgICAgIHN1YnRpdGxlOiBcIkNBQlJJTFMgU09NIFRPVFNcIixcbiAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4gICAgICAgICAgdXRpbHMub3BlblVybChcImh0dHBzOi8vd3d3LnRoZXBvbHlnbG90ZGV2ZWxvcGVyLmNvbVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF0pOyovXG4gIH1cblxufVxuIl19