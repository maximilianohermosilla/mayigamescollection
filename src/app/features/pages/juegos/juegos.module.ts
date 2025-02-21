import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormJuegoComponent } from 'src/app/shared/components/form-juego/form-juego.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        JuegosRoutingModule,
        FormJuegoComponent,
        DialogModule
    ],
    declarations: [JuegosComponent]
})
export class JuegosModule { }
