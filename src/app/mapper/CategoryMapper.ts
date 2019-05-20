import { Category } from "../model/Category";

export class CategoryMapper {
    public static categoryJSONToCategory(categoryJSON): Category[]{
        
        let categorys: Category[] = [];

        categoryJSON["categorys"].forEach((cat) => {
            let category: Category = new Category();
            category.idCategory = cat.IdCategory;
            category.nombre = cat.Nombre;
            categorys.push(category);
        });

        return categorys;
    }

}