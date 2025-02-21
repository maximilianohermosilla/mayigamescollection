import { JuegoPlataforma } from "./juego-plataforma";

export interface Juego {
    id?: number;
    appId?: string;
    nombre: string;
    descripcion?: string;
    imagen?: string;
    juegoPlataformas?: JuegoPlataforma[];

    label?: string;
    value?: number;
}