export interface Usuario {
    id?: number,
    nombre: string,
    login: string,
    password: string,
    correo: string,
    imagen?: string,
    habilitado?: boolean,
    idPerfil?: number,
    perfilDescripcion?: string,
    usuariosSistema?: []
}