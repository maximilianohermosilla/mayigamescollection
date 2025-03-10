import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './inicio.component.html',
    standalone: false
})
export class InicioComponent implements OnInit {

    ngOnInit(): void {
        const token = localStorage.getItem('AuthToken') ?? "";
        //console.log(token)
    }
}


