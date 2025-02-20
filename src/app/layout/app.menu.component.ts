import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: false
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'INICIO',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/pages/inicio'] }
                ]
            },
            {
                label: 'ADMINISTRACIÓN',
                items: [
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/pages/perfil'] },
                    { label: 'Juegos', icon: 'pi pi-fw pi-list', routerLink: ['/pages/juegos'] },
                    { label: 'Plataformas', icon: 'pi pi-fw pi-image', routerLink: ['/pages/plataformas'] },                    
                ]
            },           
            {
                label: 'Reportes',
                items: [
                    {
                        label: 'Reporte por plataforma', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/pages/reportes']
                    }
                ]
            }
        ];
    }
}
