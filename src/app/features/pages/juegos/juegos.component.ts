import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { PlataformasService } from 'src/app/core/services/plataformas.service';

@Component({
    templateUrl: './juegos.component.html',
    standalone: false
})
export class JuegosComponent implements OnInit {
    public juegosService = inject(JuegosService);
    public plataformasService = inject(PlataformasService);
    public spinnerService = inject(SpinnerService);
    public cdr = inject(ChangeDetectorRef);

    public listaJuegos: any[] = [];
    public listaJuegosFiltrados: any[] = [];
    public listaPlataformas: any[] = [];
    public defaultImage: string = "/assets/placeholder.jpg";
    public nombreJuego: string = "";
    public plataformaSeleccionada: number = 0;

    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    sourceCities: any[] = [];
    targetCities: any[] = [];
    orderCities: any[] = [];

    ngOnInit(): void {
        this.getAllJuegos();
        this.getAllPlataformas();
    }

    public getAllJuegos() {
        this.juegosService.GetAllByUsuario(1).subscribe((response) => {
            this.listaJuegos = response;
            this.listaJuegosFiltrados = response;
            console.log(response);
        })
    }

    public getAllPlataformas() {
        this.plataformasService.GetAll().subscribe((response) => {
            this.listaPlataformas = [ { label: "Todos", value: 0 } ]
            const listaResponse = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
            this.listaPlataformas.push(...listaResponse);
            console.log(response);
        })
    }

    public onFilterByPlataforma(dv: DataView, event: any) {
        console.log(dv)
        console.log(event)
        this.plataformaSeleccionada = event.value;
        this.filtrarJuegos();
        //dv.filter(event.value);
    }

    public onFilter(dv: DataView, event: Event) {
        console.log(dv)
        console.log(event)
        dv.filter((event.target as HTMLInputElement).value);
        this.cdr.detectChanges();
    }

    public filtrarJuegos() {
        this.listaJuegosFiltrados = this.listaJuegos.filter(juego => {
            const coincideNombre = juego.nombre.toLowerCase().includes(this.nombreJuego.toLowerCase());
            const coincidePlataforma = this.plataformaSeleccionada
                ? juego.juegoPlataformas.some((jp: any) => jp.idPlataforma === this.plataformaSeleccionada)
                : true;
            return coincideNombre && coincidePlataforma;
        });
        this.cdr.detectChanges();
        console.log(this.listaJuegosFiltrados)
    }

    public cargarSpinner() {
        this.spinnerService.showSpinner();

        setTimeout(() => {
            this.spinnerService.hideSpinner();
        }, 2000);
    }
}
