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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FtZXJhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDYW1lcmEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw0Q0FBOEM7QUFDOUMsMkVBQXdFO0FBQ3hFLHNEQUF3RDtBQUd4RDtJQUFBO0lBNkNBLENBQUM7SUEzQ0csaUNBQVMsR0FBVCxVQUFVLE9BQTRCO1FBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQzVCO2dCQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBVTtvQkFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTt3QkFDckMsT0FBTyxDQUFFLEVBQUUsUUFBUSxFQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQzs0QkFDNUMsT0FBTyxFQUFHLFVBQVUsRUFBQyxDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7b0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNILENBQUMsRUFDRDtnQkFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQ1IsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyx3Q0FBd0M7U0FDMUQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDckIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsU0FBUztnQkFDaEIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO29CQUNyQyxPQUFPLENBQUUsRUFBRSxRQUFRLEVBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDO3dCQUNyRCxPQUFPLEVBQUcsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0g7Ozs7cUJBSUs7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTVDUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7T0FDQSxhQUFhLENBNkN6QjtJQUFELG9CQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZS9pbWFnZS1zb3VyY2UnO1xyXG5pbXBvcnQgKiBhcyBpbWFnZXBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmFTZXJ2aWNle1xyXG5cclxuICAgIHBpY2tQaG90byhvcHRpb25zOmNhbWVyYS5DYW1lcmFPcHRpb25zKXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCkudGhlbihcclxuICAgICAgICAgICAgICAgICgpPT4geyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpLnRoZW4oKGltYWdlQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBJbWFnZVNvdXJjZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIHsgXCJiYXNlNjRcIiA6IHNvdXJjZS50b0Jhc2U2NFN0cmluZyhcInBuZ1wiLDUwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1hZ2VcIiA6IGltYWdlQXNzZXR9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICAoKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwibm8gaGF5IHBlcm1pc29zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RHYWxlcnlQaG90bygpe1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIiAvLyB1c2UgXCJtdWx0aXBsZVwiIGZvciBtdWx0aXBsZSBzZWxlY3Rpb25cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgY29udGV4dC5hdXRob3JpemUoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XHJcbiAgICAgICAgICAgICAgfSkudGhlbigoc2VsZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VBc3NldCA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBuZXcgSW1hZ2VTb3VyY2UoKTsgXHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4oKHNvdXJjZSkgPT4geyBcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCB7IFwiYmFzZTY0XCIgOiBzb3VyY2UudG9CYXNlNjRTdHJpbmcoXCJwbmdcIiw1MCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbWFnZVwiIDogaW1hZ2VBc3NldH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgc2kgc2VsZWNjaW9uYXJhIG3DoXMgZGUgdW5hIGFxdWkgZXN0YXJpYW4gdG9kYXMgc2UgbGUgdGVuZHJpYSBkZSBwYXNhciBwb3IgcGFyYW1ldHJvIHBhcmEgcG9kZXIgc2VsZWNjaW9uYXIgbXVsdGlwbGVcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3RlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19