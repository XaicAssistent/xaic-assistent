"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData_1 = require("./UserData");
var TypeUser_1 = require("../utils/TypeUser");
var UserEmpresa = /** @class */ (function (_super) {
    __extends(UserEmpresa, _super);
    function UserEmpresa(user) {
        var _this = _super.call(this) || this;
        _this.gmail = user && user.gmail || "";
        _this.nombre = user && user.nombre || "";
        _this.apellidos = user && user.apellidos || "";
        _this.telefono = user && user.telefono || "";
        _this.direccion = user && user.direccion || "";
        _this.foto = user && user.foto || "";
        _this.pass = user && user.pass || "";
        _this.tipoUsuario = TypeUser_1.TypeUser.Empresa;
        return _this;
    }
    return UserEmpresa;
}(UserData_1.UserData));
exports.UserEmpresa = UserEmpresa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckVtcHJlc2EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyRW1wcmVzYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUd0Qyw4Q0FBNkM7QUFFN0M7SUFBaUMsK0JBQVE7SUFRckMscUJBQVksSUFBVTtRQUF0QixZQUNJLGlCQUFPLFNBU1Y7UUFSRyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUM1QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDOztJQUN4QyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbkJELENBQWlDLG1CQUFRLEdBbUJ4QztBQW5CWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4vVXNlckRhdGFcIjtcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IFBlcmlvZG8gfSBmcm9tIFwiLi9QZXJpZG9cIjtcbmltcG9ydCB7IFR5cGVVc2VyIH0gZnJvbSBcIi4uL3V0aWxzL1R5cGVVc2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyRW1wcmVzYSBleHRlbmRzIFVzZXJEYXRhe1xuICAgIGRpcmVjY2lvbkZpamE6IGJvb2xlYW47XG4gICAgZm90b3NFbXByZXNhOiBzdHJpbmdbXTtcbiAgICBjYXRlZ29yeTogQ2F0ZWdvcnk7XG4gICAgcGVyaW9kb3M6IFBlcmlvZG9bXTtcblxuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IodXNlcjogVXNlckRhdGEpOyBcbiAgICBjb25zdHJ1Y3Rvcih1c2VyPzogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7ICAgIFxuICAgICAgICB0aGlzLmdtYWlsID0gdXNlciAmJiB1c2VyLmdtYWlsIHx8IFwiXCI7XG4gICAgICAgIHRoaXMubm9tYnJlID0gdXNlciAmJiB1c2VyLm5vbWJyZSB8fCBcIlwiO1xuICAgICAgICB0aGlzLmFwZWxsaWRvcyA9IHVzZXIgJiYgdXNlci5hcGVsbGlkb3MgfHwgXCJcIjtcbiAgICAgICAgdGhpcy50ZWxlZm9ubyA9IHVzZXIgJiYgdXNlci50ZWxlZm9ubyB8fCBcIlwiO1xuICAgICAgICB0aGlzLmRpcmVjY2lvbiA9IHVzZXIgJiYgdXNlci5kaXJlY2Npb24gfHwgXCJcIjtcbiAgICAgICAgdGhpcy5mb3RvID0gdXNlciAmJiB1c2VyLmZvdG8gfHwgXCJcIjtcbiAgICAgICAgdGhpcy5wYXNzID0gdXNlciAmJiB1c2VyLnBhc3MgfHwgXCJcIjtcbiAgICAgICAgdGhpcy50aXBvVXN1YXJpbyA9IFR5cGVVc2VyLkVtcHJlc2E7XG4gICAgfSAgIFxufSJdfQ==