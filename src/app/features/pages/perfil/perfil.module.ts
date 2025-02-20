import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';

@NgModule({
    imports: [
        CommonModule,
        PerfilRoutingModule
    ],
    declarations: [PerfilComponent]
})
export class PerfilModule { }
