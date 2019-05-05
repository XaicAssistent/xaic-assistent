"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("tns-core-modules/ui/dialogs");
var camera = require("nativescript-camera");
var image_source_1 = require("tns-core-modules/image-source/image-source");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(modalDialogService, viewContainerRef) {
        this.modalDialogService = modalDialogService;
        this.viewContainerRef = viewContainerRef;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.openPopup = function () {
        dialogs.action({
            title: "Your title",
            cancelButtonText: "Cancel text",
            actions: ["USUARIO CLIENTE", "EMPRESA"]
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
        });
    };
    RegisterComponent.prototype.addSchedule = function () {
        var options = {
            viewContainerRef: this.viewContainerRef
        };
    };
    RegisterComponent.prototype.openCamera = function () {
        var _this = this;
        camera.requestPermissions();
        var options = {
            width: 200,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true,
            cameraFacing: "rear"
        };
        camera.takePicture(options).then(function (imageAsset) {
            _this.imagen = imageAsset;
            var source = new image_source_1.ImageSource();
            source.fromAsset(imageAsset).then(function (source) {
                var base64image = source.toBase64String("png", 60);
                _this.base64 = base64image;
            });
        }).catch(function (err) {
            console.log(err);
        });
        (function () {
            console.log("no camera permission");
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'ns-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogService, core_1.ViewContainerRef])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBRXBFLHFEQUF1RDtBQUN2RCw0Q0FBOEM7QUFDOUMsMkVBQXFGO0FBQ3JGLGtFQUEyRjtBQU8zRjtJQUVFLDJCQUFvQixrQkFBcUMsRUFBVSxnQkFBaUM7UUFBaEYsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7SUFBSSxDQUFDO0lBRXpHLG9DQUFRLEdBQVI7SUFFQSxDQUFDO0lBS0QscUNBQVMsR0FBVDtRQUNFLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDYixLQUFLLEVBQUUsWUFBWTtZQUNuQixnQkFBZ0IsRUFBRSxhQUFhO1lBQy9CLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFDLFNBQVMsQ0FBQztTQUV6QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLDZCQUE2QjtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDRSxJQUFJLE9BQU8sR0FBdUI7WUFDaEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtTQUN4QyxDQUFDO0lBQ0osQ0FBQztJQUVELHNDQUFVLEdBQVY7UUFBQSxpQkFzQkM7UUFyQkMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQXlCO1lBQ2hDLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEdBQUc7WUFDWCxlQUFlLEVBQUUsSUFBSTtZQUNyQixhQUFhLEVBQUUsSUFBSTtZQUNuQixZQUFZLEVBQUUsTUFBTTtTQUN2QixDQUFDO1FBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFVO1lBQ3hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtnQkFDckMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELEtBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFBO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQSxDQUFBO0lBQ0gsQ0FBQztJQW5EVSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7WUFDdkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBR3VDLGlDQUFrQixFQUEyQix1QkFBZ0I7T0FGekYsaUJBQWlCLENBcUQ3QjtJQUFELHdCQUFDO0NBQUEsQUFyREQsSUFxREM7QUFyRFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcHVwLFBvcHVwT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wb3B1cCc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2UsIGZyb21CYXNlNjQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2UvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ09wdGlvbnMsIE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1yZWdpc3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWdpc3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxEaWFsb2dTZXJ2aWNlOk1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIFxuICB9XG5cbmltYWdlbjtcbmJhc2U2NDtcblxuICBvcGVuUG9wdXAoKXtcbiAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICB0aXRsZTogXCJZb3VyIHRpdGxlXCIsXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbCB0ZXh0XCIsXG4gICAgICBhY3Rpb25zOiBbXCJVU1VBUklPIENMSUVOVEVcIixcIkVNUFJFU0FcIl1cbiAgICAgIFxuICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG4gIH0pO1xuICB9XG5cbiAgYWRkU2NoZWR1bGUoKXtcbiAgICBsZXQgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52aWV3Q29udGFpbmVyUmVmXG4gICAgfTtcbiAgfVxuXG4gIG9wZW5DYW1lcmEoKXtcbiAgICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gICAgbGV0IG9wdGlvbnM6IGNhbWVyYS5DYW1lcmFPcHRpb25zID0ge1xuICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAga2VlcEFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgICBzYXZlVG9HYWxsZXJ5OiB0cnVlLFxuICAgICAgICBjYW1lcmFGYWNpbmc6IFwicmVhclwiXG4gICAgfTtcbiAgICBjYW1lcmEudGFrZVBpY3R1cmUob3B0aW9ucykudGhlbigoaW1hZ2VBc3NldCkgPT4ge1xuICAgICAgICB0aGlzLmltYWdlbiA9IGltYWdlQXNzZXQ7XG4gICAgICAgIGxldCBzb3VyY2UgPSBuZXcgSW1hZ2VTb3VyY2UoKTtcbiAgICAgICAgc291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NGltYWdlID0gc291cmNlLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIsIDYwKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZTY0ID0gYmFzZTY0aW1hZ2U7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgICAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gY2FtZXJhIHBlcm1pc3Npb25cIik7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==