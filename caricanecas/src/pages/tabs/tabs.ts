import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

import { HomePage } from '../home/home';
import { IndicadoresPage} from "../indicadores/indicadores";
import { AvisosPage} from "../avisos/avisos";
import { LoginPage} from "../login/login";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = IndicadoresPage;
    tab3Root = AvisosPage;
    user_data;

    constructor(public menuCtrl: MenuController,public navCtrl: NavController, public http: Http) {
    }

    // funçoões menu
    openMenu() {
        this.menuCtrl.open();
    }

    closeMenu() {
        this.menuCtrl.close();
    }

    toggleMenu() {
        this.menuCtrl.toggle();
    }

    logout() {
       //localStorage.clear();
        //or
        localStorage.removeItem("user_data");
        //this.navCtrl.push(LoginPage);
        this.navCtrl.setRoot(LoginPage);
    }

    verificaLogin() {
        console.info("verifica login");

        if(localStorage.getItem("user_data")){
            this.user_data = JSON.parse(localStorage.getItem("user_data"))

            //POST
            let postData = new FormData();
            postData.append('appkey', '7939518B-08C27B79-BFB41B80-6F654F40');
            postData.append('data', JSON.stringify({
                "dev_hash": this.user_data.device_id,
            }));

            let url_p = 'https://www.scp.caricanecas.com.br/site/app/home'
            this.http.post(url_p,postData)
                .map((res: any) => res.json())
                .subscribe(res => {

                    // verifica se o device esta cadastrado caso não redireciona para o login
                    if(res.erro.status){
                        localStorage.removeItem("user_data");
                        console.info("REDIRECT")
                        //this.navCtrl.setRoot(LoginPage);
                        this.navCtrl.push(LoginPage)

                    }
                });
        }else {
            localStorage.removeItem("user_data");
            //this.navCtrl.setRoot(LoginPage);
            this.navCtrl.push(LoginPage)
        }
    }


}
