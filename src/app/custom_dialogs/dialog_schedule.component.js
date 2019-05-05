"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var DaysEnum;
(function (DaysEnum) {
    DaysEnum[DaysEnum["Lunes"] = 0] = "Lunes";
    DaysEnum[DaysEnum["Martes"] = 1] = "Martes";
    DaysEnum[DaysEnum["Miercoles"] = 2] = "Miercoles";
    DaysEnum[DaysEnum["Jueves"] = 3] = "Jueves";
    DaysEnum[DaysEnum["Viernes"] = 4] = "Viernes";
    DaysEnum[DaysEnum["Sabado"] = 5] = "Sabado";
    DaysEnum[DaysEnum["Domingo"] = 6] = "Domingo";
})(DaysEnum = exports.DaysEnum || (exports.DaysEnum = {}));
var DialogContent = /** @class */ (function () {
    function DialogContent(params) {
        this.params = params;
        this.values = Object.keys(DaysEnum);
        this.prompt = params.context.promptMsg;
    }
    DialogContent.prototype.ngOnInit = function () {
        console.log(this.values);
    };
    DialogContent.prototype.close = function (result) {
        this.params.closeCallback(result);
    };
    DialogContent = __decorate([
        core_1.Component({
            selector: "modal-content",
            template: "\n    <StackLayout>\n    <StackLayout orientation=\"horizontal\" class=\"border\">\n      <Button *ngFor=\"let day of values\"  text=\"DaysEnum.day\" class=\"days\"></Button>\n    </StackLayout>\n        <Image class=\"add_schedule\" src=\"https://cdn4.iconfinder.com/data/icons/material-design-content-icons/512/add-circle-512.png\"></Image>\n    </StackLayout>\n    ", styles: ["\n    .border{\n        padding:10%;\n    }\n    .add_schedule {\n        width: 20%;\n        height: 20%;\n    } \n    .days {\n        height:6%;\n        width:15%;\n        font-size: 15px;\n        border-radius: 25%;\n        border-color:black;\n        border-width: 2px;\n    } "]
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], DialogContent);
    return DialogContent;
}());
exports.DialogContent = DialogContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nX3NjaGVkdWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpYWxvZ19zY2hlZHVsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsa0VBQXNFO0FBRXRFLElBQVksUUFRWDtBQVJELFdBQVksUUFBUTtJQUNoQix5Q0FBSyxDQUFBO0lBQ0wsMkNBQU0sQ0FBQTtJQUNOLGlEQUFTLENBQUE7SUFDVCwyQ0FBTSxDQUFBO0lBQ04sNkNBQU8sQ0FBQTtJQUNQLDJDQUFNLENBQUE7SUFDTiw2Q0FBTyxDQUFBO0FBQ1gsQ0FBQyxFQVJXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBUW5CO0FBK0JEO0lBU0ksdUJBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBUjdDLFdBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBUzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDM0MsQ0FBQztJQVJELGdDQUFRLEdBQVI7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBTU0sNkJBQUssR0FBWixVQUFhLE1BQWM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQWZRLGFBQWE7UUE3QnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsa1hBT1QsRUFBRSxNQUFNLEVBQUUsQ0FBQyxrU0FlVCxDQUFFO1NBR1IsQ0FBQzt5Q0FXOEIsZ0NBQWlCO09BVHBDLGFBQWEsQ0FnQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztBQWhCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcblxyXG5leHBvcnQgZW51bSBEYXlzRW51bSB7XHJcbiAgICBMdW5lcyxcclxuICAgIE1hcnRlcyxcclxuICAgIE1pZXJjb2xlcyxcclxuICAgIEp1ZXZlcyxcclxuICAgIFZpZXJuZXMsXHJcbiAgICBTYWJhZG8sXHJcbiAgICBEb21pbmdvXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibW9kYWwtY29udGVudFwiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxTdGFja0xheW91dD5cclxuICAgIDxTdGFja0xheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBjbGFzcz1cImJvcmRlclwiPlxyXG4gICAgICA8QnV0dG9uICpuZ0Zvcj1cImxldCBkYXkgb2YgdmFsdWVzXCIgIHRleHQ9XCJEYXlzRW51bS5kYXlcIiBjbGFzcz1cImRheXNcIj48L0J1dHRvbj5cclxuICAgIDwvU3RhY2tMYXlvdXQ+XHJcbiAgICAgICAgPEltYWdlIGNsYXNzPVwiYWRkX3NjaGVkdWxlXCIgc3JjPVwiaHR0cHM6Ly9jZG40Lmljb25maW5kZXIuY29tL2RhdGEvaWNvbnMvbWF0ZXJpYWwtZGVzaWduLWNvbnRlbnQtaWNvbnMvNTEyL2FkZC1jaXJjbGUtNTEyLnBuZ1wiPjwvSW1hZ2U+XHJcbiAgICA8L1N0YWNrTGF5b3V0PlxyXG4gICAgYCwgc3R5bGVzOiBbYFxyXG4gICAgLmJvcmRlcntcclxuICAgICAgICBwYWRkaW5nOjEwJTtcclxuICAgIH1cclxuICAgIC5hZGRfc2NoZWR1bGUge1xyXG4gICAgICAgIHdpZHRoOiAyMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAyMCU7XHJcbiAgICB9IFxyXG4gICAgLmRheXMge1xyXG4gICAgICAgIGhlaWdodDo2JTtcclxuICAgICAgICB3aWR0aDoxNSU7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDI1JTtcclxuICAgICAgICBib3JkZXItY29sb3I6YmxhY2s7XHJcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XHJcbiAgICB9IGAgXVxyXG5cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29udGVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB2YWx1ZXMgPSBPYmplY3Qua2V5cyhEYXlzRW51bSk7XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy52YWx1ZXMpO1xyXG4gICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIHByb21wdDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5wcm9tcHQgPSBwYXJhbXMuY29udGV4dC5wcm9tcHRNc2c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKHJlc3VsdDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXN1bHQpO1xyXG4gICAgfVxyXG59Il19