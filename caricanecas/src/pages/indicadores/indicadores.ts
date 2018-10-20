import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import { LoginPage } from "../login/login";

/**
 * Generated class for the IndicadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-indicadores',
    templateUrl: 'indicadores.html',
})

export class IndicadoresPage {

    user_data;
    indicadores;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    }

    ionViewDidLoad(){
	    this.user_data = JSON.parse(localStorage.getItem("user_data"))

	    //POST
	    let postData = new FormData();
	    postData.append('appkey', '7939518B-08C27B79-BFB41B80-6F654F40');
	    postData.append('data', JSON.stringify({
	      "dev_hash": this.user_data.device_id,
	    }));

	    let url_p = 'https://www.scp.caricanecas.com.br/site/app/indicadores'
	    this.http.post(url_p,postData)
	    .map((res: any) => res.json())
	    .subscribe(res => {
	      // verifica se o device esta cadastrado caso não redireciona para o login
	      if(res.erro.status){
	          localStorage.removeItem("user_data");
	          //this.navCtrl.setRoot(LoginPage);
	          this.navCtrl.push(LoginPage)

	      }else{
	        this.indicadores = res.data.indicadores
	      }

	    });
    }

	/**
	 *  execulta toda vez que a página é exibida.
	 */
    // ionViewWillEnter(){
    //     this.ionViewDidLoad();
    // }


	/**
	 * Pull refresher
	 *
	 * @param refresher
	 */
	doRefresh(refresher) {
		setTimeout(() => {
			this.ionViewDidLoad()
			refresher.complete();
		}, 3000);
		//this.indicadores =  this.indicadores;
	}

}
