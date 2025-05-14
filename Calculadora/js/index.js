const visor = document.getElementById('visor-input');

function inserirValor(valor) {
    visor.value += valor;
}

function limparVisor() {
    visor.value = '';
}

function calcularResultado() {
    visor.value = eval(visor.value);
}