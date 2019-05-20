"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = require("../model/Category");
var CategoryMapper = /** @class */ (function () {
    function CategoryMapper() {
    }
    CategoryMapper.categoryJSONToCategory = function (categoryJSON) {
        var categorys = [];
        categoryJSON["categorys"].forEach(function (cat) {
            var category = new Category_1.Category();
            category.idCategory = cat.IdCategory;
            category.nombre = cat.Nombre;
            categorys.push(category);
        });
        return categorys;
    };
    return CategoryMapper;
}());
exports.CategoryMapper = CategoryMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlNYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDYXRlZ29yeU1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUU3QztJQUFBO0lBZUEsQ0FBQztJQWRpQixxQ0FBc0IsR0FBcEMsVUFBcUMsWUFBWTtRQUU3QyxJQUFJLFNBQVMsR0FBZSxFQUFFLENBQUM7UUFFL0IsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDbEMsSUFBSSxRQUFRLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDeEMsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUM3QixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4uL21vZGVsL0NhdGVnb3J5XCI7XG5cbmV4cG9ydCBjbGFzcyBDYXRlZ29yeU1hcHBlciB7XG4gICAgcHVibGljIHN0YXRpYyBjYXRlZ29yeUpTT05Ub0NhdGVnb3J5KGNhdGVnb3J5SlNPTik6IENhdGVnb3J5W117XG4gICAgICAgIFxuICAgICAgICBsZXQgY2F0ZWdvcnlzOiBDYXRlZ29yeVtdID0gW107XG5cbiAgICAgICAgY2F0ZWdvcnlKU09OW1wiY2F0ZWdvcnlzXCJdLmZvckVhY2goKGNhdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5OiBDYXRlZ29yeSA9IG5ldyBDYXRlZ29yeSgpO1xuICAgICAgICAgICAgY2F0ZWdvcnkuaWRDYXRlZ29yeSA9IGNhdC5JZENhdGVnb3J5O1xuICAgICAgICAgICAgY2F0ZWdvcnkubm9tYnJlID0gY2F0Lk5vbWJyZTtcbiAgICAgICAgICAgIGNhdGVnb3J5cy5wdXNoKGNhdGVnb3J5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5cztcbiAgICB9XG5cbn0iXX0=