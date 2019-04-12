"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var DialogContent = /** @class */ (function () {
    function DialogContent(params) {
        this.params = params;
        this.prompt = params.context.promptMsg;
    }
    DialogContent.prototype.close = function (result) {
        this.params.closeCallback(result);
    };
    DialogContent = __decorate([
        core_1.Component({
            selector: "modal-content",
            template: "\n    <StackLayout>\n    <StackLayout orientation=\"horizontal\">\n      <Label text=\"LU \"></Label>\n      <Label text=\"MA \"></Label>\n      <Label text=\"MI \"></Label>\n      <Label text=\"JU \"></Label>\n      <Label text=\"VI \"></Label>\n      <Label text=\"SA \"></Label>\n      <Label text=\"DO \"></Label>\n    </StackLayout>\n        <Image height=\"20%\" width=\"20%\" src=\"https://cdn4.iconfinder.com/data/icons/material-design-content-icons/512/add-circle-512.png\"></Image>\n    </StackLayout>\n    ",
            styleUrls: ['./dialog_schedule.component.css']
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], DialogContent);
    return DialogContent;
}());
exports.DialogContent = DialogContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nX3NjaGVkdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpYWxvZ19zY2hlZHVsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsa0VBQXNFO0FBc0J0RTtJQUVJLHVCQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFTSw2QkFBSyxHQUFaLFVBQWEsTUFBYztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBUlUsYUFBYTtRQXBCekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSx1Z0JBYVQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUVqRCxDQUFDO3lDQUk4QixnQ0FBaUI7T0FGcEMsYUFBYSxDQVN6QjtJQUFELG9CQUFDO0NBQUEsQUFURCxJQVNDO0FBVFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibW9kYWwtY29udGVudFwiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxTdGFja0xheW91dD5cclxuICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIj5cclxuICAgICAgPExhYmVsIHRleHQ9XCJMVSBcIj48L0xhYmVsPlxyXG4gICAgICA8TGFiZWwgdGV4dD1cIk1BIFwiPjwvTGFiZWw+XHJcbiAgICAgIDxMYWJlbCB0ZXh0PVwiTUkgXCI+PC9MYWJlbD5cclxuICAgICAgPExhYmVsIHRleHQ9XCJKVSBcIj48L0xhYmVsPlxyXG4gICAgICA8TGFiZWwgdGV4dD1cIlZJIFwiPjwvTGFiZWw+XHJcbiAgICAgIDxMYWJlbCB0ZXh0PVwiU0EgXCI+PC9MYWJlbD5cclxuICAgICAgPExhYmVsIHRleHQ9XCJETyBcIj48L0xhYmVsPlxyXG4gICAgPC9TdGFja0xheW91dD5cclxuICAgICAgICA8SW1hZ2UgaGVpZ2h0PVwiMjAlXCIgd2lkdGg9XCIyMCVcIiBzcmM9XCJodHRwczovL2NkbjQuaWNvbmZpbmRlci5jb20vZGF0YS9pY29ucy9tYXRlcmlhbC1kZXNpZ24tY29udGVudC1pY29ucy81MTIvYWRkLWNpcmNsZS01MTIucG5nXCI+PC9JbWFnZT5cclxuICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICBgLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZGlhbG9nX3NjaGVkdWxlLmNvbXBvbmVudC5jc3MnXVxyXG4gIFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRlbnQge1xyXG4gICAgcHVibGljIHByb21wdDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5wcm9tcHQgPSBwYXJhbXMuY29udGV4dC5wcm9tcHRNc2c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKHJlc3VsdDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXN1bHQpO1xyXG4gIH1cclxufSJdfQ==