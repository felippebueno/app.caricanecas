import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AvisosDetalhesPage} from "../avisos-detalhes/avisos-detalhes";
import {LoginPage} from "../login/login";
import {Http} from "@angular/http";

/**
 * Generated class for the AvisosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-avisos',
  templateUrl: 'avisos.html',
})
export class AvisosPage {
    item;
    user_data;
    avisos_hoje             = []; // Hoje.
    avisos_ontem            = []; // Ontem.
    avisos_sete_dias        = []; // Últimos 7 dias.
    avisos_mais_sete_dias   = []; // A mais de 7 dias.

/*
*
* avi_imagem
* avi_assunto
* avi_mensagem
* avi_link
* avi_datacadastral
*
*
* */

    constructor(public navCtrl: NavController, public http: Http) {
    }

    ionViewDidLoad() {
        this.user_data = JSON.parse(localStorage.getItem("user_data"))

        //POST
        let postData = new FormData();
        postData.append('appkey', '7939518B-08C27B79-BFB41B80-6F654F40');
        postData.append('data', JSON.stringify({
            "dev_hash": this.user_data.device_id,
        }));

        let url_p = 'https://www.scp.caricanecas.com.br/site/app/avisos'
        this.http.post(url_p,postData)
        .map((res: any) => res.json())
        .subscribe(res => {
            //verifica se o device esta cadastrado caso não redireciona para o login
	        console.info(res)
            if(res.erro.status){
                localStorage.removeItem("user_data");
                this.navCtrl.push(LoginPage)

            }else{
                this.avisos_hoje                = res.data.avisos[0]
                this.avisos_ontem               = res.data.avisos[1]
                this.avisos_sete_dias           = res.data.avisos[2]
                this.avisos_mais_sete_dias      = res.data.avisos[3]
            }
        });
    }

	/**
	 *
	 * @param item
	 */
	openNavDetailsPage(item) {
        this.navCtrl.push(AvisosDetalhesPage, { item: item });
    }

	/**
	 *  execulta toda vez que a página é exibida.
	 */
	ionViewWillEnter(){
		//this.ionViewDidLoad();
	}


	doRefresh(refresher) {
		setTimeout(() => {
			this.ionViewDidLoad()
			refresher.complete();
		}, 2000);
	}
}
