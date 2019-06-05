"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData_1 = require("../model/UserData");
var appSettings = require("tns-core-modules/application-settings");
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
    UserLoged.prototype.deleteUserData = function () {
        this.userLoged = new UserData_1.UserData();
        appSettings.setString("tokenUser", "");
    };
    return UserLoged;
}());
exports.UserLoged = UserLoged;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckxvZ2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVXNlckxvZ2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLG1FQUFxRTtBQUVyRTtJQVlJO1FBVlEsY0FBUyxHQUFZLElBQUksbUJBQVEsRUFBRSxDQUFDO0lBVXRCLENBQUM7SUFSaEIscUJBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNyQixTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7U0FDeEM7UUFFRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVzQixDQUFDO0lBRXhCLGdDQUFZLEdBQVosVUFBYSxJQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxrQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUNoQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vbW9kZWwvVXNlckRhdGFcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyTG9nZWR7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgOiBVc2VyTG9nZWQ7XG4gICAgcHJpdmF0ZSB1c2VyTG9nZWQ6VXNlckRhdGEgPSBuZXcgVXNlckRhdGEoKTtcblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVc2VyTG9nZWQge1xuICAgICAgICBpZiAoIVVzZXJMb2dlZC5pbnN0YW5jZSkge1xuICAgICAgICAgICAgVXNlckxvZ2VkLmluc3RhbmNlID0gbmV3IFVzZXJMb2dlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFVzZXJMb2dlZC5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fTtcblxuICAgIHNldFVzZXJMb2dlZCh1c2VyOiBVc2VyRGF0YSl7XG4gICAgICAgIHRoaXMudXNlckxvZ2VkID0gdXNlcjtcbiAgICB9XG5cbiAgICBnZXRVc2VyTG9nZWQoKTogVXNlckRhdGF7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJMb2dlZDtcbiAgICB9XG5cbiAgICBkZWxldGVVc2VyRGF0YSgpe1xuICAgICAgICB0aGlzLnVzZXJMb2dlZCA9IG5ldyBVc2VyRGF0YSgpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIik7XG4gICAgfVxufSJdfQ==