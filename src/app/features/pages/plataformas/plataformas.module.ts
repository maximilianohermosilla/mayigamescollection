import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformasRoutingModule } from './plataformas-routing.module';
import { PlataformasComponent } from './plataformas.component';

@NgModule({
    imports: [
        CommonModule,
        PlataformasRoutingModule
    ],
    declarations: [PlataformasComponent]
})
export class PlataformasModule { }
