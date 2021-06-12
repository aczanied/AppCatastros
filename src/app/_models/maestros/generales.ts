export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}
export class Contador {
    '_id': string = '';
    cantidad: number = 0;
    sincronizado: boolean = false;
    fechaSincronizado: Date = new Date;
}

export class Tablas {
    contadorRural: string = 'contadorRural';

}