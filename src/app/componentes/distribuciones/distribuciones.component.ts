import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-distribuciones',
  templateUrl: './distribuciones.component.html'
})
export class DistribucionesComponent implements OnInit {

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
                    // fontColor: 'white',
                    // gridLines: { color: 'rgba(255,255,255)' }
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    // fontColor: 'white',
                    // gridLines: { color: 'rgba(255,255,255)' }
                }
            }]
        }
    };
    public barChartLabels = [];
    public barChartType = 'line';
    public barChartLegend = false;
    public barChartData = [
        {data: [], label: 'Distribucion Binomial'}
    ];
    public barChartColors: Color[] = [];

    nombresDist: string[] = ['Binomial', 'Hipergeometrica', 'Poisson'];
    distSeleccionadaNombre = 'Binomial';
    distSeleccionada = 0;

    // Variables para calculos
    // Binomial
    datosBinomial = {
        n: null,
        x: null,
        p: null,
        q: null,
        N: null
    };

    // Hipergeometrica
    datosHiper = {
        N: null,
        n: null,
        T: null,
        x: null
    };

    // Poisson
    datosPoisson = {
        media: null,
        x: null
    };

    tipoAlert = 'success';
    textoAlert = 'Resultado: ';
    sigma = 'σ';
    mu = 'μ';

    resBinomial = {
        px: null,
        mu: null,
        sigma: null,
        fc: null
    };

    resHiper = {
        px: null,
        mu: null,
        sigma: null
    };

    resPoisson = {
        px: null,
        mu: null,
        sigma: null
    };
    constructor() { }

    ngOnInit(): void {
    }

    seleccionarDistribucion(opcion){
        this.distSeleccionada = opcion;
        this.distSeleccionadaNombre = this.nombresDist[opcion];
        // Binomial
        this.datosBinomial = {
            n: null,
            x: null,
            p: null,
            q: null,
            N: null
        };

        // Hipergeometrica
        this.datosHiper = {
            N: null,
            n: null,
            T: null,
            x: null
        };

        // Poisson
        this.datosPoisson = {
            media: null,
            x: null
        };
    }

    calcular(){
        if (this.distSeleccionada === 0) {
            let {n, x, p, q, N} = this.datosBinomial;
            
            if (!q && p) {
                q = 1 - p;
                this.datosBinomial.q = q;
            }

            if (!p && q) {
                p = 1 - q;
                this.datosBinomial.p = p;
            }

            if (!n || !x || !p || !q) {
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: CAMPOS VACIOS';
            }else if (n < 0 || x < 0 || p < 0 || q < 0 || N < 0){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: DATOS NEGATIVOS';
            }else if (N && n >= N){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: LA MUESTRA ES MAYOR, O IGUAL, QUE LA POBLACION';
            }else if (x > n){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: x ES MAYOR QUE LA MUESTRA';
            }else if (p + q !== 1) {
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: LA SUMA p + q DEBE SER IGUAL A 1';
            }else{
                const xGrafica = [];
    
                for (let i = 0; i <= n; i++) {
                    xGrafica.push(i.toString());
                }
    
                this.barChartLabels = xGrafica;
    
                const datosY: any[] = [];
                for (let _x = 0; _x <= n; _x++) {
                    datosY.push(this.binomial(n, _x, p, q));
                }

                this.barChartData.pop();
                this.barChartData.push({data: datosY, label: 'Distribucion Binomial'});

                const res = this.binomial(n, x, p, q);

                const media = n * p;

                let desvEstandar;
                let fc;
                if (!N){
                    desvEstandar = Math.sqrt(n * p * q);
                    // this.textoAlert = `Resultado: P(x)=${res} | ${this.mu}=${media} | ${this.sigma}=${desvEstandar}`;
                    this.textoAlert = `Resultado: `;
                    this.resBinomial = {
                        px: res,
                        mu: Math.round(media * 1000) / 1000,
                        sigma: Math.round(desvEstandar * 1000) / 1000,
                        fc: null
                    };
                }else{
                    fc = Math.sqrt((N - n) / (N - 1));
                    desvEstandar = fc * Math.sqrt(n * p * q);
                    // this.textoAlert = `Resultado: P(x)=${res} | ${this.mu}=${media} | ${this.sigma}=${desvEstandar} | FC=${fc}`;
                    this.textoAlert = `Resultado: `;
                    this.resBinomial = {
                        px: res,
                        mu: Math.round(media * 1000) / 1000,
                        sigma: Math.round(desvEstandar * 1000) / 1000,
                        fc: Math.round(fc * 1000) / 1000
                    };
                }
                
                this.tipoAlert = 'success';
            }


        }else if(this.distSeleccionada === 1){
            const {N, n, T, x} = this.datosHiper;

            if (!N || !n || !T || !x) {
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: CAMPOS VACIOS';
            }else if (N < 0 || n < 0 || T < 0 || x < 0) {
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: DATOS NEGATIVOS';
            }else if (T >= N){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: T ES MAYOR, O IGUAL, QUE LA POBLACION';
            }else if (x > n){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: X ES MAYOR QUE LA MUESTRA';
            }else if (x > T){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: X ES MAYOR QUE T';
            }else if (n > N){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: LA MUESTRA ES MAYOR QUE LA POBLACION';
            }else{
                const xGrafica = [];
    
                for (let i = 0; i <= N; i++) {
                    xGrafica.push(i.toString());
                }
    
                this.barChartLabels = xGrafica;
    
                const datosY: any[] = [];
                for (let _x = 0; _x <= n; _x++) {
                    datosY.push(this.hiper(N, n, T, _x));
                }

                this.barChartData.pop();
                this.barChartData.push({data: datosY, label: 'Distribucion Hipergeometrica'});

                const res = this.hiper(N, n, T, x);

                const media = (n * T) / N;

                const a = (n * T) / N;
                const b = 1 - (T / N);
                const c = (N - n) / (N - 1);
                const desvEstandar = Math.sqrt(a * b) * Math.sqrt(c);

                this.tipoAlert = 'success';
                // this.textoAlert = `Resultado: P(x)=${res} | ${this.mu}=${media} | ${this.sigma}=${desvEstandar}`;
                this.textoAlert = `Resultado: `;

                this.resHiper = {
                    px: res,
                    mu: Math.round(media * 1000) / 1000,
                    sigma: Math.round(desvEstandar * 1000) / 1000
                };
            }

        }else if(this.distSeleccionada === 2){
            const {media, x} = this.datosPoisson;

            if (!media || !x){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: CAMPOS VACIOS';
            }else if (media < 0 || x < 0){
                this.tipoAlert = 'danger';
                this.textoAlert = 'Datos incorrectos: DATOS NEGATIVOS';
            }else{
                const xGrafica = [];

                let n = media * 2 >= x ? media * 2 : x * 1.5;

                for (let i = 0; i <= n; i++) {
                    xGrafica.push(i.toString());
                }
    
                this.barChartLabels = xGrafica;
    
                const datosY: any[] = [];
                for (let _x = 0; _x <= n; _x++) {
                    datosY.push(this.poisson(media, _x));
                }

                this.barChartData.pop();
                this.barChartData.push({data: datosY, label: 'Distribucion Hipergeometrica'});

                const res = this.poisson(media, x);

                const desvEstandar = Math.sqrt(media);

                this.tipoAlert = 'success';
                // this.textoAlert = `Resultado: P(x)=${res} | ${this.mu}=${media} | ${this.sigma}=${desvEstandar}`;
                this.textoAlert = `Resultado: `;

                this.resPoisson = {
                    px: res,
                    mu: Math.round(media * 1000) / 1000,
                    sigma: Math.round(desvEstandar * 1000) / 1000
                };
            }
        }
        this.barChartLegend = true;
        this.barChartColors = [{
            backgroundColor: 'rgba(196, 229, 56, 0.7)',
            borderWidth: 2,
            borderColor: 'rgba(163, 203, 56,1.0)',
            pointBackgroundColor: 'rgba(163, 203, 56, 1.0)',
            pointBorderColor: 'rgba(163, 203, 56, 1.0)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 98, 102,1.0)'
        }];
    }

    factorial(n): number{
        let fac = 1;
        for (let i = 2; i <= n; i++) {
            fac *= i;
        }

        return fac;
    }

    binomial(n, x, p, q){
        let a = this.factorial(n);
        let b = this.factorial(x);
        let c = this.factorial(n - x);

        let prob = (a / (b * c)) * Math.pow(p, x) * Math.pow(q, n - x);

        return prob;
    }

    hiper(N, n, T, x){
        return (this.combinatoria((N - T), (n - x)) * this.combinatoria(T, x)) / this.combinatoria(N, n);
    }

    poisson(media, x){
        return Math.pow(media, x) / (this.factorial(x) * Math.E);
    }

    combinatoria(n, p){
        return this.factorial(n) / (this.factorial(p) * this.factorial(n - p));
    }

    completarQ(){
        if (!this.datosBinomial.q) {
            this.datosBinomial.q = 1 - this.datosBinomial.p;
        }
    }

    completarP(){
        if (!this.datosBinomial.p) {
            this.datosBinomial.p = 1 - this.datosBinomial.q;
        }
    }

}
