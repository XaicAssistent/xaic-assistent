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
var app = require("tns-core-modules/application");
var modal_1 = require("../modal");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(_userService, _page, router, _categoryService) {
        this._userService = _userService;
        this._page = _page;
        this.router = router;
        this._categoryService = _categoryService;
        this.sideDrawer = app.getRootView();
        this.allUsersEmpresa = [];
        this.selectedCategory = 0;
        this.categorysNames = [];
        this.categorys = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this.sideDrawer.gesturesEnabled = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsdURBQXNEO0FBRXRELG1EQUFrRDtBQUNsRCw4Q0FBNkM7QUFDN0Msc0RBQXdEO0FBQ3hELDZDQUErQztBQUMvQyxzREFBcUQ7QUFDckQsc0RBQStEO0FBRS9ELCtEQUE4RDtBQUM5RCwyREFBMEQ7QUFFMUQsa0RBQW9EO0FBQ3BELGtDQUEwQztBQVcxQztJQVdFLHlCQUFvQixZQUF5QixFQUFVLEtBQVcsRUFBVSxNQUF3QixFQUFVLGdCQUFpQztRQUEzSCxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFSL0ksZUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFOUMsb0JBQWUsR0FBa0IsRUFBRSxDQUFDO1FBRXBDLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsY0FBUyxHQUFlLEVBQUUsQ0FBQztJQUV3SCxDQUFDO0lBRXBKLGtDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUV2QyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUM3QyxVQUFDLEVBQUU7WUFDRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxNQUFNLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxlQUFlLEdBQUcsdUJBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1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QyxDQUFDO1FBQ3hFLElBQUksRUFBRSxHQUFHO1lBQ1AsV0FBVyxFQUFFO2dCQUNYLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNO2FBQzFDO1NBQ0YsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLFFBQVE7UUFDYixXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUN4RTtZQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvRmdDO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQXFCLHNCQUFjOytEQUFDO0lBRHpELGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLHlCQUFXLEVBQUMsaUNBQWUsQ0FBQztTQUN6QyxDQUFDO3lDQVlrQyx5QkFBVyxFQUFpQixXQUFJLEVBQWtCLHlCQUFnQixFQUE0QixpQ0FBZTtPQVhwSSxlQUFlLENBaUczQjtJQUFELHNCQUFDO0NBQUEsQUFqR0QsSUFpR0M7QUFqR1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJFbXByZXNhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckVtcHJlc2EnO1xuaW1wb3J0IHsgVXNlck1hcHBlciB9IGZyb20gJy4uL21hcHBlci9Vc2VyTWFwcGVyJztcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSAnLi4vdXRpbHMvRmVlZEJhY2snO1xuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xuaW1wb3J0ICogYXMgVE5TUGhvbmUgZnJvbSAnbmF0aXZlc2NyaXB0LXBob25lJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQ2F0ZWdvcnlTZXJ2aWNlJztcbmltcG9ydCB7IENhdGVnb3J5TWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL0NhdGVnb3J5TWFwcGVyJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvQ2F0ZWdvcnknO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL21vZGFsJztcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5kZWNsYXJlIHZhciBhbmRyb2lkO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsQ2F0ZWdvcnlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwibW9kYWxDaG9zZUNhdGVnb3J5XCIpIG1vZGFsQ2hvc2VDYXRlZ29yeTogTW9kYWxDb21wb25lbnQ7XG5cbiAgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xuXG4gIGFsbFVzZXJzRW1wcmVzYTogVXNlckVtcHJlc2FbXSA9IFtdO1xuXG4gIHNlbGVjdGVkQ2F0ZWdvcnkgPSAwO1xuICBjYXRlZ29yeXNOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjYXRlZ29yeXM6IENhdGVnb3J5W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIF9jYXRlZ29yeVNlcnZpY2U6IENhdGVnb3J5U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMuc2lkZURyYXdlci5nZXN0dXJlc0VuYWJsZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5fdXNlclNlcnZpY2UuZ2V0QWxsVXNlckVtcHJlc2EoKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYgKG9rW1widXNlcnNcIl0gIT09IFwibnVsbFwiKSB7XG4gICAgICAgICAgdGhpcy5hbGxVc2Vyc0VtcHJlc2EgPSBVc2VyTWFwcGVyLnVzZXJFbXByZXNhSlNPTlRvVXNlckVtcHJlc2FCdXNxdWVkYShvayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY2hvc2VDYXRlZ29yeSgpIHtcbiAgICB0aGlzLl9jYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlzKCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnlzID0gQ2F0ZWdvcnlNYXBwZXIuY2F0ZWdvcnlKU09OVG9DYXRlZ29yeShvayk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2F0ZWdvcnlzTmFtZXMoKTtcbiAgICAgICAgdGhpcy5tb2RhbENob3NlQ2F0ZWdvcnkuc2hvdygpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw4PCs24uLi5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WIC0+IFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjYXRlZ29yeVNlbGVjdGVkKCkge1xuICAgIGlmKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9PSAwKXtcbiAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmdldEFsbFVzZXJFbXByZXNhKCkuc3Vic2NyaWJlKChvayk9PntcbiAgICAgICAgaWYgKG9rW1widXNlcnNcIl0gIT09IFwibnVsbFwiKSB7XG4gICAgICAgICAgdGhpcy5hbGxVc2Vyc0VtcHJlc2EgPSBVc2VyTWFwcGVyLnVzZXJFbXByZXNhSlNPTlRvVXNlckVtcHJlc2FCdXNxdWVkYShvayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSwoZXJyKT0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXJzRW1wcmVzYUJ5Q2F0ZWdvcnkodGhpcy5zZWxlY3RlZENhdGVnb3J5KS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYgKG9rW1widXNlcnNcIl0gIT09IFwibnVsbFwiKSB7XG4gICAgICAgICAgdGhpcy5hbGxVc2Vyc0VtcHJlc2EgPSBVc2VyTWFwcGVyLnVzZXJFbXByZXNhSlNPTlRvVXNlckVtcHJlc2FCdXNxdWVkYShvayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMubW9kYWxDaG9zZUNhdGVnb3J5LmhpZGUoKVxuICB9XG5cbiAgdXBkYXRlQ2F0ZWdvcnlzTmFtZXMoKSB7XG4gICAgdGhpcy5jYXRlZ29yeXNOYW1lcyA9IFtdO1xuICAgIHRoaXMuY2F0ZWdvcnlzTmFtZXMucHVzaChcIlRvZGFzIGxhcyBjYXRlZ29yaWFzXCIpO1xuICAgIHRoaXMuY2F0ZWdvcnlzLmZvckVhY2goY2F0ID0+IHsgdGhpcy5jYXRlZ29yeXNOYW1lcy5wdXNoKGNhdC5ub21icmUpIH0pO1xuICB9XG5cbiAgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICB2YXIgdXNlckVtcHJlc2FTZWxlY3RlZDogVXNlckVtcHJlc2EgPSB0aGlzLmFsbFVzZXJzRW1wcmVzYVthcmdzLmluZGV4XTtcbiAgICB2YXIgaWQgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcImlkLXNlbGVjdGVkXCI6IHVzZXJFbXByZXNhU2VsZWN0ZWQuaWRVc2VyLFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdXNlci1pbmZvLWVtcHJlc2FcIl0sIGlkKTtcbiAgfVxuXG4gIGxsYW1hcih0ZWxlZm9ubykge1xuICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQUxMX1BIT05FKS50aGVuKFxuICAgICAgKCkgPT4ge1xuICAgICAgICBUTlNQaG9uZS5kaWFsKFN0cmluZyh0ZWxlZm9ubyksIGZhbHNlKTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQZXJtaXNzaW9uIERlbmllZCFcIik7XG4gICAgICB9KTtcbiAgfVxufSJdfQ==