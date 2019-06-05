import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/UserService';
import { UserEmpresa } from '../model/UserEmpresa';
import { UserMapper } from '../mapper/UserMapper';
import { FeedBack } from '../utils/FeedBack';
import * as permissions from "nativescript-permissions";
import * as TNSPhone from 'nativescript-phone';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { CategoryService } from '../services/CategoryService';
import { CategoryMapper } from '../mapper/CategoryMapper';
import { Category } from '../model/Category';
import * as app from "tns-core-modules/application";
import { ModalComponent } from '../modal';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
declare var android;

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  moduleId: module.id,
  providers: [UserService,CategoryService]
})
export class SearchComponent implements OnInit {
  @ViewChild("modalChoseCategory") modalChoseCategory: ModalComponent;

  sideDrawer = <RadSideDrawer>app.getRootView();

  allUsersEmpresa: UserEmpresa[] = [];

  selectedCategory = 0;
  categorysNames: Array<string> = [];
  categorys: Category[] = [];

  constructor(private _userService: UserService, private _page: Page, private router: RouterExtensions, private _categoryService: CategoryService) { }

  ngOnInit() {
    this._page.actionBarHidden = true;
    this.sideDrawer.gesturesEnabled = true;

    this._userService.getAllUserEmpresa().subscribe(
      (ok) => {
        if (ok["users"] !== "null") {
          this.allUsersEmpresa = UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
        } else {
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      },
      (erro) => {
        console.log("ERROR PMV");
        console.log(erro);
      }
    );
  }

  choseCategory() {
    this._categoryService.getCategorys().subscribe(
      (ok) => {
        this.categorys = CategoryMapper.categoryJSONToCategory(ok);
        this.updateCategorysNames();
        this.modalChoseCategory.show();
      },
      (error) => {
        FeedBack.feedBackError("Error de conexiÃ³n...");
        console.log("ERROR PMV -> ");
        console.log(error);
      }
    );
  }

  categorySelected() {
    if(this.selectedCategory == 0){
      this._userService.getAllUserEmpresa().subscribe((ok)=>{
        if (ok["users"] !== "null") {
          this.allUsersEmpresa = UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
        } else {
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      },(err)=>{
          console.log(err);
      });
    } else {
    this._userService.getUsersEmpresaByCategory(this.selectedCategory).subscribe(
      (ok) => {
        if (ok["users"] !== "null") {
          this.allUsersEmpresa = UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
        } else {
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      }, (err) => {
        console.log(err);
      });
    }
    this.modalChoseCategory.hide()
  }

  updateCategorysNames() {
    this.categorysNames = [];
    this.categorysNames.push("Todas las categorias");
    this.categorys.forEach(cat => { this.categorysNames.push(cat.nombre) });
  }

  onItemTap(args) {
    var userEmpresaSelected: UserEmpresa = this.allUsersEmpresa[args.index];
    var id = {
      queryParams: {
        "id-selected": userEmpresaSelected.idUser,
      }
    }
    this.router.navigate(["/user-info-empresa"], id);
  }

  llamar(telefono) {
    permissions.requestPermission(android.Manifest.permission.CALL_PHONE).then(
      () => {
        TNSPhone.dial(String(telefono), false);
      }).catch(() => {
        console.log("Permission Denied!");
      });
  }
}