"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BtnAddEventComponent = /** @class */ (function () {
    function BtnAddEventComponent() {
        this.click = new core_1.EventEmitter();
    }
    BtnAddEventComponent.prototype.btnClicado = function () {
        this.click.emit();
    };
    BtnAddEventComponent.prototype.onLoaded = function (args) {
        var tnsView = args.object;
        if (tnsView.android) {
            var nativeAnView = tnsView.android;
            var shape = new android.graphics.drawable.GradientDrawable();
            shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            shape.setColor(android.graphics.Color.parseColor("#30bcff"));
            nativeAnView.setBackgroundDrawable(shape);
            nativeAnView.setElevation(15);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BtnAddEventComponent.prototype, "click", void 0);
    BtnAddEventComponent = __decorate([
        core_1.Component({
            selector: "btn_add-event",
            template: "\n    <GridLayout class=\"float-btn-wrapper\">\n    <StackLayout class=\"float-btn-shadow\" (loaded)=\"onLoaded($event)\">\n    <StackLayout class=\"float-btn\" (tap)=\"btnClicado()\">\n        <Label class=\"float-btn-text\" text=\"+\"></Label>\n    </StackLayout>\n    </StackLayout>\n    </GridLayout>",
            styles: ["\n\n    .float-btn-wrapper{\n        width: 75;\n        height: 75;\n        \n    }\n\n    .float-btn-shadow {\n        width: 56;\n        height: 56;\n    }\n\n    .float-btn {\n        background-color: #1a9e51;\n        width: 56;\n        border-radius: 28;\n        height: 56;\n        text-align: center;\n        vertical-align: middle; \n      \n    }\n    .float-btn-text {\n        color: #ffffff;\n        font-size: 36;\n    }\n    "]
        })
    ], BtnAddEventComponent);
    return BtnAddEventComponent;
}());
exports.BtnAddEventComponent = BtnAddEventComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm50X2FkZC1ldmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibnRfYWRkLWV2ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RDtBQTJDOUQ7SUF2Q0E7UUF5Q1UsVUFBSyxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztJQW1CN0QsQ0FBQztJQWpCRCx5Q0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLElBQUk7UUFDVCxJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRS9CLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ25DLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hFLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsWUFBWSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBakJTO1FBQVQsYUFBTSxFQUFFO2tDQUFRLG1CQUFZO3VEQUFnQztJQUZoRCxvQkFBb0I7UUF2Q2hDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsa1RBT0k7WUFDZCxNQUFNLEVBQUUsQ0FBQyxrY0EwQlIsQ0FBQztTQUNMLENBQUM7T0FFVyxvQkFBb0IsQ0FxQmhDO0lBQUQsMkJBQUM7Q0FBQSxBQXJCRCxJQXFCQztBQXJCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT3V0cHV0LEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGFuZHJvaWQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImJ0bl9hZGQtZXZlbnRcIixcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8R3JpZExheW91dCBjbGFzcz1cImZsb2F0LWJ0bi13cmFwcGVyXCI+XHJcbiAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJmbG9hdC1idG4tc2hhZG93XCIgKGxvYWRlZCk9XCJvbkxvYWRlZCgkZXZlbnQpXCI+XHJcbiAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJmbG9hdC1idG5cIiAodGFwKT1cImJ0bkNsaWNhZG8oKVwiPlxyXG4gICAgICAgIDxMYWJlbCBjbGFzcz1cImZsb2F0LWJ0bi10ZXh0XCIgdGV4dD1cIitcIj48L0xhYmVsPlxyXG4gICAgPC9TdGFja0xheW91dD5cclxuICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICA8L0dyaWRMYXlvdXQ+YCxcclxuICAgIHN0eWxlczogW2BcclxuXHJcbiAgICAuZmxvYXQtYnRuLXdyYXBwZXJ7XHJcbiAgICAgICAgd2lkdGg6IDc1O1xyXG4gICAgICAgIGhlaWdodDogNzU7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLmZsb2F0LWJ0bi1zaGFkb3cge1xyXG4gICAgICAgIHdpZHRoOiA1NjtcclxuICAgICAgICBoZWlnaHQ6IDU2O1xyXG4gICAgfVxyXG5cclxuICAgIC5mbG9hdC1idG4ge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxYTllNTE7XHJcbiAgICAgICAgd2lkdGg6IDU2O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDI4O1xyXG4gICAgICAgIGhlaWdodDogNTY7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIC5mbG9hdC1idG4tdGV4dCB7XHJcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgZm9udC1zaXplOiAzNjtcclxuICAgIH1cclxuICAgIGBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQnRuQWRkRXZlbnRDb21wb25lbnQge1xyXG5cclxuQE91dHB1dCgpIGNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuYnRuQ2xpY2Fkbygpe1xyXG4gICAgdGhpcy5jbGljay5lbWl0KCk7XHJcbn1cclxuXHJcbm9uTG9hZGVkKGFyZ3Mpe1xyXG4gICAgbGV0IHRuc1ZpZXcgPSA8YW55PmFyZ3Mub2JqZWN0O1xyXG5cclxuICAgIGlmICh0bnNWaWV3LmFuZHJvaWQpIHtcclxuICAgICAgICBsZXQgbmF0aXZlQW5WaWV3ID0gdG5zVmlldy5hbmRyb2lkO1xyXG4gICAgICAgIHZhciBzaGFwZSA9IG5ldyBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGUoKTtcclxuICAgICAgICBzaGFwZS5zZXRTaGFwZShhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGUuT1ZBTCk7XHJcbiAgICAgICAgc2hhcGUuc2V0Q29sb3IoYW5kcm9pZC5ncmFwaGljcy5Db2xvci5wYXJzZUNvbG9yKFwiIzMwYmNmZlwiKSk7XHJcbiAgICAgICAgbmF0aXZlQW5WaWV3LnNldEJhY2tncm91bmREcmF3YWJsZShzaGFwZSk7XHJcbiAgICAgICAgbmF0aXZlQW5WaWV3LnNldEVsZXZhdGlvbigxNSk7XHJcbiAgICB9IFxyXG59XHJcblxyXG59Il19