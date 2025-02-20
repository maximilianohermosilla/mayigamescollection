import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { LoginService } from 'src/app/core/services/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    standalone: false
})
export class LoginComponent {
    public router = inject(Router);

    valCheck: string[] = ['remember'];

    public user!: string;
    public password!: string;

    constructor(public layoutService: LayoutService, public loginService: LoginService) {
        this.loginService.LogOut();
    }
    
    public authenticate() {
        let usuario: Usuario = {
            Login: this.user,
            Password: this.password,
            IdSistema: 9
        }

        this.loginService.Authenticate(usuario).subscribe(rta => {            
            if(rta != undefined){
                this.router.navigate(['/pages/inicio']);
            }
        });
    }
}
