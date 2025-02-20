import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformasRoutingModule } from './plataformas-routing.module';
import { PlataformasComponent } from './plataformas.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
    imports: [
        CommonModule,
        PlataformasRoutingModule,
        NgxExtendedPdfViewerModule
    ],
    declarations: [PlataformasComponent]
})
export class PlataformasModule { }
