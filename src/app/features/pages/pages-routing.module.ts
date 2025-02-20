import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
        { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
        { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) },
        { path: 'plataformas', loadChildren: () => import('./plataformas/plataformas.module').then(m => m.PlataformasModule) },
        { path: 'reportes', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
