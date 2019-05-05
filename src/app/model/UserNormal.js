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
        _this.tipoUsuario = TypeUser_1.TypeUser.Normal;
        return _this;
    }
    return UserEmpresa;
}(UserData_1.UserData));
exports.UserEmpresa = UserEmpresa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck5vcm1hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXJOb3JtYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBc0M7QUFDdEMsOENBQTZDO0FBRTdDO0lBQWlDLCtCQUFRO0lBTXJDLHFCQUFZLElBQVU7UUFBdEIsWUFDSSxpQkFBTyxTQVNWO1FBUkcsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDeEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDOUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDNUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDOUMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQzs7SUFDdkMsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFpQyxtQkFBUSxHQWlCeEM7QUFqQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL1VzZXJEYXRhXCI7XG5pbXBvcnQgeyBUeXBlVXNlciB9IGZyb20gXCIuLi91dGlscy9UeXBlVXNlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlckVtcHJlc2EgZXh0ZW5kcyBVc2VyRGF0YXtcbiAgICBmZWNoYU5hY2ltaWVudG86IERhdGU7XG4gICAgYWxlcmdpYXM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IodXNlcjogVXNlckRhdGEpOyBcbiAgICBjb25zdHJ1Y3Rvcih1c2VyPzogYW55KSB7XG4gICAgICAgIHN1cGVyKCk7ICAgIFxuICAgICAgICB0aGlzLmdtYWlsID0gdXNlciAmJiB1c2VyLmdtYWlsIHx8IFwiXCI7XG4gICAgICAgIHRoaXMubm9tYnJlID0gdXNlciAmJiB1c2VyLm5vbWJyZSB8fCBcIlwiO1xuICAgICAgICB0aGlzLmFwZWxsaWRvcyA9IHVzZXIgJiYgdXNlci5hcGVsbGlkb3MgfHwgXCJcIjtcbiAgICAgICAgdGhpcy50ZWxlZm9ubyA9IHVzZXIgJiYgdXNlci50ZWxlZm9ubyB8fCBcIlwiO1xuICAgICAgICB0aGlzLmRpcmVjY2lvbiA9IHVzZXIgJiYgdXNlci5kaXJlY2Npb24gfHwgXCJcIjtcbiAgICAgICAgdGhpcy5mb3RvID0gdXNlciAmJiB1c2VyLmZvdG8gfHwgXCJcIjtcbiAgICAgICAgdGhpcy5wYXNzID0gdXNlciAmJiB1c2VyLnBhc3MgfHwgXCJcIjtcbiAgICAgICAgdGhpcy50aXBvVXN1YXJpbyA9IFR5cGVVc2VyLk5vcm1hbDtcbiAgICB9ICAgXG59Il19