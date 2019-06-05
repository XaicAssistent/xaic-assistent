"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EstadoEvento_1 = require("../model/EstadoEvento");
var EstadosEventosMapper = /** @class */ (function () {
    function EstadosEventosMapper() {
    }
    EstadosEventosMapper.estadosEventoJSONToEstadoEvento = function (estadosJSON) {
        var estados = [];
        estadosJSON.forEach(function (esta) {
            var estado = new EstadoEvento_1.EstadoEvento();
            estado.idEstado = esta.IdEstado;
            estado.codigo = esta.Codigo;
            estado.descripcion = esta.Descripcion;
            estados.push(estado);
        });
        return estados;
    };
    return EstadosEventosMapper;
}());
exports.EstadosEventosMapper = EstadosEventosMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXN0YWRvc0V2ZW50b3NNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFc3RhZG9zRXZlbnRvc01hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFxRDtBQUVyRDtJQUFBO0lBZUEsQ0FBQztJQWRpQixvREFBK0IsR0FBN0MsVUFBOEMsV0FBVztRQUVyRCxJQUFJLE9BQU8sR0FBbUIsRUFBRSxDQUFDO1FBRWpDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3JCLElBQUksTUFBTSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQztZQUM5QyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFc3RhZG9FdmVudG8gfSBmcm9tIFwiLi4vbW9kZWwvRXN0YWRvRXZlbnRvXCI7XG5cbmV4cG9ydCBjbGFzcyBFc3RhZG9zRXZlbnRvc01hcHBlciB7XG4gICAgcHVibGljIHN0YXRpYyBlc3RhZG9zRXZlbnRvSlNPTlRvRXN0YWRvRXZlbnRvKGVzdGFkb3NKU09OKTogRXN0YWRvRXZlbnRvW117XG4gICAgICAgICAgICBcbiAgICAgICAgbGV0IGVzdGFkb3M6IEVzdGFkb0V2ZW50b1tdID0gW107XG5cbiAgICAgICAgZXN0YWRvc0pTT04uZm9yRWFjaCgoZXN0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IGVzdGFkbzogRXN0YWRvRXZlbnRvID0gbmV3IEVzdGFkb0V2ZW50bygpO1xuICAgICAgICAgICAgZXN0YWRvLmlkRXN0YWRvID0gZXN0YS5JZEVzdGFkbztcbiAgICAgICAgICAgIGVzdGFkby5jb2RpZ28gPSBlc3RhLkNvZGlnbztcbiAgICAgICAgICAgIGVzdGFkby5kZXNjcmlwY2lvbiA9IGVzdGEuRGVzY3JpcGNpb247XG4gICAgICAgICAgICBlc3RhZG9zLnB1c2goZXN0YWRvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGVzdGFkb3M7XG4gICAgfVxufSJdfQ==