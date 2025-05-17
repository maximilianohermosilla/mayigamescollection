import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, input, OnInit, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext"
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { FileUploadComponent } from "../file-upload/file-upload.component";

@Component({
  selector: 'app-form-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, InputTextModule, ToastModule,
    MessagesModule, ButtonModule, ConfirmDialogModule, DropdownModule, InputNumberModule, FileUploadComponent],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})
export class FormUsuarioComponent implements OnInit {
  public element = input<Usuario>();

  public formulario: FormGroup;
  public defaultImage: string = "/assets/avatar.png";
  public imagenUrl = signal<string | undefined>(undefined);
  public outputElement = output<Usuario>();
  public deleteElement = output<Usuario>();

  public msgs: Message[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService) {
    this.formulario = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      imagen: [''],
      login: [''],
      password: [''],
      correo: [''],
      idPerfil: [0],
      habilitado: [true],
    });

    effect(() => {
      if (this.element() != undefined) {
        let element = this.element();
        this.imagenUrl.set(element!.imagen! ?? "");
        this.formulario.patchValue({
          ...element
        });
      } else {
        let element: Usuario = {
          id: 0,
          nombre: '',
          imagen: '',
          login: '',
          password: '',
          correo: '',
          idPerfil: 1,
          habilitado: true,
        };
        this.imagenUrl.set("");
        this.formulario.patchValue({
          ...element
        });
      }
    });
  }

  ngOnInit(): void {
    
  }

  public onImagenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
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

  public onImageError() {
    this.imagenUrl.set(this.defaultImage);
    this.cdr.detectChanges();
  }

  public onSubmit(): void {
    if (this.formulario.valid) {
      this.sendElement(this.formulario.value);
    }
  }

  public sendElement(element: Usuario) {
    this.outputElement.emit(element);
    let accion = element && element.id && element!.id! > 0? " actualizado": " creado";
    this.msgs = [];
    // this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: element!.nombre + accion + ' con éxito' });    
    this.cdr.detectChanges();
  }

  public onDelete() {
    event?.preventDefault();
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar ' + this.element()!.nombre + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-outlined',

      accept: () => {
        this.deleteElement.emit(this.element()!);
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Confirmación', detail: this.element()!.nombre + ' eliminado con éxito' });

      },
      reject: () => {

      },
    });
  }
  
  public onFileUploaded(event: any){
    this.imagenUrl.set(event ?? "");
    this.formulario.patchValue({
      ...this.formulario.value, imagen: event
    });
  }
}
