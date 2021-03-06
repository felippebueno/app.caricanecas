import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

import {OneSignal} from "@ionic-native/onesignal";
import {Http} from "@angular/http";
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    //device_id               = "f7df9801-78f1-4b9e-b011-b5f4c7066c0a";
    device_id;
    appid                   = "b927f866-01b5-4e45-9b60-4b137e12c1ce";
    googleProjectNumber     = "811343929398";

    @ViewChild('fra_usuario') usuario;
    @ViewChild('fra_senha') senha;

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private oneSignal: OneSignal, public http: Http, public navParams: NavParams, public splashScreen: SplashScreen) {
    }

    ionViewDidLoad() {
        //Pega o device ID
        this.oneSignal.startInit(this.appid, this.googleProjectNumber);
	    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.getIds()
        .then(ids => {
            this.device_id   =  ids.userId
        });
        this.oneSignal.endInit();
        //this.configurePushNotification()

    }

    login(){
        alert("asd")
        alert(this.device_id)
        let postData = new FormData();
        postData.append('appkey', '7939518B-08C27B79-BFB41B80-6F654F40');
        postData.append('data', JSON.stringify({
                                                            "dev_hash": this.device_id,
                                                            "fra_usuario": this.usuario.value.toLowerCase(),
                                                            "fra_senha": this.senha.value,
                                                        }));

        //POST
        let url_p = 'https://www.scp.caricanecas.com.br/site/app/login/'
        this.http.post(url_p,postData)
        .map((res: any) => res.json())
        .subscribe(res => {
            //Se não tiver nenhum erro
            if(!res.erro.status){
                if(res.data.logado){
                    let user_storage = {
                        'logado'        : res.data.logado,
                        'fra_usuario'   : res.data.fra_usuario.toLowerCase(),
                        'device_id'     : this.device_id,
                    };
                    localStorage.setItem("user_data", JSON.stringify(user_storage));

                    // redireciona para home
                    this.navCtrl.setRoot(TabsPage);
                }
            }else{
                // Se tiver erro
                let alert = this.alertCtrl.create({
                    title: 'Ops..',
                    subTitle: res.erro.mensagem,
                    buttons: ['OK']
                });
                alert.present();
            }
        });
    }

    logout() {
        //localStorage.clear();
        //or
        localStorage.removeItem("user_data");

    }

    // configura o envio de PUSH
    configurePushNotification(){
        // chaves FireBase Google
        this.oneSignal.startInit(this.appid, this.googleProjectNumber);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
	    this.oneSignal.setEmail("suporte@lirix.com.br")

        // // faz algo quando a notificação é recebida
        // this.oneSignal.handleNotificationReceived().subscribe((data) => {
        //     //code
        // });
        //
        // // faz algo quando uma notificação é aberta
        // this.oneSignal.handleNotificationOpened().subscribe((data) => {
        //     //code
        // });

        this.oneSignal.endInit();

    }
}
