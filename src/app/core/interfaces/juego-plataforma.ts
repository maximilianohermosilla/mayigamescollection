import { Plataforma } from "./plataforma";

export interface JuegoPlataforma {
    id?: number;
    idJuego?: number;
    idPlataforma: number;
    idUsuario: number;
    fecha?: string;
    url?: string;
    plataforma?: Plataforma;
}