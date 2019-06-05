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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnRuX21lbnUtb3BlbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ0bl9tZW51LW9wZW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFFMUMsa0RBQW9EO0FBa0JwRDtJQWhCQTtRQWtCSSxlQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQU1qRCxDQUFDO0lBSkcsMkNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQU5RLHNCQUFzQjtRQWhCbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLDJIQUdLO1lBQ2YsTUFBTSxFQUFFLENBQUMsOElBT1IsQ0FBQztTQUNMLENBQUM7T0FFVyxzQkFBc0IsQ0FRbEM7SUFBRCw2QkFBQztDQUFBLEFBUkQsSUFRQztBQVJZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImJ0bl9tZW51LW9wZW5lclwiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxTdGFja0xheW91dD5cclxuICAgIDxMYWJlbCBjbGFzcz1cImJ1dHRvbiBmYVwiIHRleHQ9XCImI3hlOWJkO1wiICh0YXApPVwib3BlbkRyYXdlcigpXCI+PC9MYWJlbD5cclxuICAgIDwvU3RhY2tMYXlvdXQ+YCxcclxuICAgIHN0eWxlczogW2BcclxuICAgIC5idXR0b257XHJcbiAgICAgICAgY29sb3I6IHJnYmEoMjYsIDE1OCwgODEsIDEpO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMzU7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE1O1xyXG4gICAgfVxyXG4gICAgYF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBCdG5NZW51T3BlbmVyQ29tcG9uZW50IHtcclxuXHJcbiAgICBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KClcclxuXHJcbiAgICBvcGVuRHJhd2VyKCl7XHJcbiAgICAgICAgdGhpcy5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxuXHJcbn0iXX0=