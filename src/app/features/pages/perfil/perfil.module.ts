import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        FormUsuarioComponent,
        PerfilRoutingModule
    ],
    providers: [UsuarioService],
    declarations: [PerfilComponent]
})
export class PerfilModule { }
