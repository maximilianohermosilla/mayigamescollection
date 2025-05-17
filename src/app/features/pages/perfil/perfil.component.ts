import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { LoginService } from 'src/app/core/services/login.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
    templateUrl: './perfil.component.html',
    standalone: false
})
export class PerfilComponent implements OnInit {
    public userId: string = "";
    public oldPassword: string = "";
    public usuario: Usuario = { id: 0, nombre: '', login: '', password: '', correo: '' };
    public display: boolean = false;
    public defaultImage: string = "/assets/avatar.png";

    public tokenService = inject(TokenService);
    public usuarioService = inject(UsuarioService);
    public loginService = inject(LoginService);
    public cdr = inject(ChangeDetectorRef);
    

    constructor() { }

    ngOnInit(): void {
        this.userId = this.tokenService.getUserId();
        this.getUserById();
    }

    public getUserById() {
        this.usuarioService.GetById(this.userId).subscribe(response => {
            this.usuario = response;
            this.oldPassword = response.password;
        })
    }

    public editarUsuario() {
        this.display = true;
        this.cdr.detectChanges();
    }

    public onImageError() {
        this.usuario.imagen = this.defaultImage;
        this.cdr.detectChanges();
    }

    public handleElement(event: any) {

        if (event && event!.id! > 0) {
            this.usuarioService.Update(event).subscribe((response) => {
                if(this.oldPassword !== event.password){
                    this.loginService.Update( { Login: event.login, Password: this.oldPassword, PasswordNew: event.password, IdSistema: 1 } ).
                    subscribe(response => {
                        
                    });
                }

                this.display = false;
                this.getUserById();
            });
        }
        else {
            this.usuarioService.Create(event).subscribe((response) => {
                this.display = false;
                this.getUserById();
            });
        }
    }
}