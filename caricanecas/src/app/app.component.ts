import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";

import { AvisosPage } from "../pages/avisos/avisos";

import {Http} from "@angular/http";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {

    rootPage:any = LoginPage; // LoginPage

    public ids: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public http: Http) {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need. 7dd900
        platform.ready().then(() => {
            console.info(localStorage.getItem("user_data"))
            if(localStorage.getItem("user_data")){
                console.info("TEM USER DATA user_data")
                console.info(localStorage.getItem("user_data"))
                this.rootPage = TabsPage;
            }

            statusBar.overlaysWebView(true);
            //statusBar.styleDefault();
            //statusBar.backgroundColorByHexString('#7dd900');
            //statusBar.styleBlackOpaque()
            splashScreen.hide();
        });
    }

    ngOnInit(){
       //this.configurePushNotification();
    }
}
