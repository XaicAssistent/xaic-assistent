"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserService_1 = require("../services/UserService");
var UserMapper_1 = require("../mapper/UserMapper");
var FeedBack_1 = require("../utils/FeedBack");
var permissions = require("nativescript-permissions");
var TNSPhone = require("nativescript-phone");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var CategoryService_1 = require("../services/CategoryService");
var CategoryMapper_1 = require("../mapper/CategoryMapper");
var modal_1 = require("../modal");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(_userService, _page, router, _categoryService) {
        this._userService = _userService;
        this._page = _page;
        this.router = router;
        this._categoryService = _categoryService;
        this.allUsersEmpresa = [];
        this.selectedCategory = 0;
        this.categorysNames = [];
        this.categorys = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this._userService.getAllUserEmpresa().subscribe(function (ok) {
            if (ok["users"] !== "null") {
                _this.allUsersEmpresa = UserMapper_1.UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    SearchComponent.prototype.choseCategory = function () {
        var _this = this;
        this._categoryService.getCategorys().subscribe(function (ok) {
            _this.categorys = CategoryMapper_1.CategoryMapper.categoryJSONToCategory(ok);
            _this.updateCategorysNames();
            _this.modalChoseCategory.show();
        }, function (error) {
            FeedBack_1.FeedBack.feedBackError("Error de conexiÃ³n...");
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    SearchComponent.prototype.categorySelected = function () {
        var _this = this;
        if (this.selectedCategory == 0) {
            this._userService.getAllUserEmpresa().subscribe(function (ok) {
                if (ok["users"] !== "null") {
                    _this.allUsersEmpresa = UserMapper_1.UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
                }
                else {
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this._userService.getUsersEmpresaByCategory(this.selectedCategory).subscribe(function (ok) {
                if (ok["users"] !== "null") {
                    _this.allUsersEmpresa = UserMapper_1.UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
                }
                else {
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (err) {
                console.log(err);
            });
        }
        this.modalChoseCategory.hide();
    };
    SearchComponent.prototype.updateCategorysNames = function () {
        var _this = this;
        this.categorysNames = [];
        this.categorysNames.push("Todas las categorias");
        this.categorys.forEach(function (cat) { _this.categorysNames.push(cat.nombre); });
    };
    SearchComponent.prototype.onItemTap = function (args) {
        var userEmpresaSelected = this.allUsersEmpresa[args.index];
        var id = {
            queryParams: {
                "id-selected": userEmpresaSelected.idUser,
            }
        };
        this.router.navigate(["/user-info-empresa"], id);
    };
    SearchComponent.prototype.llamar = function (telefono) {
        permissions.requestPermission(android.Manifest.permission.CALL_PHONE).then(function () {
            TNSPhone.dial(String(telefono), false);
        }).catch(function () {
            console.log("Permission Denied!");
        });
    };
    __decorate([
        core_1.ViewChild("modalChoseCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], SearchComponent.prototype, "modalChoseCategory", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'ns-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService, CategoryService_1.CategoryService]
        }),
        __metadata("design:paramtypes", [UserService_1.UserService, page_1.Page, router_1.RouterExtensions, CategoryService_1.CategoryService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsdURBQXNEO0FBRXRELG1EQUFrRDtBQUNsRCw4Q0FBNkM7QUFDN0Msc0RBQXdEO0FBQ3hELDZDQUErQztBQUMvQyxzREFBcUQ7QUFDckQsc0RBQStEO0FBRS9ELCtEQUE4RDtBQUM5RCwyREFBMEQ7QUFFMUQsa0NBQTBDO0FBVTFDO0lBU0UseUJBQW9CLFlBQXlCLEVBQVUsS0FBVyxFQUFVLE1BQXdCLEVBQVUsZ0JBQWlDO1FBQTNILGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQU4vSSxvQkFBZSxHQUFrQixFQUFFLENBQUM7UUFFcEMscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxjQUFTLEdBQWUsRUFBRSxDQUFDO0lBRXdILENBQUM7SUFFcEosa0NBQVEsR0FBUjtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUM3QyxVQUFDLEVBQUU7WUFDRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxNQUFNLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxlQUFlLEdBQUcsdUJBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1RTtpQkFBTTtnQkFDTCxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsRUFDRCxVQUFDLElBQUk7WUFDSCxP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Q0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLFFBQVE7UUFDYixXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUN4RTtZQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1RmdDO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQXFCLHNCQUFjOytEQUFDO0lBRHpELGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLHlCQUFXLEVBQUMsaUNBQWUsQ0FBQztTQUN6QyxDQUFDO3lDQVVrQyx5QkFBVyxFQUFpQixXQUFJLEVBQWtCLHlCQUFnQixFQUE0QixpQ0FBZTtPQVRwSSxlQUFlLENBOEYzQjtJQUFELHNCQUFDO0NBQUEsQUE5RkQsSUE4RkM7QUE5RlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJFbXByZXNhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckVtcHJlc2EnO1xuaW1wb3J0IHsgVXNlck1hcHBlciB9IGZyb20gJy4uL21hcHBlci9Vc2VyTWFwcGVyJztcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSAnLi4vdXRpbHMvRmVlZEJhY2snO1xuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xuaW1wb3J0ICogYXMgVE5TUGhvbmUgZnJvbSAnbmF0aXZlc2NyaXB0LXBob25lJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQ2F0ZWdvcnlTZXJ2aWNlJztcbmltcG9ydCB7IENhdGVnb3J5TWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL0NhdGVnb3J5TWFwcGVyJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvQ2F0ZWdvcnknO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9tb2RhbCc7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsQ2F0ZWdvcnlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwibW9kYWxDaG9zZUNhdGVnb3J5XCIpIG1vZGFsQ2hvc2VDYXRlZ29yeTogTW9kYWxDb21wb25lbnQ7XG5cbiAgYWxsVXNlcnNFbXByZXNhOiBVc2VyRW1wcmVzYVtdID0gW107XG5cbiAgc2VsZWN0ZWRDYXRlZ29yeSA9IDA7XG4gIGNhdGVnb3J5c05hbWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNhdGVnb3J5czogQ2F0ZWdvcnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgX2NhdGVnb3J5U2VydmljZTogQ2F0ZWdvcnlTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cbiAgICB0aGlzLl91c2VyU2VydmljZS5nZXRBbGxVc2VyRW1wcmVzYSgpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZiAob2tbXCJ1c2Vyc1wiXSAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICB0aGlzLmFsbFVzZXJzRW1wcmVzYSA9IFVzZXJNYXBwZXIudXNlckVtcHJlc2FKU09OVG9Vc2VyRW1wcmVzYUJ1c3F1ZWRhKG9rKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjaG9zZUNhdGVnb3J5KCkge1xuICAgIHRoaXMuX2NhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yeXMoKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgdGhpcy5jYXRlZ29yeXMgPSBDYXRlZ29yeU1hcHBlci5jYXRlZ29yeUpTT05Ub0NhdGVnb3J5KG9rKTtcbiAgICAgICAgdGhpcy51cGRhdGVDYXRlZ29yeXNOYW1lcygpO1xuICAgICAgICB0aGlzLm1vZGFsQ2hvc2VDYXRlZ29yeS5zaG93KCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDg8Kzbi4uLlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNhdGVnb3J5U2VsZWN0ZWQoKSB7XG4gICAgaWYodGhpcy5zZWxlY3RlZENhdGVnb3J5ID09IDApe1xuICAgICAgdGhpcy5fdXNlclNlcnZpY2UuZ2V0QWxsVXNlckVtcHJlc2EoKS5zdWJzY3JpYmUoKG9rKT0+e1xuICAgICAgICBpZiAob2tbXCJ1c2Vyc1wiXSAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICB0aGlzLmFsbFVzZXJzRW1wcmVzYSA9IFVzZXJNYXBwZXIudXNlckVtcHJlc2FKU09OVG9Vc2VyRW1wcmVzYUJ1c3F1ZWRhKG9rKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LChlcnIpPT57XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgdGhpcy5fdXNlclNlcnZpY2UuZ2V0VXNlcnNFbXByZXNhQnlDYXRlZ29yeSh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZiAob2tbXCJ1c2Vyc1wiXSAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICB0aGlzLmFsbFVzZXJzRW1wcmVzYSA9IFVzZXJNYXBwZXIudXNlckVtcHJlc2FKU09OVG9Vc2VyRW1wcmVzYUJ1c3F1ZWRhKG9rKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5tb2RhbENob3NlQ2F0ZWdvcnkuaGlkZSgpXG4gIH1cblxuICB1cGRhdGVDYXRlZ29yeXNOYW1lcygpIHtcbiAgICB0aGlzLmNhdGVnb3J5c05hbWVzID0gW107XG4gICAgdGhpcy5jYXRlZ29yeXNOYW1lcy5wdXNoKFwiVG9kYXMgbGFzIGNhdGVnb3JpYXNcIik7XG4gICAgdGhpcy5jYXRlZ29yeXMuZm9yRWFjaChjYXQgPT4geyB0aGlzLmNhdGVnb3J5c05hbWVzLnB1c2goY2F0Lm5vbWJyZSkgfSk7XG4gIH1cblxuICBvbkl0ZW1UYXAoYXJncykge1xuICAgIHZhciB1c2VyRW1wcmVzYVNlbGVjdGVkOiBVc2VyRW1wcmVzYSA9IHRoaXMuYWxsVXNlcnNFbXByZXNhW2FyZ3MuaW5kZXhdO1xuICAgIHZhciBpZCA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIFwiaWQtc2VsZWN0ZWRcIjogdXNlckVtcHJlc2FTZWxlY3RlZC5pZFVzZXIsXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi91c2VyLWluZm8tZW1wcmVzYVwiXSwgaWQpO1xuICB9XG5cbiAgbGxhbWFyKHRlbGVmb25vKSB7XG4gICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLkNBTExfUEhPTkUpLnRoZW4oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIFROU1Bob25lLmRpYWwoU3RyaW5nKHRlbGVmb25vKSwgZmFsc2UpO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gRGVuaWVkIVwiKTtcbiAgICAgIH0pO1xuICB9XG59Il19