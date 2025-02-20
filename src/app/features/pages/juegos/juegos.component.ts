import { Component, inject, OnInit } from '@angular/core';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';

@Component({
    templateUrl: './juegos.component.html',
    standalone: false
})
export class JuegosComponent implements OnInit{
    public juegosService = inject(JuegosService);
    public spinnerService = inject(SpinnerService);

    public listaJuegos: any[] = [];
    public defaultImage: string = "/assets/placeholder.jpg";

    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    sourceCities: any[] = [];
    targetCities: any[] = [];
    orderCities: any[] = [];

    public cargarSpinner(){
        this.spinnerService.showSpinner();

        setTimeout(() => {
            this.spinnerService.hideSpinner();
        }, 2000);
    }
    
    ngOnInit(): void {
        this.juegosService.GetAllByUsuario(1).subscribe((response) => {
            this.listaJuegos = response;
            console.log(response);
        })
    }
    
    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        console.log(dv)
        console.log(event)
        dv.filter((event.target as HTMLInputElement).value);
    }
}
