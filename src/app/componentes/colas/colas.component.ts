import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colas',
  templateUrl: './colas.component.html'
})
export class ColasComponent implements OnInit {

    public textoAlert: string = "SIN DATOS";
    public tipoAlert: string = "light";

    mu = 'μ';
    lambda = 'λ';

    seMostroPrametros = false;

    calculos: Calculo[] = [];

    datos: DatosCola = {
        lambda: null,
        mu: null,
        n: null,
    };

    datosMostrar: DatosCola = {
        lambda: null,
        mu: null,
        n: null,
    };
    constructor() { }

    ngOnInit(): void {

    }

    calcular(){
        this.seMostroPrametros = false;
        if (!this.datos.lambda || !this.datos.mu) {
            this.tipoAlert = 'danger';
            this.textoAlert = 'HAY CAMPOS VACIOS';
        }else if(this.datos.lambda < 0 || this.datos.mu < 0 || this.datos.n < 0){
            this.tipoAlert = 'danger';
            this.textoAlert = 'HAY DATOS NEGATIVOS';
        }else{

            const LAMBDAM1 = 1 / this.datos.lambda;
            const MUM1 = 1 / this.datos.mu;
            const LS = this.datos.lambda / (this.datos.mu - this.datos.lambda);
            const WS = 1 / (this.datos.mu - this.datos.lambda);
            const LQ = (this.datos.lambda * this.datos.lambda) / (this.datos.mu * (this.datos.mu - this.datos.lambda));
            const WQ = this.datos.lambda / (this.datos.mu * (this.datos.mu - this.datos.lambda));
            const RO = this.datos.lambda / this.datos.mu;
            const PO = 1 - RO;
            
            let PN: number = null;
            if (this.datos.n){
                PN = (1 - (this.datos.lambda / this.datos.mu)) * Math.pow((this.datos.lambda / this.datos.mu), this.datos.n);
            }

            this.calculos.push({
                datos: Object.assign({}, this.datos),
                lambdam1: Math.round(LAMBDAM1 * 100) / 100,
                mum1: Math.round(MUM1 * 100) / 100,
                Ls: Math.round(LS * 100) / 100,
                Ws: Math.round(WS * 100) / 100,
                Lq: Math.round(LQ * 100) / 100,
                Wq: Math.round(WQ * 100) / 100,
                ro: Math.round(RO * 100) / 100,
                Po: Math.round(PO * 100) / 100,
                Pn: Math.round(PN * 100) / 100
            });

            this.datos.n = this.datos.n == null ? 0 : this.datos.n;
            this.tipoAlert = 'success';
            this.textoAlert = 'DATOS CORRECTOS';
            this.datos = {
                lambda: null,
                mu: null,
                n: null
            };
            if (this.calculos.length === 1) {
                this.seMostroPrametros = true;
                this.datosMostrar = Object.assign({}, this.calculos[0].datos);
            }else{
                this.seMostroPrametros = false;
            }
        }
    }

    mostrarParametros(i){
        this.seMostroPrametros = true;
        this.datosMostrar = Object.assign({}, this.calculos[i].datos);
    }

    borrarRegistro(i){
        this.seMostroPrametros = false;
        this.calculos.splice(i, 1);
        this.datosMostrar = {
            lambda: null,
            mu: null,
            n: null
        };
    }
}

interface DatosCola{
    lambda: number;
    mu: number;
    n: number;
}

interface Calculo{
    datos: any;
    lambdam1: number;
    mum1: number;
    Ls: number;
    Ws: number;
    Lq: number;
    Wq: number;
    ro: number;
    Po: number;
    Pn: number;
}
