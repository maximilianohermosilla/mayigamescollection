import { Component, inject, OnInit } from '@angular/core';
import { Juego } from 'src/app/core/interfaces/juego';
import { Plataforma } from 'src/app/core/interfaces/plataforma';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { PlataformasService } from 'src/app/core/services/plataformas.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
    templateUrl: './inicio.component.html',
    standalone: false
})
export class InicioComponent implements OnInit {
    private juegosService = inject(JuegosService);
    private plataformasService = inject(PlataformasService);
    private tokenService = inject(TokenService);

    public userName: string = '';
    public totalJuegos: number = 0;
    public totalPlataformas: number = 0;
    public plataformasConJuegos: number = 0;
    public juegosRecientes: Juego[] = [];
    public defaultImage: string = '/assets/placeholder.jpg';

    public barData: any;
    public barOptions: any;
    public pieData: any;
    public pieOptions: any;

    ngOnInit(): void {
        this.userName = this.tokenService.getUserName() || 'Usuario';
        this.cargarDatos();
    }

    private cargarDatos(): void {
        this.juegosService.GetAllByUsuario().subscribe(juegos => {
            this.totalJuegos = juegos.length;
            const sorted = [...juegos].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
            this.juegosRecientes = sorted.slice(0, 6);
            this.plataformasService.GetAll().subscribe(plataformas => {
                this.totalPlataformas = plataformas.length;
                this.initCharts(juegos, plataformas);
            });
        });
    }

    private groupByPlatform(juegos: Juego[]): any[] {
        const group = new Map<string, any>();
        juegos.forEach(juego => {
            juego.juegoPlataformas?.forEach(jp => {
                const nombre = jp.plataforma?.nombre ?? 'Sin plataforma';
                if (group.has(nombre)) {
                    group.get(nombre)!.cantidad += 1;
                } else {
                    group.set(nombre, { nombre, cantidad: 1 });
                }
            });
        });
        this.plataformasConJuegos = group.size;
        return Array.from(group.values());
    }

    private initCharts(juegos: Juego[], plataformas: Plataforma[]): void {
        const agrupados = this.groupByPlatform(juegos);
        const docStyle = getComputedStyle(document.documentElement);
        const textColor = docStyle.getPropertyValue('--text-color');
        const textColorSecondary = docStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = docStyle.getPropertyValue('--surface-border');

        const colores = [
            docStyle.getPropertyValue('--gray-800'),
            docStyle.getPropertyValue('--red-500'),
            docStyle.getPropertyValue('--blue-800'),
            docStyle.getPropertyValue('--yellow-500'),
            docStyle.getPropertyValue('--blue-300'),
            docStyle.getPropertyValue('--purple-500'),
            docStyle.getPropertyValue('--pink-500'),
            docStyle.getPropertyValue('--orange-500'),
            docStyle.getPropertyValue('--green-500')
        ];

        const labels = agrupados.map(g => g.nombre);
        const data = agrupados.map(g => g.cantidad);

        this.barData = {
            labels,
            datasets: [{
                label: 'Juegos',
                backgroundColor: colores,
                hoverBackgroundColor: colores.map(c => c.replace('-500', '-400')),
                borderColor: docStyle.getPropertyValue('--gray-100'),
                data
            }]
        };

        this.barOptions = {
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                x: {
                    ticks: { color: textColorSecondary, font: { weight: 500 } },
                    grid: { display: false, drawBorder: false }
                },
                y: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder, drawBorder: false }
                }
            }
        };

        this.pieData = {
            labels,
            datasets: [{
                data,
                backgroundColor: colores,
                hoverBackgroundColor: colores.map(c => c.replace('-500', '-400'))
            }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: { usePointStyle: true, color: textColor }
                }
            }
        };
    }
}
