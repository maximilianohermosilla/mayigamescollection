import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Juego } from 'src/app/core/interfaces/juego';
import { JuegosService } from 'src/app/core/services/juegos.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './reportes.component.html',
    standalone: false
})
export class ReportesComponent implements OnInit, OnDestroy {
    public juegosService = inject(JuegosService);

    public listaJuegos: Juego[] = [];
    public barData: any;
    public pieData: any;
    public barOptions: any;
    public pieOptions: any;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initCharts();
        });
    }

    ngOnInit() {
        this.getAllJuegos();
    }

    public getAllJuegos() {
        this.juegosService.GetAllByUsuario().subscribe((response) => {
            this.listaJuegos = response;
            console.log(response);
            this.initCharts();
        })
    }

    public groupByPlatform = (juegos: Juego[]): any[] => {
        const groupJuegos = new Map<string, any>();

        juegos.forEach(juego => {
            juego.juegoPlataformas?.forEach(juegoPlataforma => {
                const { id, nombre } = juegoPlataforma.plataforma!;
                const key = `${nombre}`;

                if (groupJuegos.has(key)) {
                    groupJuegos.get(key)!.cantidad += 1;
                } else {
                    groupJuegos.set(key, { id, nombre, cantidad: 1 });
                }

            });
        });

        console.log(groupJuegos.values())
        return Array.from(groupJuegos.values());
    };

    public initCharts() {
        const juegosAgrupados = this.groupByPlatform(this.listaJuegos);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const juegosMapeados: any[] = juegosAgrupados.map(obj => ({
            nombre: obj.nombre,
            cantidad: obj.cantidad
        }));

        this.barData = {
            labels: juegosMapeados.map(juego => { return juego.nombre }),
            datasets: [
                {
                    label: 'Juegos',                    
                    backgroundColor: [
                        documentStyle.getPropertyValue('--gray-800'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--blue-800'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--blue-300'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--gray-900'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--blue-900'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ],
                    borderColor: documentStyle.getPropertyValue('--gray-100'),
                    data: juegosMapeados.map(juego => { return juego.cantidad })
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.pieData = {
            labels: juegosMapeados.map(juego => { return juego.nombre }),
            datasets: [
                {
                    data: juegosMapeados.map(juego => { return juego.cantidad }),
                    backgroundColor: [
                        documentStyle.getPropertyValue('--gray-800'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--blue-800'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--blue-300'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--gray-900'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--blue-900'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
