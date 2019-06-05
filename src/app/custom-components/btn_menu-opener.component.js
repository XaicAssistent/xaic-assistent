"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("tns-core-modules/application");
var BtnMenuOpenerComponent = /** @class */ (function () {
    function BtnMenuOpenerComponent() {
        this.sideDrawer = app.getRootView();
    }
    BtnMenuOpenerComponent.prototype.openDrawer = function () {
        this.sideDrawer.showDrawer();
    };
    BtnMenuOpenerComponent = __decorate([
        core_1.Component({
            selector: "btn_menu-opener",
            template: "\n    <StackLayout>\n    <Label class=\"button fa\" text=\"&#xe9bd;\" (tap)=\"openDrawer()\"></Label>\n    </StackLayout>",
            styles: ["\n    .button{\n        color: rgba(26, 158, 81, 1);\n        font-size: 35;\n        margin-left: 10;\n        margin-top: 15;\n    }\n    "]
        })
    ], BtnMenuOpenerComponent);
    return BtnMenuOpenerComponent;
}());
exports.BtnMenuOpenerComponent = BtnMenuOpenerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnRuX21lbnUtb3BlbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ0bl9tZW51LW9wZW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFFMUMsa0RBQW9EO0FBa0JwRDtJQWhCQTtRQWtCSSxlQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQU1qRCxDQUFDO0lBSkcsMkNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQU5RLHNCQUFzQjtRQWhCbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLDJIQUdLO1lBQ2YsTUFBTSxFQUFFLENBQUMsOElBT1IsQ0FBQztTQUNMLENBQUM7T0FFVyxzQkFBc0IsQ0FRbEM7SUFBRCw2QkFBQztDQUFBLEFBUkQsSUFRQztBQVJZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiYnRuX21lbnUtb3BlbmVyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8U3RhY2tMYXlvdXQ+XG4gICAgPExhYmVsIGNsYXNzPVwiYnV0dG9uIGZhXCIgdGV4dD1cIiYjeGU5YmQ7XCIgKHRhcCk9XCJvcGVuRHJhd2VyKClcIj48L0xhYmVsPlxuICAgIDwvU3RhY2tMYXlvdXQ+YCxcbiAgICBzdHlsZXM6IFtgXG4gICAgLmJ1dHRvbntcbiAgICAgICAgY29sb3I6IHJnYmEoMjYsIDE1OCwgODEsIDEpO1xuICAgICAgICBmb250LXNpemU6IDM1O1xuICAgICAgICBtYXJnaW4tbGVmdDogMTA7XG4gICAgICAgIG1hcmdpbi10b3A6IDE1O1xuICAgIH1cbiAgICBgXVxufSlcblxuZXhwb3J0IGNsYXNzIEJ0bk1lbnVPcGVuZXJDb21wb25lbnQge1xuXG4gICAgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpXG5cbiAgICBvcGVuRHJhd2VyKCl7XG4gICAgICAgIHRoaXMuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG59Il19