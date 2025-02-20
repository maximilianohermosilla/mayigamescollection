import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlataformasComponent } from './plataformas.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PlataformasComponent }
    ])],
    exports: [RouterModule]
})
export class PlataformasRoutingModule { }
