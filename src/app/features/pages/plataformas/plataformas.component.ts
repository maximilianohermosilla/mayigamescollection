import { Component, inject, OnInit } from '@angular/core';
import { Juego } from 'src/app/core/interfaces/juego';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { PlataformasService } from 'src/app/core/services/plataformas.service';

@Component({
    templateUrl: './plataformas.component.html',
    standalone: false
})
export class PlataformasComponent implements OnInit {
    private juegosService = inject(JuegosService);
    private plataformasService = inject(PlataformasService);

    public plataformas: { id?: number; nombre: string; imagen?: string; cantidad: number }[] = [];
    public totalJuegos: number = 0;

    ngOnInit(): void {
        this.cargarDatos();
    }

    private cargarDatos(): void {
        this.juegosService.GetAllByUsuario().subscribe(juegos => {
            this.totalJuegos = juegos.length;
            const conteo = this.contarPorPlataforma(juegos);

            this.plataformasService.GetAll().subscribe(plataformas => {
                this.plataformas = plataformas.map(p => ({
                    id: p.id,
                    nombre: p.nombre,
                    imagen: p.imagen,
                    cantidad: conteo.get(p.id!) ?? 0
                }));
            });
        });
    }

    private contarPorPlataforma(juegos: Juego[]): Map<number, number> {
        const mapa = new Map<number, number>();
        juegos.forEach(juego => {
            juego.juegoPlataformas?.forEach(jp => {
                mapa.set(jp.idPlataforma, (mapa.get(jp.idPlataforma) ?? 0) + 1);
            });
        });
        return mapa;
    }
}
