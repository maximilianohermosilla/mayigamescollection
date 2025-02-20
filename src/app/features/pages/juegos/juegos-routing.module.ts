import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JuegosComponent } from './juegos.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: JuegosComponent }
    ])],
    exports: [RouterModule]
})
export class JuegosRoutingModule { }
