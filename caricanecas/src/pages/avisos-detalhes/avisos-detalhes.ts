import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AvisosDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-avisos-detalhes',
    templateUrl: 'avisos-detalhes.html',
})
export class AvisosDetalhesPage {

    item;
    teste;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item     = navParams.data.item;
      this.teste    = navParams.data.item.link;
    }

    ionViewDidLoad() {

    }

    open_url(url) {
        console.log(url)
        window.open(url,"_system", "location=yes");
    }

}
