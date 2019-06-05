import { UserData } from "../model/UserData";
import * as appSettings from "tns-core-modules/application-settings";

export class UserLoged{
    private static instance : UserLoged;
    private userLoged:UserData = new UserData();

    static getInstance(): UserLoged {
        if (!UserLoged.instance) {
            UserLoged.instance = new UserLoged();
        }

        return UserLoged.instance;
    }

    private constructor(){};

    setUserLoged(user: UserData){
        this.userLoged = user;
    }

    getUserLoged(): UserData{
        return this.userLoged;
    }

    deleteUserData(){
        this.userLoged = new UserData();
        appSettings.setString("tokenUser", "");
    }
}