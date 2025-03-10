import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart'
import { ReportesComponent } from './reportes.component';
import { ReportesRoutingModule } from './reportes-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReportesRoutingModule,
        ChartModule
    ],
    declarations: [ReportesComponent]
})
export class ReportesModule { }
