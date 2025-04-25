const visor = document.getElementById('visor-input');

function inserirValor(valor) {
    const valorAtual = visor.value;
    const ultimoCaractere = valorAtual.slice(-1);
    
    // Evitar múltiplos operadores seguidos
    if (['+', '-', '*', '/', '.'].includes(ultimoCaractere)) {
        if (['+', '-', '*', '/', '.'].includes(valor)) {
            return;
        }
    }
    
    // Não permitir começar com operadores (exceto subtração para números negativos)
    if (valorAtual === '' && ['*', '/', '+', '.'].includes(valor)) {
        return;
    }
    
    visor.value += valor;
}

function limparVisor() {
    visor.value = '';
}

function calcularResultado() {
    try {
        const expressao = visor.value;
        
        // Verificar se a expressão está vazia ou termina com operador
        if (!expressao || ['+', '-', '*', '/', '.'].includes(expressao.slice(-1))) {
            return;
        }
        
        // Calcular resultado
        const resultado = eval(expressao);
        visor.value = resultado;
    } catch (error) {
        // Em caso de erro (como sintaxe inválida)
        visor.value = 'Erro';
        setTimeout(() => {
            limparVisor();
        }, 1000);
    }
}