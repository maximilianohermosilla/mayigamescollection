import { Component, inject, OnInit } from '@angular/core';
import { Plataforma } from 'src/app/core/interfaces/plataforma';
import { PlataformasService } from 'src/app/core/services/plataformas.service';

@Component({
    templateUrl: './plataformas.component.html',
    standalone: false
})
export class PlataformasComponent implements OnInit{
    public plataformasService = inject(PlataformasService);

    public listaPlataformas: Plataforma[] = [];

    ngOnInit(): void {
        this.getAllPlataformas();
    }

    public getAllPlataformas() {
        this.plataformasService.GetAll().subscribe((response) => {
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaPlataformas.push(...listaResponse);
            console.log(listaResponse)
        })
    }
}
