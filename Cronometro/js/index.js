class Cronometro {
    constructor() {
        this.segundos = 0;
        this.minutos = 0;
        this.horas = 0;
        this.intervalo = null;
        this.rodando = false;

        // Elementos do display
        this.horasElement = document.getElementById('horas');
        this.minutosElement = document.getElementById('minutos');
        this.segundosElement = document.getElementById('segundos');
        
        // Elementos de registro
        this.listaRegistro = document.getElementById('lista-registro');
        
        // Botões
        this.btnIniciar = document.getElementById('btn-iniciar');
        this.btnZerar = document.getElementById('btn-zerar');
        this.btnRegistrar = document.getElementById('btn-registrar');
        this.btnLimpar = document.getElementById('btn-limpar');

        this.configurarEventos();
        this.atualizarDisplay();
    }

    configurarEventos() {
        this.btnIniciar.addEventListener('click', () => this.iniciarOuParar());
        this.btnZerar.addEventListener('click', () => this.zerar());
        this.btnRegistrar.addEventListener('click', () => this.registrarTempo());
        this.btnLimpar.addEventListener('click', () => this.limparRegistros());
    }

    iniciar() {
        if (!this.rodando) {
            this.intervalo = setInterval(() => {
                this.segundos++;
                if (this.segundos === 60) {
                    this.segundos = 0;
                    this.minutos++;
                }
                if (this.minutos === 60) {
                    this.minutos = 0;
                    this.horas++;
                }
                this.atualizarDisplay();
            }, 1000);
            this.rodando = true;
            this.btnIniciar.textContent = 'Parar';
        }
    }

    parar() {
        if (this.rodando) {
            clearInterval(this.intervalo);
            this.rodando = false;
            this.btnIniciar.textContent = 'Iniciar';
        }
    }

    iniciarOuParar() {
        if (this.rodando) {
            this.parar();
        } else {
            this.iniciar();
        }
    }

    zerar() {
        this.parar();
        this.segundos = 0;
        this.minutos = 0;
        this.horas = 0;
        this.atualizarDisplay();
    }

    registrarTempo() {
        // Verifica se o cronômetro está rodando
        if (!this.rodando && this.segundos === 0 && this.minutos === 0 && this.horas === 0) {
            return; // Não registra se estiver zerado e parado
        }
        
        const tempoFormatado = `${this.formatarTempo(this.horas)}:${this.formatarTempo(this.minutos)}:${this.formatarTempo(this.segundos)}`;
        const itemRegistro = document.createElement('li');
        itemRegistro.textContent = tempoFormatado;
        this.listaRegistro.prepend(itemRegistro);
    }

    limparRegistros() {
        this.listaRegistro.innerHTML = '';
    }

    formatarTempo(tempo) {
        return tempo < 10 ? `0${tempo}` : tempo;
    }

    atualizarDisplay() {
        this.horasElement.textContent = this.formatarTempo(this.horas);
        this.minutosElement.textContent = this.formatarTempo(this.minutos);
        this.segundosElement.textContent = this.formatarTempo(this.segundos);
    }
}

// Iniciar o cronômetro quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new Cronometro();
});