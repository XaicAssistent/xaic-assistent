"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData_1 = require("../model/UserData");
var UserLoged = /** @class */ (function () {
    function UserLoged() {
        this.userLoged = new UserData_1.UserData();
    }
    UserLoged.getInstance = function () {
        if (!UserLoged.instance) {
            UserLoged.instance = new UserLoged();
        }
        return UserLoged.instance;
    };
    ;
    UserLoged.prototype.setUserLoged = function (user) {
        this.userLoged = user;
    };
    UserLoged.prototype.getUserLoged = function () {
        return this.userLoged;
    };
    return UserLoged;
}());
exports.UserLoged = UserLoged;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckxvZ2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVXNlckxvZ2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBWUk7UUFWUSxjQUFTLEdBQVksSUFBSSxtQkFBUSxFQUFFLENBQUM7SUFVdEIsQ0FBQztJQVJoQixxQkFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ3JCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUN4QztRQUVELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUM5QixDQUFDO0lBRXNCLENBQUM7SUFFeEIsZ0NBQVksR0FBWixVQUFhLElBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELGdDQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uL21vZGVsL1VzZXJEYXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTG9nZWR7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgOiBVc2VyTG9nZWQ7XG4gICAgcHJpdmF0ZSB1c2VyTG9nZWQ6VXNlckRhdGEgPSBuZXcgVXNlckRhdGEoKTtcblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVc2VyTG9nZWQge1xuICAgICAgICBpZiAoIVVzZXJMb2dlZC5pbnN0YW5jZSkge1xuICAgICAgICAgICAgVXNlckxvZ2VkLmluc3RhbmNlID0gbmV3IFVzZXJMb2dlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFVzZXJMb2dlZC5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fTtcblxuICAgIHNldFVzZXJMb2dlZCh1c2VyOiBVc2VyRGF0YSl7XG4gICAgICAgIHRoaXMudXNlckxvZ2VkID0gdXNlcjtcbiAgICB9XG5cbiAgICBnZXRVc2VyTG9nZWQoKTogVXNlckRhdGF7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJMb2dlZDtcbiAgICB9XG59Il19