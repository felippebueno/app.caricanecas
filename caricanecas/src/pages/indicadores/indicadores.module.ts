import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndicadoresPage } from './indicadores';

@NgModule({
  declarations: [
    IndicadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(IndicadoresPage),
  ],
})
export class IndicadoresPageModule {}
