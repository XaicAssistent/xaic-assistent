"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserData_1 = require("./UserData");
var TypeUser_1 = require("../utils/TypeUser");
var UserNormal = /** @class */ (function (_super) {
    __extends(UserNormal, _super);
    function UserNormal(user) {
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
    return UserNormal;
}(UserData_1.UserData));
exports.UserNormal = UserNormal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck5vcm1hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXJOb3JtYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBc0M7QUFDdEMsOENBQTZDO0FBRTdDO0lBQWdDLDhCQUFRO0lBTXBDLG9CQUFZLElBQVU7UUFBdEIsWUFDSSxpQkFBTyxTQVNWO1FBUkcsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDeEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDOUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDNUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDOUMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQzs7SUFDdkMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFnQyxtQkFBUSxHQWlCdkM7QUFqQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL1VzZXJEYXRhXCI7XG5pbXBvcnQgeyBUeXBlVXNlciB9IGZyb20gXCIuLi91dGlscy9UeXBlVXNlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlck5vcm1hbCBleHRlbmRzIFVzZXJEYXRhe1xuICAgIGZlY2hhTmFjaW1pZW50bzogRGF0ZTtcbiAgICBhbGVyZ2lhczogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKTtcbiAgICBjb25zdHJ1Y3Rvcih1c2VyOiBVc2VyRGF0YSk7IFxuICAgIGNvbnN0cnVjdG9yKHVzZXI/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTsgICAgXG4gICAgICAgIHRoaXMuZ21haWwgPSB1c2VyICYmIHVzZXIuZ21haWwgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5ub21icmUgPSB1c2VyICYmIHVzZXIubm9tYnJlIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuYXBlbGxpZG9zID0gdXNlciAmJiB1c2VyLmFwZWxsaWRvcyB8fCBcIlwiO1xuICAgICAgICB0aGlzLnRlbGVmb25vID0gdXNlciAmJiB1c2VyLnRlbGVmb25vIHx8IFwiXCI7XG4gICAgICAgIHRoaXMuZGlyZWNjaW9uID0gdXNlciAmJiB1c2VyLmRpcmVjY2lvbiB8fCBcIlwiO1xuICAgICAgICB0aGlzLmZvdG8gPSB1c2VyICYmIHVzZXIuZm90byB8fCBcIlwiO1xuICAgICAgICB0aGlzLnBhc3MgPSB1c2VyICYmIHVzZXIucGFzcyB8fCBcIlwiO1xuICAgICAgICB0aGlzLnRpcG9Vc3VhcmlvID0gVHlwZVVzZXIuTm9ybWFsO1xuICAgIH0gICBcbn0iXX0=