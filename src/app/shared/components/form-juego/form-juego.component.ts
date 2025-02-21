import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Juego } from 'src/app/core/interfaces/juego';
import { Plataforma } from 'src/app/core/interfaces/plataforma';
import { PlataformasService } from 'src/app/core/services/plataformas.service';
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext"
import { JuegoPlataforma } from 'src/app/core/interfaces/juego-plataforma';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-form-juego',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, ToastModule, MessagesModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './form-juego.component.html',
  styleUrl: './form-juego.component.scss'
})
export class FormJuegoComponent implements OnInit{
  public juego = input<Juego | undefined>(undefined);
  public formulario: FormGroup;
  public defaultImage: string = "/assets/placeholder.jpg";
  public imagenUrl = signal<string | undefined>(undefined);
  public userId: string = "";
  
  public listaPlataformas: Plataforma[] = [];
  public listaPlataformasPrevias: JuegoPlataforma[] | undefined = [];

  public msgs: Message[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private service: MessageService, private confirmationService: ConfirmationService,
    private plataformasService: PlataformasService, private juegoService: JuegosService, private tokenService: TokenService) {
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      descripcion: [''],
      imagen: [''],
      appId: [''],
      url: [''],
      juegoPlataformas: [[]]
    });

    effect(() => {
      if (this.juego() != undefined) {
        let juego = this.juego();
        this.imagenUrl.set(juego!.imagen! ?? "");
        this.listaPlataformasPrevias = juego!.juegoPlataformas;
        this.formulario.patchValue({
          ...juego,
          juegoPlataformas: juego!.juegoPlataformas!.map((jp: any) => jp.idPlataforma),
        });
      } else {
        let juego: Juego = {
          nombre: '',
          descripcion: '',
          imagen: '',
          appId: '',
          juegoPlataformas: []
        };
        this.imagenUrl.set("");
        this.formulario.patchValue({
          ...juego
        });
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.getAllPlataformas();
  }


  public getAllPlataformas() {
    this.plataformasService.GetAll().subscribe((response) => {
      this.listaPlataformas = response.map((p: any) => { return { ...p, label: p.nombre, value: p.id } });
    })
  }

  public onImagenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input)
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenUrl.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  
  public onImagenUrlChange(): void {
    this.imagenUrl.set(this.formulario.value.imagen);
    this.cdr.detectChanges();
  }

  public onImageError(){
    this.imagenUrl.set(this.defaultImage);
    this.cdr.detectChanges();
  }

  public onSubmit(): void {
    if (this.formulario.valid) {

      console.log('Formulario enviado:', this.formulario.value);
      this.filterPlataformas();

      if(this.formulario.value.id > 0){
        console.log("Update Juego");
        this.juegoService.Update(this.formulario.value).subscribe((response: any) => {
          console.log(response);
          //this.service.add({ key: 'tst', severity: 'success', summary: 'Confirmación', detail: 'Juego creado con éxito' });
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Juego actualizado con éxito' });
          setTimeout(() => { window.location.reload() }, 1000);
        });
      }else{
        console.log("Create Juego");
        this.juegoService.Create(this.formulario.value).subscribe((response: any) => {
          console.log(response);
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Juego creado con éxito' });
          setTimeout(() => { window.location.reload() }, 1000);
        });
      }
    }
  }

  public filterPlataformas(){
    let listaPlataformasNueva: any[] = [];
    this.formulario.value.juegoPlataformas.forEach((element: any) => {
      console.log(element)
      listaPlataformasNueva.push(element);
    });
    let listaPlataformasEliminar = this.listaPlataformasPrevias?.filter((item: any) => !listaPlataformasNueva.includes(item.idPlataforma));
    let listaPlataformasAgregar = listaPlataformasNueva?.filter((id: any) => !this.listaPlataformasPrevias!.some((item) => item.idPlataforma === id));

    this.formulario.value.juegoPlataformas = listaPlataformasAgregar.map((p: any) => { 
      return { id: 0, idJuego: this.formulario.value.id, idPlataforma: p, url: this.formulario.value.url, idUsuario: this.userId, fecha: new Date().toISOString(), 
      //  plataforma: this.listaPlataformas.find((plataforma: any) => plataforma.id == p) 
      }
    });

    console.log(listaPlataformasEliminar);
    console.log(listaPlataformasAgregar);
  }

  public onDelete(){
    event?.preventDefault();
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este juego?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-outlined',

      accept: () => {
          this.juegoService.Delete(this.juego()!).subscribe((response) => {
            console.log(response);
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: 'Juego eliminado con éxito' });
            setTimeout(() => { window.location.reload() }, 1000);
          })
      },
      reject: () => {

      },
  });
  }
}
