import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    datos: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15];
    colores: string[] = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];

    bordes: string[] = [
        'rgba(255, 99, 132, 0.9)',
        'rgba(54, 162, 235, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(75, 192, 192, 0.9)',
        'rgba(153, 102, 255, 0.9)',
        'rgba(255, 159, 64, 0.9)'
    ];

    banderaTipoGrafica = false;

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            // labels: { fontColor: 'white' }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // fontColor: 'white'
                    fontSize: 10
                },
                // gridLines: { color: 'rgba(255,255,255)' }
                }
            ],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    // fontColor: 'white',
                    fontSize: 10
                },
                // gridLines: { color: 'rgba(255,255,255)' }
            }
            ]
        }
    };
    // public barChartLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    public barChartLabels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    public barChartType = 'bar';
    public barChartLegend = false;
    public barChartData = [
        {data: this.datos, label: 'Distribucion Binomial'}
    ];
    public barChartColors: Color[] = [
        {
            backgroundColor: this.colores[this.getRandomInt(0, 6)],
            borderWidth: 1,
            borderColor: this.bordes[this.getRandomInt(0, 6)],
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
    ];

    

    constructor() { }

    ngOnInit(): void {
        this.datosAleatorios();
    }

    datosAleatorios = () => {
        setTimeout(() => {
            this.generarDatosAleatorios();
            this.datosAleatorios();
            this.barChartType = this.banderaTipoGrafica ? 'bar' : 'line';
            this.banderaTipoGrafica = !this.banderaTipoGrafica;
        }, 5000);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

    generarDatosAleatorios(){
        this.datos = [];
        for (let i = 0; i < 15; i++) {
            this.datos.push(this.getRandomInt(0, 16));
        }

        this.barChartData.pop();
        this.barChartData.push({data: this.datos, label: 'Grafico'});

        

        this.barChartColors = [
            { // dark grey
                backgroundColor: this.colores[this.getRandomInt(0, 6)],
                borderWidth: 1,
                borderColor: this.bordes[this.getRandomInt(0, 6)],
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
        ];
    }

}
