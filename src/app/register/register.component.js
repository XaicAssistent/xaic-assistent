"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("tns-core-modules/ui/dialogs");
var camera = require("nativescript-camera");
var image_source_1 = require("tns-core-modules/image-source/image-source");
var dialog_schedule_component_1 = require("../custom_dialogs/dialog_schedule.component");
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
        this.modalDialogService.showModal(dialog_schedule_component_1.DialogContent, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBRXBFLHFEQUF1RDtBQUN2RCw0Q0FBOEM7QUFDOUMsMkVBQXFGO0FBQ3JGLHlGQUE0RTtBQUM1RSxrRUFBMkY7QUFPM0Y7SUFFRSwyQkFBb0Isa0JBQXFDLEVBQVUsZ0JBQWlDO1FBQWhGLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO0lBQUksQ0FBQztJQUV6RyxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUtELHFDQUFTLEdBQVQ7UUFDRSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2IsS0FBSyxFQUFFLFlBQVk7WUFDbkIsZ0JBQWdCLEVBQUUsYUFBYTtZQUMvQixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQyxTQUFTLENBQUM7U0FFekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDViw2QkFBNkI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNILENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0UsSUFBSSxPQUFPLEdBQXVCO1lBQ2hDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7U0FDeEMsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMseUNBQWEsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUFBLGlCQXNCQztRQXJCQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBeUI7WUFDaEMsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFlBQVksRUFBRSxNQUFNO1NBQ3ZCLENBQUM7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQVU7WUFDeEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7WUFDL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO2dCQUNyQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDckQsS0FBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILENBQUE7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0lBcERVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUN2QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FHdUMsaUNBQWtCLEVBQTJCLHVCQUFnQjtPQUZ6RixpQkFBaUIsQ0FzRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRERCxJQXNEQztBQXREWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wdXAsUG9wdXBPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXBvcHVwJztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZSwgZnJvbUJhc2U2NCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZS9pbWFnZS1zb3VyY2VcIjtcbmltcG9ydCB7IERpYWxvZ0NvbnRlbnQgfSBmcm9tICcuLi9jdXN0b21fZGlhbG9ncy9kaWFsb2dfc2NoZWR1bGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLXJlZ2lzdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlZ2lzdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVnaXN0ZXIuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbERpYWxvZ1NlcnZpY2U6TW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgXG4gIH1cblxuaW1hZ2VuO1xuYmFzZTY0O1xuXG4gIG9wZW5Qb3B1cCgpe1xuICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgIHRpdGxlOiBcIllvdXIgdGl0bGVcIixcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsIHRleHRcIixcbiAgICAgIGFjdGlvbnM6IFtcIlVTVUFSSU8gQ0xJRU5URVwiLFwiRU1QUkVTQVwiXVxuICAgICAgXG4gIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG4gICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgfSk7XG4gIH1cblxuICBhZGRTY2hlZHVsZSgpe1xuICAgIGxldCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICB9O1xuICAgIHRoaXMubW9kYWxEaWFsb2dTZXJ2aWNlLnNob3dNb2RhbChEaWFsb2dDb250ZW50LG9wdGlvbnMpO1xuICB9XG5cbiAgb3BlbkNhbWVyYSgpe1xuICAgIGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcbiAgICBsZXQgb3B0aW9uczogY2FtZXJhLkNhbWVyYU9wdGlvbnMgPSB7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIGhlaWdodDogMzAwLFxuICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgIHNhdmVUb0dhbGxlcnk6IHRydWUsXG4gICAgICAgIGNhbWVyYUZhY2luZzogXCJyZWFyXCJcbiAgICB9O1xuICAgIGNhbWVyYS50YWtlUGljdHVyZShvcHRpb25zKS50aGVuKChpbWFnZUFzc2V0KSA9PiB7XG4gICAgICAgIHRoaXMuaW1hZ2VuID0gaW1hZ2VBc3NldDtcbiAgICAgICAgbGV0IHNvdXJjZSA9IG5ldyBJbWFnZVNvdXJjZSgpO1xuICAgICAgICBzb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4oKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFzZTY0aW1hZ2UgPSBzb3VyY2UudG9CYXNlNjRTdHJpbmcoXCJwbmdcIiwgNjApO1xuICAgICAgICAgICAgdGhpcy5iYXNlNjQgPSBiYXNlNjRpbWFnZTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJubyBjYW1lcmEgcGVybWlzc2lvblwiKTtcbiAgICB9XG4gIH1cblxufVxuIl19