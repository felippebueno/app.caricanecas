import {Component, ViewChild} from '@angular/core';
import { Http } from '@angular/http';
import { NavController} from "ionic-angular";
import 'rxjs/add/operator/map';

import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    user_data;
    fra_acessos;
    fra_emails;
    fra_nome;
    fra_telefone1;
    fra_tipo;
    fra_ultimoacesso;

    @ViewChild('fra_usuario') usuario;
    @ViewChild('fra_senha') senha;

    constructor(public http: Http,public navCtrl: NavController){
    }

	ionViewDidLoad() {
        console.info("HOME")
        if(localStorage.getItem("user_data")){
            console.info("tem user_data")
            this.user_data = JSON.parse(localStorage.getItem("user_data"))
            console.info(this.user_data);

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

                }else{
                    this.fra_acessos       = res.data.fra_acessos;
                    this.fra_emails        = res.data.fra_emails;
                    this.fra_nome          = res.data.fra_nome;
                    this.fra_telefone1     = res.data.fra_telefone1;
                    this.fra_tipo          = res.data.fra_tipo;
                    this.fra_ultimoacesso  = res.data.fra_ultimoacesso;
                }


            });
        }

    }

    otherFunctionHome(){
        console.info("otherFunctionHome")
    }

	/**
	 *  execulta toda vez que a página é exibida.
	 */
    // ionViewWillEnter(){
    //     this.ngOnInit();
    // }

	/**
     * Pull refresher
     *
	 * @param refresher
	 */
	doRefresh(refresher) {
		this.ionViewDidLoad()
		refresher.complete();
	}
}


