import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { DataView } from 'primeng/dataview';
import { PlataformasService } from 'src/app/core/services/plataformas.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Juego } from 'src/app/core/interfaces/juego';
import { Plataforma } from 'src/app/core/interfaces/plataforma';

@Component({
    templateUrl: './juegos.component.html',
    standalone: false
})
export class JuegosComponent implements OnInit {
    public juegosService = inject(JuegosService);
    public plataformasService = inject(PlataformasService);
    public spinnerService = inject(SpinnerService);
    public tokenService = inject(TokenService);
    public cdr = inject(ChangeDetectorRef);

    public listaJuegos: Juego[] = [];
    public listaJuegosFiltrados: Juego[] = [];
    public listaPlataformas: Plataforma[] = [];

    public userName: string = "";
    public display: boolean = false;
    public defaultImage: string = "/assets/placeholder.jpg";
    public nombreJuego: string = "";
    public plataformaSeleccionada: number = 0;
    public juegoSeleccionado = signal<Juego | undefined>(undefined);

    ngOnInit(): void {
        this.getAllJuegos();
        this.getAllPlataformas();
        this.userName = this.tokenService.getUserName();
    }

    public getAllJuegos() {
        this.juegosService.GetAllByUsuario().subscribe((response) => {
            this.listaJuegos = response;
            this.listaJuegosFiltrados = response;
        })
    }

    public getAllPlataformas() {
        this.plataformasService.GetAll().subscribe((response) => {
            this.listaPlataformas = [{ nombre: "Todos", label: "Todos", value: 0 }]
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaPlataformas.push(...listaResponse);
        })
    }

    public onFilterByPlataforma(dv: DataView, event: any) {
        this.plataformaSeleccionada = event.value;
        this.filtrarJuegos();
    }

    public onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
        this.cdr.detectChanges();
    }

    public filtrarJuegos() {
        this.listaJuegosFiltrados = this.listaJuegos.filter(juego => {
            const coincideNombre = juego.nombre.toLowerCase().includes(this.nombreJuego.toLowerCase());
            const coincidePlataforma = this.plataformaSeleccionada
                ? juego.juegoPlataformas!.some((jp: any) => jp.idPlataforma === this.plataformaSeleccionada)
                : true;
            return coincideNombre && coincidePlataforma;
        });
        this.cdr.detectChanges();
    }

    public openFormJuego(juego: Juego | undefined) {
        if (juego && juego.imagen) { juego!.imagen = juego?.imagen?.replace("/assets/placeholder.jpg", ""); }
        this.juegoSeleccionado.set(juego);
        this.display = true;
        this.cdr.detectChanges();
        console.log(juego)
    }
}
