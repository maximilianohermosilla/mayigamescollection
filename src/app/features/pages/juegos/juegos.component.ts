import { Component, inject, OnInit } from '@angular/core';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
    templateUrl: './juegos.component.html',
    standalone: false
})
export class JuegosComponent implements OnInit{
    public juegosService = inject(JuegosService);
    public spinnerService = inject(SpinnerService);

    public listaJuegos: any[] = [];

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
}
