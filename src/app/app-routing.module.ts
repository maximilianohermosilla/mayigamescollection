import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './features/notfound/notfound.component';
import { TokenGuard } from './core/guards/token-guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule), canActivate: [TokenGuard] },
                    { path: 'pages', loadChildren: () => import('./features/pages/pages.module').then(m => m.PagesModule), canActivate: [TokenGuard] },
                ],
            },
            { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
