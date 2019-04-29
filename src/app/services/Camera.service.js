"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var camera = require("nativescript-camera");
var image_source_1 = require("tns-core-modules/image-source/image-source");
var imagepicker = require("nativescript-imagepicker");
var CameraService = /** @class */ (function () {
    function CameraService() {
    }
    CameraService.prototype.pickPhoto = function (options) {
        return new Promise(function (resolve, reject) {
            camera.requestPermissions().then(function () {
                camera.takePicture(options).then(function (imageAsset) {
                    var source = new image_source_1.ImageSource();
                    source.fromAsset(imageAsset).then(function (source) {
                        resolve({ "base64": source.toBase64String("png", 50),
                            "image": imageAsset });
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }, function () {
                reject("no hay permisos");
            });
        });
    };
    CameraService.prototype.selectGaleryPhoto = function () {
        var context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        return new Promise(function (resolve) {
            context.authorize().then(function () {
                return context.present();
            }).then(function (selection) {
                var imageAsset = selection[0];
                var source = new image_source_1.ImageSource();
                source.fromAsset(imageAsset).then(function (source) {
                    resolve({ "base64": source.toBase64String("png", 50),
                        "image": imageAsset });
                });
                /*
                si seleccionara más de una aqui estarian todas se le tendria de pasar por parametro para poder seleccionar multiple
                selection.forEach((selected) => {
                  console.log(selected);
                });*/
            });
        });
    };
    CameraService = __decorate([
        core_1.Injectable()
    ], CameraService);
    return CameraService;
}());
exports.CameraService = CameraService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FtZXJhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDYW1lcmEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw0Q0FBOEM7QUFDOUMsMkVBQXdFO0FBQ3hFLHNEQUF3RDtBQUd4RDtJQUFBO0lBNkNBLENBQUM7SUEzQ0csaUNBQVMsR0FBVCxVQUFVLE9BQTRCO1FBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQzVCO2dCQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBVTtvQkFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTt3QkFDckMsT0FBTyxDQUFFLEVBQUUsUUFBUSxFQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQzs0QkFDNUMsT0FBTyxFQUFHLFVBQVUsRUFBQyxDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7b0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNILENBQUMsRUFDRDtnQkFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQ1IsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyx3Q0FBd0M7U0FDMUQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDckIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsU0FBUztnQkFDaEIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO29CQUNyQyxPQUFPLENBQUUsRUFBRSxRQUFRLEVBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDO3dCQUNyRCxPQUFPLEVBQUcsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0g7Ozs7cUJBSUs7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTVDUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7T0FDQSxhQUFhLENBNkN6QjtJQUFELG9CQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2V9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlL2ltYWdlLXNvdXJjZSc7XG5pbXBvcnQgKiBhcyBpbWFnZXBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYW1lcmFTZXJ2aWNle1xuXG4gICAgcGlja1Bob3RvKG9wdGlvbnM6Y2FtZXJhLkNhbWVyYU9wdGlvbnMpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2FtZXJhLnJlcXVlc3RQZXJtaXNzaW9ucygpLnRoZW4oXG4gICAgICAgICAgICAgICAgKCk9PiB7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpLnRoZW4oKGltYWdlQXNzZXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBuZXcgSW1hZ2VTb3VyY2UoKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4oKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIHsgXCJiYXNlNjRcIiA6IHNvdXJjZS50b0Jhc2U2NFN0cmluZyhcInBuZ1wiLDUwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImltYWdlXCIgOiBpbWFnZUFzc2V0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJubyBoYXkgcGVybWlzb3NcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdEdhbGVyeVBob3RvKCl7XG4gICAgICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZGU6IFwic2luZ2xlXCIgLy8gdXNlIFwibXVsdGlwbGVcIiBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aG9yaXplKCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcbiAgICAgICAgICAgICAgfSkudGhlbigoc2VsZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGltYWdlQXNzZXQgPSBzZWxlY3Rpb25bMF07XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBJbWFnZVNvdXJjZSgpOyBcbiAgICAgICAgICAgICAgICBzb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4oKHNvdXJjZSkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSggeyBcImJhc2U2NFwiIDogc291cmNlLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIsNTApLFxuICAgICAgICAgICAgICAgICAgICBcImltYWdlXCIgOiBpbWFnZUFzc2V0fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBzaSBzZWxlY2Npb25hcmEgbcOhcyBkZSB1bmEgYXF1aSBlc3RhcmlhbiB0b2RhcyBzZSBsZSB0ZW5kcmlhIGRlIHBhc2FyIHBvciBwYXJhbWV0cm8gcGFyYSBwb2RlciBzZWxlY2Npb25hciBtdWx0aXBsZVxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19