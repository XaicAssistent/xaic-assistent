import { UserEmpresa } from "../model/UserEmpresa";
import { UserData } from "../model/UserData";
import { TypeUser } from "../utils/TypeUser";
import { UserNormal } from "../model/UserNormal";

export class UserMapper {
    public static userEmpresaJSONToUserEmpresaBusqueda(userEmpresaJSON): UserEmpresa[]{
        
        let users: UserEmpresa[] = [];

        userEmpresaJSON["users"].forEach((usu) => {
            let user: UserEmpresa = new UserEmpresa();
            user.idUser = usu.IdUser;
            user.nombre = usu.Nombre;
            user.apellidos = usu.Apellidos;
            user.foto = usu.Foto;
            user.category.nombre = usu["Category.nombre"];
            user.telefono = usu.Telefono;
            users.push(user);
        });

        return users;
    }

    public static userEmpresaJSONToUserEmpresaInfoCita(userEmpresaJSON): UserEmpresa{
        let usu = userEmpresaJSON;
        let user: UserEmpresa = new UserEmpresa();

        user.idUser = usu.IdUser;
        user.nombre = usu.Nombre;
        user.apellidos = usu.Apellidos;
        user.foto = usu.Foto;
        user.category.nombre = usu["Category.nombre"];
        user.idUserEmprea = usu["UserEmpresa.IdUserEmpresa"];

        return user;
    }

    public static userJSONToUserData(userJSON, userInfoTipoJson): UserData{
        let usu = userJSON;
        let info = userInfoTipoJson;

        let userNormal: UserNormal = new UserNormal();
        let userEmpresa: UserEmpresa = new UserEmpresa();

        let user: UserData = new UserData();

        user.idUser = usu.IdUser;
        user.nombre = usu.Nombre;
        user.gmail = usu.Gmail;
        user.apellidos = usu.Apellidos;
        user.foto = usu.Foto;
        user.tipoUsuario = usu.TipoUsuario;

        if(usu.TipoUsuario == "empresa"){
            userEmpresa.idUserEmprea = info.IdUserEmpresa;
            userEmpresa.direccionFija = info.DrireccionFija;
            userEmpresa.category.idCategory = info.IdCategory;
            userEmpresa.passData(user);

            return userEmpresa;
        }else{
            userNormal.alergias = info.Alergias;
            userNormal.fechaNacimiento = info.FechaNacimiento;
            userNormal.passData(user);

            return userNormal;
        }
    }
    
}