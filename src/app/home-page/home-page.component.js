"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var UserService_1 = require("../services/UserService");
var FeedBack_1 = require("../utils/FeedBack");
var dialogs = require("tns-core-modules/ui/dialogs");
var TypeUser_1 = require("../utils/TypeUser");
var UserData_1 = require("../model/UserData");
var modal_1 = require("../modal");
var CategoryService_1 = require("../services/CategoryService");
var Category_1 = require("../model/Category");
var CategoryMapper_1 = require("../mapper/CategoryMapper");
var DaysEnum_1 = require("../utils/DaysEnum");
var UserNormal_1 = require("../model/UserNormal");
var UserEmpresa_1 = require("../model/UserEmpresa");
var Perido_1 = require("../model/Perido");
var Camera_service_1 = require("../services/Camera.service");
var appSettings = require("tns-core-modules/application-settings");
var UserMapper_1 = require("../mapper/UserMapper");
var UserLoged_1 = require("../utils/UserLoged");
var MapsService_1 = require("../services/MapsService");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, _cameraService, _userService, _categoryService, _mapService, routerExtensions, renderer) {
        this._page = _page;
        this._cameraService = _cameraService;
        this._userService = _userService;
        this._categoryService = _categoryService;
        this._mapService = _mapService;
        this.routerExtensions = routerExtensions;
        this.renderer = renderer;
        this.isLogin = true;
        this.formSubmitted = false;
        this.navigating = false;
        this.loginTxt = "L o g i n";
        this.verHorarios = true;
        this.userData = new UserData_1.UserData();
        this.userNormal = new UserNormal_1.UserNormal();
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
        this.enumTipoUsuario = TypeUser_1.TypeUser;
        this.enumDias = Object.keys(DaysEnum_1.DaysEnum);
        this.selectedIndex = 0;
        this.selectedDay = 0;
        this.selectedCategory = 0;
        this.items = ["Si", "No"];
        this.categorysNames = [];
        this.categorys = [];
        this.periodos = [];
        this.direccion = "";
        this.email = "";
        this.pass = "";
        this.codigo = "";
        this.newCategory = new Category_1.Category();
        this.imageSlider = ["https://lorempixel.com/800/600/city/2/", "https://lorempixel.com/800/600/nightlife/6/", "https://lorempixel.com/800/600/nightlife/5/"];
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.on('navigatingTo', function (data) {
            _this.circleItem.scaleX = 0;
            _this.circleItem.scaleY = 0;
            _this.navigating = false;
            _this.logoItem.translateY = 0;
        });
        this._page.actionBarHidden = true;
        this.btnItem = this.btnRef.nativeElement;
        this.loginLayout = this.angularLogin.nativeElement;
        this.regsiterLayout = this.angularRegister.nativeElement;
        this.circleItem = this.circleRef.nativeElement;
        this.logoItem = this.logoRef.nativeElement;
        this.content = this.angularContent.nativeElement;
        this.cabecera = this.angularCabecera.nativeElement;
        this.horaInicio = this.angularhoraInicio.nativeElement;
        this.horaFin = this.angularhoraFin.nativeElement;
        this.regsiterLayout.scaleY = 0;
        this.regsiterLayout.scaleX = 0;
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        if (appSettings.getString("tokenUser", "") != "") {
            this.irACalendar();
        }
    };
    HomePageComponent.prototype.onMapReady = function (args) {
        var _this = this;
        this.map.nativeElement.setOnMapClickListener(function (point) {
            _this.userData.latitud = String(point.lat);
            _this.userData.longitud = String(point.lng);
            _this.map.nativeElement.removeMarkers();
            _this.map.nativeElement.addMarkers([
                {
                    lat: point.lat,
                    lng: point.lng
                }
            ]);
            _this._mapService.getDirection(point.lat, point.lng).subscribe(function (dir) {
                console.log(dir);
                _this.userData.direccion = dir["results"][0]["address_components"][1]["long_name"];
            }, function (err) {
                console.log(err);
            });
        });
    };
    HomePageComponent.prototype.abrirMapa = function () {
        var _this = this;
        this.modalOpenMap.show();
        this.map.nativeElement.getUserLocation().then(function (user) {
            _this.map.nativeElement.animateCamera({
                // this is where we animate to
                target: {
                    lat: user.location.lat,
                    lng: user.location.lng
                },
                zoomLevel: 12,
                duration: 4000 // default 10000 (milliseconds)
            });
        });
    };
    HomePageComponent.prototype.direccionRegistro = function () {
        var _this = this;
        console.log("click boton buscar");
        console.log(this.direccion);
        this._mapService.getCoordinates(this.direccion).subscribe(function (resp) {
            console.log(resp);
            var latitud = resp["results"][0]["geometry"]["location"]["lat"];
            var longitud = resp["results"][0]["geometry"]["location"]["lng"];
            _this.map.nativeElement.removeMarkers();
            _this.map.nativeElement.addMarkers([
                {
                    lat: latitud,
                    lng: longitud
                }
            ]);
            _this.map.nativeElement.animateCamera({
                // this is where we animate to
                target: {
                    lat: latitud,
                    lng: longitud
                },
                zoomLevel: 12,
                duration: 4000 // default 10000 (milliseconds)
            });
            _this._mapService.getDirection(latitud, longitud).subscribe(function (resp) {
                _this.userData.direccion = resp["results"][0]["address_components"][1]["long_name"] + ", " + resp["results"][0]["address_components"][3]["long_name"];
            }, function (err) {
                console.log(err);
            });
            _this.userData.latitud = latitud;
            _this.userData.longitud = longitud;
        }, function (err) {
            console.log(err);
        });
    };
    HomePageComponent.prototype.choseTypeUser = function () {
        var _this = this;
        dialogs.action({
            message: "Tipo de usuario",
            actions: Object.keys(TypeUser_1.TypeUser)
        }).then(function (result) {
            _this.tipoUsuario = TypeUser_1.TypeUser[result];
        });
    };
    HomePageComponent.prototype.eliminarPeriodo = function (i) {
        var perido = this.periodos[i];
        this.userEmpresa.periodos = this.userEmpresa.periodos.filter(function (obj) { return !obj.equals(perido); });
        this.searchPeriods();
    };
    HomePageComponent.prototype.addNewHorario = function () {
        var perido = new Perido_1.Periodo();
        perido.dia = DaysEnum_1.DaysEnum[this.enumDias[this.selectedDay]];
        perido.empiezaHora = this.horaInicio.hour;
        perido.empiezaMinuto = this.horaInicio.minute;
        perido.acabaHora = this.horaFin.hour;
        perido.acabaMinuto = this.horaFin.minute;
        if (this.userEmpresa.periodos.filter(function (per) { return per.estaDentro(perido); }).length == 0) {
            this.userEmpresa.periodos.push(perido);
            this.searchPeriods();
            this.modalNewPeriodo.hide();
            this.modalAddHorario.show();
        }
        else {
            FeedBack_1.FeedBack.feedBackError("No pudes poner un perido dentro de otro...");
        }
    };
    HomePageComponent.prototype.addPhotoEmpresaCamera = function () {
        var _this = this;
        var options = {
            width: 200,
            height: 200,
            keepAspectRatio: true,
            saveToGallery: false,
            cameraFacing: "front"
        };
        this._cameraService.pickPhoto(options).then(function (resp) {
            _this.addPhotoEmpresaToUser(resp);
        }, function (err) {
            console.log(err);
        });
    };
    HomePageComponent.prototype.choseMapDirection = function () {
        this.routerExtensions.navigateByUrl("route");
    };
    HomePageComponent.prototype.addPhotoEmpresaGallery = function () {
        var _this = this;
        this._cameraService.selectGaleryPhoto().then(function (resp) {
            _this.addPhotoEmpresaToUser(resp);
        });
    };
    HomePageComponent.prototype.addPhotoEmpresaToUser = function (resp) {
        console.log("foto añadida a array: " + resp["base64"]);
        this.userEmpresa.fotosEmpresa.push(resp["base64"]);
        this.imageSlider.push(resp["image"]);
        this.modalAddPhotoEmpresa.hide();
    };
    HomePageComponent.prototype.selectPhoto = function () {
        var _this = this;
        dialogs.action({
            message: "Escoge una opcion",
            cancelButtonText: "Cancelar",
            actions: ["Camara", "Galeria"]
        }).then(function (result) {
            result == "Camara" ? _this.pickPhoto() : _this.selectGaleryPhoto();
        });
    };
    HomePageComponent.prototype.pickPhoto = function () {
        var _this = this;
        var options = {
            width: 200,
            height: 200,
            keepAspectRatio: true,
            saveToGallery: false,
            cameraFacing: "front"
        };
        this._cameraService.pickPhoto(options).then(function (resp) {
            _this.ponerFoto(resp);
        }, function (err) {
            console.log(err);
        });
    };
    HomePageComponent.prototype.selectGaleryPhoto = function () {
        var _this = this;
        this._cameraService.selectGaleryPhoto().then(function (resp) {
            _this.ponerFoto(resp);
        });
    };
    HomePageComponent.prototype.ponerFoto = function (resp) {
        if (this.tipoUsuario == undefined) {
            this.userData.foto = resp["base64"];
        }
        else {
            if (this.tipoUsuario == "empresa") {
                this.userEmpresa.foto = resp["base64"];
            }
            else {
                this.userNormal.foto = resp["base64"];
            }
        }
        this.imagen = resp["image"];
    };
    HomePageComponent.prototype.searchPeriods = function () {
        var _this = this;
        this.periodos = this.userEmpresa.periodos.filter(function (perido) { return perido.dia == DaysEnum_1.DaysEnum[_this.enumDias[_this.selectedDay]]; });
    };
    HomePageComponent.prototype.searchPeriodsByDay = function (dia) {
        return this.userEmpresa.periodos.filter(function (perido) { return perido.dia == DaysEnum_1.DaysEnum[dia]; });
    };
    HomePageComponent.prototype.onTimeChangedInicio = function (args) {
        var timePicker = args.object;
        this.horaFin.hour = timePicker.hour == 23 ? 0 : timePicker.hour + 1;
        this.horaFin.minute = timePicker.minute;
    };
    HomePageComponent.prototype.onTimeChangedFin = function (args) {
        var timePicker = args.object;
        if (timePicker.hour < this.horaInicio.hour && timePicker.hour != 0) {
            timePicker.hour = this.horaInicio.hour;
        }
        if (timePicker.hour == this.horaInicio.hour && (timePicker.minute - 5) < this.horaInicio.minute) {
            timePicker.minute = this.horaInicio.minute + 5;
        }
    };
    HomePageComponent.prototype.choseCategory = function () {
        var _this = this;
        this._categoryService.getCategorys().subscribe(function (ok) {
            _this.categorys = CategoryMapper_1.CategoryMapper.categoryJSONToCategory(ok);
            _this.updateCategorysNames();
            _this.modalChoseCategory.show();
        }, function (error) {
            FeedBack_1.FeedBack.feedBackError("Error de conexión...");
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    HomePageComponent.prototype.updateCategorysNames = function () {
        var _this = this;
        this.categorysNames = [];
        this.categorysNames.push("Categoria sin definir");
        this.categorys.forEach(function (cat) { _this.categorysNames.push(cat.nombre); });
    };
    HomePageComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        this.selectedDay = picker.selectedIndex;
        this.searchPeriods();
    };
    HomePageComponent.prototype.irACalendar = function () {
        var _this = this;
        this._userService.getUser().subscribe(function (ok) {
            if (ok["user"] !== "null") {
                UserLoged_1.UserLoged.getInstance().setUserLoged(UserMapper_1.UserMapper.userJSONToUserData(ok['user'], ok['userTipoData']));
                _this.content.height = 0;
                _this.cabecera.height = 1000;
                _this.logoItem.animate({
                    translate: { x: 0, y: 300 },
                    scale: { x: 1.8, y: 1.8 },
                    duration: 400
                }).then(function () {
                    _this.circleItem.translateY = 200;
                    _this.circleItem.animate({
                        scale: { x: 15, y: 15 },
                        duration: 400,
                    }).then(function () {
                        _this.routerExtensions.navigateByUrl("calendar", { clearHistory: true });
                        _this.formSubmitted = false;
                    });
                });
            }
            else {
                _this.formSubmitted = false;
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    HomePageComponent.prototype.onButtonTap = function () {
        var _this = this;
        this.formSubmitted = true;
        if (this.isLogin) {
            this._userService.logUser(this.email, this.pass).subscribe(function (ok) {
                if (ok["token"] !== "null") {
                    appSettings.setString("tokenUser", ok["token"]);
                    _this.navigating = true;
                    _this.irACalendar();
                }
                else {
                    _this.formSubmitted = false;
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (error) {
                FeedBack_1.FeedBack.feedBackError("Error de conexión...");
                console.log("ERROR PMV -> ");
                console.log(error);
            });
        }
        else {
            if (this.tipoUsuario == TypeUser_1.TypeUser.Empresa) {
                this.userEmpresa.passData(this.userData);
                this.userEmpresa.direccionFija = this.selectedIndex == 0;
            }
            else if (this.tipoUsuario == TypeUser_1.TypeUser.Normal) {
                this.userNormal.passData(this.userData);
            }
            this._userService.registerUser(this.tipoUsuario == TypeUser_1.TypeUser.Empresa ? this.userEmpresa : this.userNormal).subscribe(function (ok) {
                if (ok["idUser"] !== "null") {
                    _this.formSubmitted = false;
                    _this.modalVerificarCodigo.show();
                }
                else {
                    _this.formSubmitted = false;
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (erro) {
                console.log("ERROR PMV");
                console.log(erro);
            });
        }
    };
    HomePageComponent.prototype.verificarCodigo = function () {
        var _this = this;
        this._userService.verificarCodigo(this.email, this.codigo).subscribe(function (ok) {
            if (ok["code"] == true) {
                _this.modalVerificarCodigo.hide();
                FeedBack_1.FeedBack.feedBackSucces("Cuenta verificada Corectamente");
                _this.setToLogin();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    HomePageComponent.prototype.categorySelected = function () {
        this.userEmpresa.category = this.categorys[this.selectedCategory - 1];
        this.modalChoseCategory.hide();
    };
    HomePageComponent.prototype.addCategory = function () {
        var _this = this;
        this._categoryService.addCategory(this.newCategory).subscribe(function (ok) {
            if (ok["categorys"] !== "null") {
                _this.categorys = CategoryMapper_1.CategoryMapper.categoryJSONToCategory(ok);
                _this.updateCategorysNames();
                _this.modalNewCategory.hide();
                _this.modalChoseCategory.show();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                _this.modalNewCategory.show();
            }
        }, function (error) {
            FeedBack_1.FeedBack.feedBackError("Error de conexión...");
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    HomePageComponent.prototype.onDateChanged = function (args) {
        this.userNormal.fechaNacimiento = args.value;
        this.userNormal.fechaNacimiento.setHours(2);
    };
    HomePageComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var now = new Date();
        datePicker.year = now.getFullYear() - 31;
        datePicker.month = 8;
        datePicker.day = 8;
        datePicker.minDate = new Date(now.getFullYear() - 100, 0, 0);
        datePicker.maxDate = new Date(now.getFullYear() - 6, 12, 31);
    };
    HomePageComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
        }
    };
    HomePageComponent.prototype.setToLogin = function () {
        var _this = this;
        this.content.animate({
            translate: { x: 0, y: 0 },
            duration: 150
        }).then(function () {
            _this.isLogin = true;
            _this.loginTxt = "L o g i n";
            _this.logoItem.animate({
                scale: { x: 1, y: 1 },
                duration: 150
            }).then(function () {
                _this.regsiterLayout.animate({
                    scale: { x: 0, y: 0 },
                    duration: 300
                }).then(function () {
                    _this.btnItem.animate({
                        translate: { x: 0, y: 0 },
                        duration: 200
                    }).then(function () {
                        _this.loginLayout.animate({ scale: { x: 1, y: 1 }, duration: 200 });
                    });
                });
            });
        });
    };
    HomePageComponent.prototype.setToRegister = function () {
        var _this = this;
        this.logoItem.animate({
            scale: { x: 0, y: 0 },
            duration: 150
        }).then(function () {
            _this.regsiterLayout.animate({
                scale: { x: 1, y: 1 },
                duration: 150
            }).then(function () {
                _this.content.animate({
                    translate: { x: 0, y: -35 },
                    duration: 200
                });
                _this.isLogin = false;
                _this.loginTxt = "R e g i s t r a r";
            });
        });
    };
    __decorate([
        core_1.ViewChild("register"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularRegister", void 0);
    __decorate([
        core_1.ViewChild("btn"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "btnRef", void 0);
    __decorate([
        core_1.ViewChild("circle"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "circleRef", void 0);
    __decorate([
        core_1.ViewChild("logo"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "logoRef", void 0);
    __decorate([
        core_1.ViewChild("login"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularLogin", void 0);
    __decorate([
        core_1.ViewChild("content"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularContent", void 0);
    __decorate([
        core_1.ViewChild("cabecera"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularCabecera", void 0);
    __decorate([
        core_1.ViewChild("horaInicio"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularhoraInicio", void 0);
    __decorate([
        core_1.ViewChild("horaFin"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularhoraFin", void 0);
    __decorate([
        core_1.ViewChild("modalNewCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalNewCategory", void 0);
    __decorate([
        core_1.ViewChild("modalChoseCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalChoseCategory", void 0);
    __decorate([
        core_1.ViewChild("modalNewPeriodo"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalNewPeriodo", void 0);
    __decorate([
        core_1.ViewChild("modalAddHorario"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalAddHorario", void 0);
    __decorate([
        core_1.ViewChild("modalVerificarCodigo"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalVerificarCodigo", void 0);
    __decorate([
        core_1.ViewChild("modalAddPhotoEmpresa"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalAddPhotoEmpresa", void 0);
    __decorate([
        core_1.ViewChild("modalOpenMap"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalOpenMap", void 0);
    __decorate([
        core_1.ViewChild("map"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "map", void 0);
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'ns-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService, CategoryService_1.CategoryService, Camera_service_1.CameraService, MapsService_1.MapsService]
        }),
        __metadata("design:paramtypes", [page_1.Page, Camera_service_1.CameraService, UserService_1.UserService, CategoryService_1.CategoryService, MapsService_1.MapsService, router_1.RouterExtensions, core_1.Renderer2])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEY7QUFDNUYsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBQzdDLHFEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsOENBQTZDO0FBQzdDLGtDQUEwQztBQUMxQywrREFBOEQ7QUFDOUQsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCw4Q0FBNkM7QUFDN0Msa0RBQWlEO0FBRWpELG9EQUFtRDtBQUNuRCwwQ0FBMEM7QUFJMUMsNkRBQTJEO0FBQzNELG1FQUFxRTtBQUNyRSxtREFBa0Q7QUFDbEQsZ0RBQStDO0FBRS9DLHVEQUFzRDtBQVN0RDtJQWtFRSwyQkFBb0IsS0FBVyxFQUFVLGNBQTZCLEVBQVUsWUFBeUIsRUFBVSxnQkFBaUMsRUFBVSxXQUF3QixFQUFVLGdCQUFrQyxFQUFVLFFBQW1CO1FBQTNPLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFwQy9QLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFHdkIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBUSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3BDLGVBQVUsR0FBZSxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUMxQyxnQkFBVyxHQUFn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QUFDO1NBQ3RFLENBQUM7eUNBbUUyQixXQUFJLEVBQTBCLDhCQUFhLEVBQXdCLHlCQUFXLEVBQTRCLGlDQUFlLEVBQXVCLHlCQUFXLEVBQTRCLHlCQUFnQixFQUFvQixnQkFBUztPQWxFcFAsaUJBQWlCLENBbWlCN0I7SUFBRCx3QkFBQztDQUFBLEFBbmlCRCxJQW1pQkM7QUFuaUJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIFJlbmRlcmVyMiwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWV3LCBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tICcuLi91dGlscy9GZWVkQmFjayc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFR5cGVVc2VyIH0gZnJvbSAnLi4vdXRpbHMvVHlwZVVzZXInO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICcuLi9tb2RlbC9Vc2VyRGF0YSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL21vZGFsJztcbmltcG9ydCB7IENhdGVnb3J5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL0NhdGVnb3J5U2VydmljZSc7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uL21vZGVsL0NhdGVnb3J5JztcbmltcG9ydCB7IENhdGVnb3J5TWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL0NhdGVnb3J5TWFwcGVyJztcbmltcG9ydCB7IERheXNFbnVtIH0gZnJvbSAnLi4vdXRpbHMvRGF5c0VudW0nO1xuaW1wb3J0IHsgVXNlck5vcm1hbCB9IGZyb20gJy4uL21vZGVsL1VzZXJOb3JtYWwnO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBVc2VyRW1wcmVzYSB9IGZyb20gJy4uL21vZGVsL1VzZXJFbXByZXNhJztcbmltcG9ydCB7IFBlcmlvZG8gfSBmcm9tICcuLi9tb2RlbC9QZXJpZG8nO1xuaW1wb3J0IHsgVGltZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGltZS1waWNrZXIvdGltZS1waWNrZXInO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXInO1xuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XG5pbXBvcnQgeyBDYW1lcmFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQ2FtZXJhLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFVzZXJNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvVXNlck1hcHBlcic7XG5pbXBvcnQgeyBVc2VyTG9nZWQgfSBmcm9tICcuLi91dGlscy9Vc2VyTG9nZWQnO1xuaW1wb3J0IHsgTGF0TG5nIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW1hcGJveCc7XG5pbXBvcnQgeyBNYXBzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL01hcHNTZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtaG9tZS1wYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUtcGFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hvbWUtcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlLCBDYXRlZ29yeVNlcnZpY2UsIENhbWVyYVNlcnZpY2UsIE1hcHNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJyZWdpc3RlclwiKSBhbmd1bGFyUmVnaXN0ZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiY2lyY2xlXCIpIGNpcmNsZVJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ29cIikgbG9nb1JlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ2luXCIpIGFuZ3VsYXJMb2dpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNvbnRlbnRcIikgYW5ndWxhckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjYWJlY2VyYVwiKSBhbmd1bGFyQ2FiZWNlcmE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJob3JhSW5pY2lvXCIpIGFuZ3VsYXJob3JhSW5pY2lvOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiaG9yYUZpblwiKSBhbmd1bGFyaG9yYUZpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm1vZGFsTmV3Q2F0ZWdvcnlcIikgbW9kYWxOZXdDYXRlZ29yeTogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbENob3NlQ2F0ZWdvcnlcIikgbW9kYWxDaG9zZUNhdGVnb3J5OiBNb2RhbENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChcIm1vZGFsTmV3UGVyaW9kb1wiKSBtb2RhbE5ld1BlcmlvZG86IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxBZGRIb3JhcmlvXCIpIG1vZGFsQWRkSG9yYXJpbzogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbFZlcmlmaWNhckNvZGlnb1wiKSBtb2RhbFZlcmlmaWNhckNvZGlnbzogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbEFkZFBob3RvRW1wcmVzYVwiKSBtb2RhbEFkZFBob3RvRW1wcmVzYTogTW9kYWxDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZChcIm1vZGFsT3Blbk1hcFwiKSBtb2RhbE9wZW5NYXA6IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibWFwXCIpIG1hcDogRWxlbWVudFJlZjtcblxuICBsb2dpbkxheW91dDogVmlldztcbiAgcmVnc2l0ZXJMYXlvdXQ6IFZpZXc7XG4gIGJ0bkl0ZW06IFZpZXc7XG4gIGNpcmNsZUl0ZW06IFZpZXc7XG4gIGxvZ29JdGVtOiBWaWV3O1xuICBjb250ZW50OiBWaWV3O1xuICBjYWJlY2VyYTogVmlldztcbiAgaG9yYUluaWNpbzogVGltZVBpY2tlcjtcbiAgaG9yYUZpbjogVGltZVBpY2tlcjtcblxuICBpc0xvZ2luID0gdHJ1ZTtcbiAgZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICBuYXZpZ2F0aW5nID0gZmFsc2U7XG4gIGxvZ2luVHh0ID0gXCJMIG8gZyBpIG5cIjtcblxuICB0aXBvVXN1YXJpbzogVHlwZVVzZXI7XG4gIHZlckhvcmFyaW9zOiBib29sZWFuID0gdHJ1ZTtcblxuICB1c2VyRGF0YTogVXNlckRhdGEgPSBuZXcgVXNlckRhdGEoKTtcbiAgdXNlck5vcm1hbDogVXNlck5vcm1hbCA9IG5ldyBVc2VyTm9ybWFsKCk7XG4gIHVzZXJFbXByZXNhOiBVc2VyRW1wcmVzYSA9IG5ldyBVc2VyRW1wcmVzYSgpO1xuXG4gIGVudW1UaXBvVXN1YXJpbyA9IFR5cGVVc2VyO1xuICBlbnVtRGlhcyA9IE9iamVjdC5rZXlzKERheXNFbnVtKTtcblxuICBzZWxlY3RlZEluZGV4ID0gMDtcbiAgc2VsZWN0ZWREYXkgPSAwO1xuICBzZWxlY3RlZENhdGVnb3J5ID0gMDtcbiAgaXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXCJTaVwiLCBcIk5vXCJdO1xuICBjYXRlZ29yeXNOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjYXRlZ29yeXM6IENhdGVnb3J5W10gPSBbXTtcblxuICBwZXJpb2RvczogUGVyaW9kb1tdID0gW107XG5cbiAgaW1hZ2VuOiBhbnk7XG5cbiAgZGlyZWNjaW9uID0gXCJcIjtcblxuICBlbWFpbCA9IFwiXCI7XG4gIHBhc3MgPSBcIlwiO1xuICBjb2RpZ28gPSBcIlwiO1xuXG4gIG5ld0NhdGVnb3J5OiBDYXRlZ29yeSA9IG5ldyBDYXRlZ29yeSgpO1xuXG4gIGltYWdlU2xpZGVyOiBTdHJpbmdbXSA9IFtcImh0dHBzOi8vbG9yZW1waXhlbC5jb20vODAwLzYwMC9jaXR5LzIvXCIsIFwiaHR0cHM6Ly9sb3JlbXBpeGVsLmNvbS84MDAvNjAwL25pZ2h0bGlmZS82L1wiLCBcImh0dHBzOi8vbG9yZW1waXhlbC5jb20vODAwLzYwMC9uaWdodGxpZmUvNS9cIl07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfY2FtZXJhU2VydmljZTogQ2FtZXJhU2VydmljZSwgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIF9jYXRlZ29yeVNlcnZpY2U6IENhdGVnb3J5U2VydmljZSwgcHJpdmF0ZSBfbWFwU2VydmljZTogTWFwc1NlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlLm9uKCduYXZpZ2F0aW5nVG8nLCAoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVZID0gMDtcbiAgICAgIHRoaXMubmF2aWdhdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5sb2dvSXRlbS50cmFuc2xhdGVZID0gMDtcbiAgICB9KVxuICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLmJ0bkl0ZW0gPSB0aGlzLmJ0blJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubG9naW5MYXlvdXQgPSB0aGlzLmFuZ3VsYXJMb2dpbi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQgPSB0aGlzLmFuZ3VsYXJSZWdpc3Rlci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY2lyY2xlSXRlbSA9IHRoaXMuY2lyY2xlUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dvSXRlbSA9IHRoaXMubG9nb1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuYW5ndWxhckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNhYmVjZXJhID0gdGhpcy5hbmd1bGFyQ2FiZWNlcmEubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuaG9yYUluaWNpbyA9IHRoaXMuYW5ndWxhcmhvcmFJbmljaW8ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmhvcmFGaW4gPSB0aGlzLmFuZ3VsYXJob3JhRmluLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWSA9IDA7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dC5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuXG4gICAgaWYgKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKSAhPSBcIlwiKSB7XG4gICAgICB0aGlzLmlyQUNhbGVuZGFyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uTWFwUmVhZHkoYXJnczogYW55KSB7XG5cbiAgICB0aGlzLm1hcC5uYXRpdmVFbGVtZW50LnNldE9uTWFwQ2xpY2tMaXN0ZW5lcigocG9pbnQ6IExhdExuZykgPT4ge1xuICAgICAgdGhpcy51c2VyRGF0YS5sYXRpdHVkID0gU3RyaW5nKHBvaW50LmxhdCk7XG4gICAgICB0aGlzLnVzZXJEYXRhLmxvbmdpdHVkID0gU3RyaW5nKHBvaW50LmxuZyk7XG4gICAgICB0aGlzLm1hcC5uYXRpdmVFbGVtZW50LnJlbW92ZU1hcmtlcnMoKTtcbiAgICAgIHRoaXMubWFwLm5hdGl2ZUVsZW1lbnQuYWRkTWFya2VycyhbXG4gICAgICAgIHtcbiAgICAgICAgICBsYXQ6IHBvaW50LmxhdCxcbiAgICAgICAgICBsbmc6IHBvaW50LmxuZ1xuICAgICAgICB9XG4gICAgICBdKVxuICAgICAgdGhpcy5fbWFwU2VydmljZS5nZXREaXJlY3Rpb24ocG9pbnQubGF0LCBwb2ludC5sbmcpLnN1YnNjcmliZShcbiAgICAgICAgKGRpcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRpcik7XG4gICAgICAgICAgdGhpcy51c2VyRGF0YS5kaXJlY2Npb24gPSBkaXJbXCJyZXN1bHRzXCJdWzBdW1wiYWRkcmVzc19jb21wb25lbnRzXCJdWzFdW1wibG9uZ19uYW1lXCJdXG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgfVxuXG4gIGFicmlyTWFwYSgpIHtcbiAgICB0aGlzLm1vZGFsT3Blbk1hcC5zaG93KClcbiAgICB0aGlzLm1hcC5uYXRpdmVFbGVtZW50LmdldFVzZXJMb2NhdGlvbigpLnRoZW4oXG4gICAgICAodXNlcikgPT4ge1xuICAgICAgICB0aGlzLm1hcC5uYXRpdmVFbGVtZW50LmFuaW1hdGVDYW1lcmEoe1xuICAgICAgICAgIC8vIHRoaXMgaXMgd2hlcmUgd2UgYW5pbWF0ZSB0b1xuICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgbGF0OiB1c2VyLmxvY2F0aW9uLmxhdCxcbiAgICAgICAgICAgIGxuZzogdXNlci5sb2NhdGlvbi5sbmdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHpvb21MZXZlbDogMTIsIC8vIEFuZHJvaWRcbiAgICAgICAgICBkdXJhdGlvbjogNDAwMCAvLyBkZWZhdWx0IDEwMDAwIChtaWxsaXNlY29uZHMpXG4gICAgICAgIH0pXG4gICAgICB9KTtcblxuICB9XG5cbiAgZGlyZWNjaW9uUmVnaXN0cm8oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGljayBib3RvbiBidXNjYXJcIik7XG4gICAgY29uc29sZS5sb2codGhpcy5kaXJlY2Npb24pO1xuICAgIHRoaXMuX21hcFNlcnZpY2UuZ2V0Q29vcmRpbmF0ZXModGhpcy5kaXJlY2Npb24pLnN1YnNjcmliZShcbiAgICAocmVzcCk9PntcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgICAgdmFyIGxhdGl0dWQgPSByZXNwW1wicmVzdWx0c1wiXVswXVtcImdlb21ldHJ5XCJdW1wibG9jYXRpb25cIl1bXCJsYXRcIl07XG4gICAgICB2YXIgbG9uZ2l0dWQgPSByZXNwW1wicmVzdWx0c1wiXVswXVtcImdlb21ldHJ5XCJdW1wibG9jYXRpb25cIl1bXCJsbmdcIl07XG4gICAgICB0aGlzLm1hcC5uYXRpdmVFbGVtZW50LnJlbW92ZU1hcmtlcnMoKTtcbiAgICAgIHRoaXMubWFwLm5hdGl2ZUVsZW1lbnQuYWRkTWFya2VycyhbXG4gICAgICAgIHtcbiAgICAgICAgICBsYXQ6IGxhdGl0dWQsXG4gICAgICAgICAgbG5nOiBsb25naXR1ZFxuICAgICAgICB9XG4gICAgICBdKVxuICAgICAgdGhpcy5tYXAubmF0aXZlRWxlbWVudC5hbmltYXRlQ2FtZXJhKHtcbiAgICAgICAgLy8gdGhpcyBpcyB3aGVyZSB3ZSBhbmltYXRlIHRvXG4gICAgICAgIHRhcmdldDoge1xuICAgICAgICAgIGxhdDogbGF0aXR1ZCxcbiAgICAgICAgICBsbmc6IGxvbmdpdHVkXG4gICAgICAgIH0sXG4gICAgICAgIHpvb21MZXZlbDogMTIsIC8vIEFuZHJvaWRcbiAgICAgICAgZHVyYXRpb246IDQwMDAgLy8gZGVmYXVsdCAxMDAwMCAobWlsbGlzZWNvbmRzKVxuICAgICAgfSlcbiAgICAgIHRoaXMuX21hcFNlcnZpY2UuZ2V0RGlyZWN0aW9uKGxhdGl0dWQsbG9uZ2l0dWQpLnN1YnNjcmliZShcbiAgICAgICAgKHJlc3ApPT57XG4gICAgICAgICAgdGhpcy51c2VyRGF0YS5kaXJlY2Npb24gPSByZXNwW1wicmVzdWx0c1wiXVswXVtcImFkZHJlc3NfY29tcG9uZW50c1wiXVsxXVtcImxvbmdfbmFtZVwiXSArIFwiLCBcIisgcmVzcFtcInJlc3VsdHNcIl1bMF1bXCJhZGRyZXNzX2NvbXBvbmVudHNcIl1bM11bXCJsb25nX25hbWVcIl07XG4gICAgICAgIH0sXG4gICAgICAgIChlcnIpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXNlckRhdGEubGF0aXR1ZCA9IGxhdGl0dWQ7XG4gICAgICAgIHRoaXMudXNlckRhdGEubG9uZ2l0dWQgPSBsb25naXR1ZDtcbiAgICB9LFxuICAgIChlcnIpPT57XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hvc2VUeXBlVXNlcigpIHtcbiAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICBtZXNzYWdlOiBcIlRpcG8gZGUgdXN1YXJpb1wiLFxuICAgICAgYWN0aW9uczogT2JqZWN0LmtleXMoVHlwZVVzZXIpXG4gICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgdGhpcy50aXBvVXN1YXJpbyA9IFR5cGVVc2VyW3Jlc3VsdF07XG4gICAgfSk7XG4gIH1cblxuICBlbGltaW5hclBlcmlvZG8oaTogbnVtYmVyKSB7XG4gICAgbGV0IHBlcmlkbyA9IHRoaXMucGVyaW9kb3NbaV07XG4gICAgdGhpcy51c2VyRW1wcmVzYS5wZXJpb2RvcyA9IHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKG9iaiA9PiAhb2JqLmVxdWFscyhwZXJpZG8pKTtcbiAgICB0aGlzLnNlYXJjaFBlcmlvZHMoKTtcbiAgfVxuXG4gIGFkZE5ld0hvcmFyaW8oKSB7XG4gICAgbGV0IHBlcmlkbzogUGVyaW9kbyA9IG5ldyBQZXJpb2RvKCk7XG4gICAgcGVyaWRvLmRpYSA9IERheXNFbnVtW3RoaXMuZW51bURpYXNbdGhpcy5zZWxlY3RlZERheV1dO1xuICAgIHBlcmlkby5lbXBpZXphSG9yYSA9IHRoaXMuaG9yYUluaWNpby5ob3VyO1xuICAgIHBlcmlkby5lbXBpZXphTWludXRvID0gdGhpcy5ob3JhSW5pY2lvLm1pbnV0ZTtcbiAgICBwZXJpZG8uYWNhYmFIb3JhID0gdGhpcy5ob3JhRmluLmhvdXI7XG4gICAgcGVyaWRvLmFjYWJhTWludXRvID0gdGhpcy5ob3JhRmluLm1pbnV0ZTtcblxuICAgIGlmICh0aGlzLnVzZXJFbXByZXNhLnBlcmlvZG9zLmZpbHRlcihwZXIgPT4gcGVyLmVzdGFEZW50cm8ocGVyaWRvKSkubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MucHVzaChwZXJpZG8pO1xuXG4gICAgICB0aGlzLnNlYXJjaFBlcmlvZHMoKTtcbiAgICAgIHRoaXMubW9kYWxOZXdQZXJpb2RvLmhpZGUoKTtcbiAgICAgIHRoaXMubW9kYWxBZGRIb3JhcmlvLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIk5vIHB1ZGVzIHBvbmVyIHVuIHBlcmlkbyBkZW50cm8gZGUgb3Ryby4uLlwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRQaG90b0VtcHJlc2FDYW1lcmEoKSB7XG4gICAgbGV0IG9wdGlvbnM6IGNhbWVyYS5DYW1lcmFPcHRpb25zID0ge1xuICAgICAgd2lkdGg6IDIwMCxcbiAgICAgIGhlaWdodDogMjAwLFxuICAgICAga2VlcEFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgc2F2ZVRvR2FsbGVyeTogZmFsc2UsXG4gICAgICBjYW1lcmFGYWNpbmc6IFwiZnJvbnRcIlxuICAgIH07XG5cbiAgICB0aGlzLl9jYW1lcmFTZXJ2aWNlLnBpY2tQaG90byhvcHRpb25zKS50aGVuKFxuICAgICAgKHJlc3ApID0+IHtcbiAgICAgICAgdGhpcy5hZGRQaG90b0VtcHJlc2FUb1VzZXIocmVzcCk7XG4gICAgICB9LFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjaG9zZU1hcERpcmVjdGlvbigpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcInJvdXRlXCIpO1xuICB9XG5cbiAgYWRkUGhvdG9FbXByZXNhR2FsbGVyeSgpIHtcbiAgICB0aGlzLl9jYW1lcmFTZXJ2aWNlLnNlbGVjdEdhbGVyeVBob3RvKCkudGhlbihcbiAgICAgIChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUGhvdG9FbXByZXNhVG9Vc2VyKHJlc3ApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhZGRQaG90b0VtcHJlc2FUb1VzZXIocmVzcCkge1xuICAgIGNvbnNvbGUubG9nKFwiZm90byBhw7FhZGlkYSBhIGFycmF5OiBcIiArIHJlc3BbXCJiYXNlNjRcIl0pO1xuICAgIHRoaXMudXNlckVtcHJlc2EuZm90b3NFbXByZXNhLnB1c2gocmVzcFtcImJhc2U2NFwiXSk7XG4gICAgdGhpcy5pbWFnZVNsaWRlci5wdXNoKHJlc3BbXCJpbWFnZVwiXSk7XG4gICAgdGhpcy5tb2RhbEFkZFBob3RvRW1wcmVzYS5oaWRlKCk7XG4gIH1cblxuICBzZWxlY3RQaG90bygpIHtcbiAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICBtZXNzYWdlOiBcIkVzY29nZSB1bmEgb3BjaW9uXCIsXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG4gICAgICBhY3Rpb25zOiBbXCJDYW1hcmFcIiwgXCJHYWxlcmlhXCJdXG4gICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgcmVzdWx0ID09IFwiQ2FtYXJhXCIgPyB0aGlzLnBpY2tQaG90bygpIDogdGhpcy5zZWxlY3RHYWxlcnlQaG90bygpO1xuICAgIH0pO1xuICB9XG5cbiAgcGlja1Bob3RvKCkge1xuICAgIGxldCBvcHRpb25zOiBjYW1lcmEuQ2FtZXJhT3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSxcbiAgICAgIHNhdmVUb0dhbGxlcnk6IGZhbHNlLFxuICAgICAgY2FtZXJhRmFjaW5nOiBcImZyb250XCJcbiAgICB9O1xuXG4gICAgdGhpcy5fY2FtZXJhU2VydmljZS5waWNrUGhvdG8ob3B0aW9ucykudGhlbihcbiAgICAgIChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMucG9uZXJGb3RvKHJlc3ApO1xuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2VsZWN0R2FsZXJ5UGhvdG8oKSB7XG4gICAgdGhpcy5fY2FtZXJhU2VydmljZS5zZWxlY3RHYWxlcnlQaG90bygpLnRoZW4oXG4gICAgICAocmVzcCkgPT4ge1xuICAgICAgICB0aGlzLnBvbmVyRm90byhyZXNwKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcG9uZXJGb3RvKHJlc3ApIHtcbiAgICBpZiAodGhpcy50aXBvVXN1YXJpbyA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudXNlckRhdGEuZm90byA9IHJlc3BbXCJiYXNlNjRcIl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnRpcG9Vc3VhcmlvID09IFwiZW1wcmVzYVwiKSB7XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EuZm90byA9IHJlc3BbXCJiYXNlNjRcIl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVzZXJOb3JtYWwuZm90byA9IHJlc3BbXCJiYXNlNjRcIl07XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VuID0gcmVzcFtcImltYWdlXCJdO1xuICB9XG5cbiAgc2VhcmNoUGVyaW9kcygpIHtcbiAgICB0aGlzLnBlcmlvZG9zID0gdGhpcy51c2VyRW1wcmVzYS5wZXJpb2Rvcy5maWx0ZXIocGVyaWRvID0+IHBlcmlkby5kaWEgPT0gRGF5c0VudW1bdGhpcy5lbnVtRGlhc1t0aGlzLnNlbGVjdGVkRGF5XV0pO1xuICB9XG5cbiAgc2VhcmNoUGVyaW9kc0J5RGF5KGRpYTogYW55KTogUGVyaW9kb1tdIHtcbiAgICByZXR1cm4gdGhpcy51c2VyRW1wcmVzYS5wZXJpb2Rvcy5maWx0ZXIocGVyaWRvID0+IHBlcmlkby5kaWEgPT0gRGF5c0VudW1bZGlhXSk7XG4gIH1cblxuICBvblRpbWVDaGFuZ2VkSW5pY2lvKGFyZ3MpIHtcbiAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgdGhpcy5ob3JhRmluLmhvdXIgPSB0aW1lUGlja2VyLmhvdXIgPT0gMjMgPyAwIDogdGltZVBpY2tlci5ob3VyICsgMTtcbiAgICB0aGlzLmhvcmFGaW4ubWludXRlID0gdGltZVBpY2tlci5taW51dGU7XG4gIH1cblxuICBvblRpbWVDaGFuZ2VkRmluKGFyZ3MpIHtcbiAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgaWYgKHRpbWVQaWNrZXIuaG91ciA8IHRoaXMuaG9yYUluaWNpby5ob3VyICYmIHRpbWVQaWNrZXIuaG91ciAhPSAwKSB7XG4gICAgICB0aW1lUGlja2VyLmhvdXIgPSB0aGlzLmhvcmFJbmljaW8uaG91cjtcbiAgICB9XG5cbiAgICBpZiAodGltZVBpY2tlci5ob3VyID09IHRoaXMuaG9yYUluaWNpby5ob3VyICYmICh0aW1lUGlja2VyLm1pbnV0ZSAtIDUpIDwgdGhpcy5ob3JhSW5pY2lvLm1pbnV0ZSkge1xuICAgICAgdGltZVBpY2tlci5taW51dGUgPSB0aGlzLmhvcmFJbmljaW8ubWludXRlICsgNTtcbiAgICB9XG4gIH1cblxuICBjaG9zZUNhdGVnb3J5KCkge1xuICAgIHRoaXMuX2NhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yeXMoKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgdGhpcy5jYXRlZ29yeXMgPSBDYXRlZ29yeU1hcHBlci5jYXRlZ29yeUpTT05Ub0NhdGVnb3J5KG9rKTtcbiAgICAgICAgdGhpcy51cGRhdGVDYXRlZ29yeXNOYW1lcygpO1xuICAgICAgICB0aGlzLm1vZGFsQ2hvc2VDYXRlZ29yeS5zaG93KCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDs24uLi5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WIC0+IFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICB1cGRhdGVDYXRlZ29yeXNOYW1lcygpIHtcbiAgICB0aGlzLmNhdGVnb3J5c05hbWVzID0gW107XG4gICAgdGhpcy5jYXRlZ29yeXNOYW1lcy5wdXNoKFwiQ2F0ZWdvcmlhIHNpbiBkZWZpbmlyXCIpO1xuICAgIHRoaXMuY2F0ZWdvcnlzLmZvckVhY2goY2F0ID0+IHsgdGhpcy5jYXRlZ29yeXNOYW1lcy5wdXNoKGNhdC5ub21icmUpIH0pO1xuICB9XG5cbiAgc2VsZWN0ZWRJbmRleENoYW5nZWQoYXJncykge1xuICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICB0aGlzLnNlbGVjdGVkRGF5ID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XG4gICAgdGhpcy5zZWFyY2hQZXJpb2RzKCk7XG4gIH1cblxuICBpckFDYWxlbmRhcigpIHtcbiAgICB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyKCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmIChva1tcInVzZXJcIl0gIT09IFwibnVsbFwiKSB7XG4gICAgICAgICAgVXNlckxvZ2VkLmdldEluc3RhbmNlKCkuc2V0VXNlckxvZ2VkKFVzZXJNYXBwZXIudXNlckpTT05Ub1VzZXJEYXRhKG9rWyd1c2VyJ10sIG9rWyd1c2VyVGlwb0RhdGEnXSkpO1xuICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSAwO1xuICAgICAgICAgIHRoaXMuY2FiZWNlcmEuaGVpZ2h0ID0gMTAwMDtcbiAgICAgICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDMwMCB9LFxuICAgICAgICAgICAgc2NhbGU6IHsgeDogMS44LCB5OiAxLjggfSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS50cmFuc2xhdGVZID0gMjAwO1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxNSwgeTogMTUgfSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDQwMCxcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcImNhbGVuZGFyXCIsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJybykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uQnV0dG9uVGFwKCkge1xuICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5pc0xvZ2luKSB7XG4gICAgICB0aGlzLl91c2VyU2VydmljZS5sb2dVc2VyKHRoaXMuZW1haWwsIHRoaXMucGFzcykuc3Vic2NyaWJlKFxuICAgICAgICAob2spID0+IHtcbiAgICAgICAgICBpZiAob2tbXCJ0b2tlblwiXSAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInRva2VuVXNlclwiLCBva1tcInRva2VuXCJdKTtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlyQUNhbGVuZGFyKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDs24uLi5cIik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudGlwb1VzdWFyaW8gPT0gVHlwZVVzZXIuRW1wcmVzYSkge1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLnBhc3NEYXRhKHRoaXMudXNlckRhdGEpO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmRpcmVjY2lvbkZpamEgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50aXBvVXN1YXJpbyA9PSBUeXBlVXNlci5Ob3JtYWwpIHtcbiAgICAgICAgdGhpcy51c2VyTm9ybWFsLnBhc3NEYXRhKHRoaXMudXNlckRhdGEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91c2VyU2VydmljZS5yZWdpc3RlclVzZXIodGhpcy50aXBvVXN1YXJpbyA9PSBUeXBlVXNlci5FbXByZXNhID8gdGhpcy51c2VyRW1wcmVzYSA6IHRoaXMudXNlck5vcm1hbCkuc3Vic2NyaWJlKFxuICAgICAgICAob2spID0+IHtcbiAgICAgICAgICBpZiAob2tbXCJpZFVzZXJcIl0gIT09IFwibnVsbFwiKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW9kYWxWZXJpZmljYXJDb2RpZ28uc2hvdygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJybykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHZlcmlmaWNhckNvZGlnbygpIHtcbiAgICB0aGlzLl91c2VyU2VydmljZS52ZXJpZmljYXJDb2RpZ28odGhpcy5lbWFpbCwgdGhpcy5jb2RpZ28pLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZiAoPGJvb2xlYW4+b2tbXCJjb2RlXCJdID09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLm1vZGFsVmVyaWZpY2FyQ29kaWdvLmhpZGUoKTtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja1N1Y2NlcyhcIkN1ZW50YSB2ZXJpZmljYWRhIENvcmVjdGFtZW50ZVwiKTtcbiAgICAgICAgICB0aGlzLnNldFRvTG9naW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjYXRlZ29yeVNlbGVjdGVkKCkge1xuICAgIHRoaXMudXNlckVtcHJlc2EuY2F0ZWdvcnkgPSB0aGlzLmNhdGVnb3J5c1t0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgLSAxXTtcbiAgICB0aGlzLm1vZGFsQ2hvc2VDYXRlZ29yeS5oaWRlKClcbiAgfVxuXG4gIGFkZENhdGVnb3J5KCkge1xuICAgIHRoaXMuX2NhdGVnb3J5U2VydmljZS5hZGRDYXRlZ29yeSh0aGlzLm5ld0NhdGVnb3J5KS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYgKG9rW1wiY2F0ZWdvcnlzXCJdICE9PSBcIm51bGxcIikge1xuICAgICAgICAgIHRoaXMuY2F0ZWdvcnlzID0gQ2F0ZWdvcnlNYXBwZXIuY2F0ZWdvcnlKU09OVG9DYXRlZ29yeShvayk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDYXRlZ29yeXNOYW1lcygpO1xuICAgICAgICAgIHRoaXMubW9kYWxOZXdDYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgdGhpcy5tb2RhbENob3NlQ2F0ZWdvcnkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgdGhpcy5tb2RhbE5ld0NhdGVnb3J5LnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgb25EYXRlQ2hhbmdlZChhcmdzKSB7XG4gICAgdGhpcy51c2VyTm9ybWFsLmZlY2hhTmFjaW1pZW50byA9IGFyZ3MudmFsdWU7XG4gICAgdGhpcy51c2VyTm9ybWFsLmZlY2hhTmFjaW1pZW50by5zZXRIb3VycygyKTtcbiAgfVxuXG4gIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcbiAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgZGF0ZVBpY2tlci55ZWFyID0gbm93LmdldEZ1bGxZZWFyKCkgLSAzMTtcbiAgICBkYXRlUGlja2VyLm1vbnRoID0gODtcbiAgICBkYXRlUGlja2VyLmRheSA9IDg7XG4gICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCkgLSAxMDAsIDAsIDApO1xuICAgIGRhdGVQaWNrZXIubWF4RGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpIC0gNiwgMTIsIDMxKTtcbiAgfVxuXG4gIG9uRm9jdXMoYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMC45O1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDAuOTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuYWN0aW9uID09IFwidXBcIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDE7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMTtcbiAgICB9XG4gIH1cblxuICBzZXRUb0xvZ2luKCkge1xuICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgdGhpcy5sb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG4gICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoe1xuICAgICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYnRuSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwXG4gICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgIHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcbiAgICAgICAgZHVyYXRpb246IDE1MFxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTM1IH0sXG4gICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5UeHQgPSBcIlIgZSBnIGkgcyB0IHIgYSByXCI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19