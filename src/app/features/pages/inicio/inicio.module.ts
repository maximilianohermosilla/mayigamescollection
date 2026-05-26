import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';

@NgModule({
    imports: [
        CommonModule,
        InicioRoutingModule,
        ChartModule
    ],
    declarations: [InicioComponent]
})
export class InicioModule { }
