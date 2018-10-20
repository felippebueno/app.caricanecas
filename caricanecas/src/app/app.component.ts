import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {


    rootPage:any
    public ids: any;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        //Okay, so the platform is ready and our plugins are available.
        //Here you can do any higher level native things you might need. 7dd900
        platform.ready().then(() => {
            statusBar.overlaysWebView(true);

	        // tempo para sumis o splasj em milisegundos
	        timer(4000).subscribe(() =>
		        splashScreen.hide()
	        )
        });
    }

    ngOnInit(){
	    if(!localStorage.getItem("user_data")){
		    this.rootPage = LoginPage;
	    }else{
		    this.rootPage = TabsPage;
	    }

	    this.splashScreen.show();
	    //this.splashScreen.hide();
       //this.configurePushNotification();
    }
}
