import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisosDetalhesPage } from './avisos-detalhes';

@NgModule({
  declarations: [
    AvisosDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisosDetalhesPage),
  ],
})
export class AvisosDetalhesPageModule {}
