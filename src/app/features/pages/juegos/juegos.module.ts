import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        JuegosRoutingModule
    ],
    declarations: [JuegosComponent]
})
export class JuegosModule { }
