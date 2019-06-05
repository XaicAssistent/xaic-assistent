"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData_1 = require("./UserData");
var Category_1 = require("./Category");
var TypeUser_1 = require("../utils/TypeUser");
var UserEmpresa = /** @class */ (function (_super) {
    __extends(UserEmpresa, _super);
    function UserEmpresa(user) {
        var _this = _super.call(this) || this;
        _this.category = new Category_1.Category();
        _this.gmail = user && user.gmail || "";
        _this.nombre = user && user.nombre || "";
        _this.apellidos = user && user.apellidos || "";
        _this.telefono = user && user.telefono || "";
        _this.direccion = user && user.direccion || "";
        _this.foto = user && user.foto || "";
        _this.pass = user && user.pass || "";
        _this.tipoUsuario = TypeUser_1.TypeUser.Empresa;
        _this.periodos = [];
        return _this;
    }
    UserEmpresa.prototype.passData = function (user) {
        this.gmail = user.gmail;
        this.nombre = user.nombre;
        this.apellidos = user.apellidos;
        this.telefono = user.telefono;
        this.direccion = user.direccion;
        this.foto = user.foto;
        this.pass = user.pass;
    };
    return UserEmpresa;
}(UserData_1.UserData));
exports.UserEmpresa = UserEmpresa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckVtcHJlc2EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyRW1wcmVzYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUN0Qyx1Q0FBc0M7QUFFdEMsOENBQTZDO0FBRTdDO0lBQWlDLCtCQUFRO0lBU3JDLHFCQUFZLElBQVU7UUFBdEIsWUFDSSxpQkFBTyxTQVVWO1FBaEJELGNBQVEsR0FBYSxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQU9oQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUM1QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOztJQUN2QixDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixJQUFjO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBL0JELENBQWlDLG1CQUFRLEdBK0J4QztBQS9CWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4vVXNlckRhdGFcIjtcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IFBlcmlvZG8gfSBmcm9tIFwiLi9QZXJpZG9cIjtcbmltcG9ydCB7IFR5cGVVc2VyIH0gZnJvbSBcIi4uL3V0aWxzL1R5cGVVc2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyRW1wcmVzYSBleHRlbmRzIFVzZXJEYXRhe1xuICAgIGlkVXNlckVtcHJlYTogbnVtYmVyO1xuICAgIGRpcmVjY2lvbkZpamE6IGJvb2xlYW47XG4gICAgZm90b3NFbXByZXNhOiBzdHJpbmdbXTtcbiAgICBjYXRlZ29yeTogQ2F0ZWdvcnkgPSBuZXcgQ2F0ZWdvcnkoKTtcbiAgICBwZXJpb2RvczogUGVyaW9kb1tdO1xuXG4gICAgY29uc3RydWN0b3IoKTtcbiAgICBjb25zdHJ1Y3Rvcih1c2VyOiBVc2VyRGF0YSk7IFxuICAgIGNvbnN0cnVjdG9yKHVzZXI/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTsgICAgXG4gICAgICAgIHRoaXMuZ21haWwgPSB1c2VyICYmIHVzZXIuZ21haWwgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5ub21icmUgPSB1c2VyICYmIHVzZXIubm9tYnJlIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuYXBlbGxpZG9zID0gdXNlciAmJiB1c2VyLmFwZWxsaWRvcyB8fCBcIlwiO1xuICAgICAgICB0aGlzLnRlbGVmb25vID0gdXNlciAmJiB1c2VyLnRlbGVmb25vIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuZGlyZWNjaW9uID0gdXNlciAmJiB1c2VyLmRpcmVjY2lvbiB8fCBcIlwiO1xuICAgICAgICB0aGlzLmZvdG8gPSB1c2VyICYmIHVzZXIuZm90byB8fCBcIlwiO1xuICAgICAgICB0aGlzLnBhc3MgPSB1c2VyICYmIHVzZXIucGFzcyB8fCBcIlwiO1xuICAgICAgICB0aGlzLnRpcG9Vc3VhcmlvID0gVHlwZVVzZXIuRW1wcmVzYTtcbiAgICAgICAgdGhpcy5wZXJpb2RvcyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgcGFzc0RhdGEodXNlcjogVXNlckRhdGEpe1xuICAgICAgICB0aGlzLmdtYWlsID0gdXNlci5nbWFpbDtcbiAgICAgICAgdGhpcy5ub21icmUgPSB1c2VyLm5vbWJyZTtcbiAgICAgICAgdGhpcy5hcGVsbGlkb3MgPSB1c2VyLmFwZWxsaWRvcztcbiAgICAgICAgdGhpcy50ZWxlZm9ubyA9IHVzZXIudGVsZWZvbm87XG4gICAgICAgIHRoaXMuZGlyZWNjaW9uID0gdXNlci5kaXJlY2Npb247XG4gICAgICAgIHRoaXMuZm90byA9IHVzZXIuZm90bztcbiAgICAgICAgdGhpcy5wYXNzID0gdXNlci5wYXNzO1xuICAgIH1cbn0iXX0=