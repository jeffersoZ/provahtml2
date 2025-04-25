class Anotacao {
    constructor(id, titulo, conteudo) {
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo || '';
    }
}

class GerenciadorAnotacoes {
    constructor() {
        this.anotacoes = [];
        this.contadorId = 1;
        this.anotacaoAtual = null;

        this.inicializarElementos();
        this.carregarLocalStorage();
        this.configurarEventos();
    }

    inicializarElementos() {
        this.telaPrincipal = document.getElementById('tela-principal');
        this.telaEdicao = document.getElementById('tela-edicao');
        this.listaAnotacoes = document.getElementById('lista-anotacoes');
        this.formAdicionar = document.getElementById('form-adicionar');
        this.inputNome = document.getElementById('input-nome');
        this.inputTitulo = document.getElementById('input-titulo');
        this.textoAnotacao = document.getElementById('texto-anotacao');
        this.btnVoltar = document.getElementById('btn-voltar');
        this.btnSalvarTitulo = document.getElementById('btn-salvar-titulo');
        this.btnConfirmarExclusao = document.getElementById('btn-confirmar-exclusao');
    }

    configurarEventos() {
        this.formAdicionar.addEventListener('submit', (e) => {
            e.preventDefault();
            this.criarAnotacao();
        });

        this.btnVoltar.addEventListener('click', () => {
            this.salvarVoltar();
        });

        this.btnSalvarTitulo.addEventListener('click', () => {
            this.salvarTitulo();
        });

        this.inputTitulo.addEventListener('focus', () => {
            this.btnSalvarTitulo.style.display = 'block';
        });

        this.inputTitulo.addEventListener('blur', () => {
            setTimeout(() => {
                this.btnSalvarTitulo.style.display = 'none';
            }, 200);
        });
    }

    carregarLocalStorage() {
        const dados = localStorage.getItem('anotacoes');
        if (dados) {
            this.anotacoes = JSON.parse(dados);
            const ultimoId = this.anotacoes.reduce((max, anotacao) => 
                Math.max(max, anotacao.id), 0);
            this.contadorId = ultimoId + 1;
            this.renderizarLista();
        }
    }

    salvarLocalStorage() {
        localStorage.setItem('anotacoes', JSON.stringify(this.anotacoes));
    }

    criarAnotacao() {
        const titulo = this.inputNome.value.trim();
        if (!titulo) return;

        const novaAnotacao = new Anotacao(this.contadorId++, titulo);
        this.anotacoes.push(novaAnotacao);
        this.inputNome.value = '';
        this.salvarLocalStorage();
        this.renderizarLista();
        this.abrirEdicao(novaAnotacao);
        
        // Fechar modal
        bootstrap.Modal.getInstance(document.getElementById('modal-adicionar')).hide();
    }

    abrirEdicao(anotacao) {
        this.anotacaoAtual = anotacao;
        this.inputTitulo.value = anotacao.titulo;
        this.textoAnotacao.value = anotacao.conteudo;
        this.telaPrincipal.style.display = 'none';
        this.telaEdicao.style.display = 'block';
    }

    salvarVoltar() {
        if (this.anotacaoAtual) {
            this.anotacaoAtual.conteudo = this.textoAnotacao.value;
            this.salvarLocalStorage();
            this.telaEdicao.style.display = 'none';
            this.telaPrincipal.style.display = 'block';
            this.renderizarLista();
        }
    }

    salvarTitulo() {
        if (this.anotacaoAtual) {
            this.anotacaoAtual.titulo = this.inputTitulo.value.trim();
            this.salvarLocalStorage();
            this.renderizarLista();
            this.btnSalvarTitulo.style.display = 'none';
        }
    }

    confirmarExclusao(id) {
        this.anotacaoAtual = this.anotacoes.find(a => a.id === id);
        const modal = new bootstrap.Modal(document.getElementById('modal-confirmacao'));
        
        // Limpar evento anterior para evitar múltiplas execuções
        this.btnConfirmarExclusao.onclick = null;
        
        // Configurar novo evento
        this.btnConfirmarExclusao.onclick = () => {
            this.excluirAnotacao(id);
            modal.hide();
        };
        
        modal.show();
    }

    excluirAnotacao(id) {
        this.anotacoes = this.anotacoes.filter(a => a.id !== id);
        this.salvarLocalStorage();
        this.renderizarLista();
        
        if (this.anotacaoAtual && this.anotacaoAtual.id === id) {
            this.telaEdicao.style.display = 'none';
            this.telaPrincipal.style.display = 'block';
        }
        
        if (this.anotacoes.length === 0) {
            this.listaAnotacoes.innerHTML = `
                <div class="text-center py-5">
                    <p class="text-muted">Nenhuma anotação encontrada</p>
                    <p class="text-muted">Clique no botão + para criar uma nova</p>
                </div>
            `;
        }
    }

    renderizarLista() {
        if (this.anotacoes.length === 0) {
            this.listaAnotacoes.innerHTML = `
                <div class="text-center py-5">
                    <p class="text-muted">Nenhuma anotação encontrada</p>
                    <p class="text-muted">Clique no botão + para criar uma nova</p>
                </div>
            `;
            return;
        }

        this.listaAnotacoes.innerHTML = this.anotacoes.map(anotacao => `
            <li>
                <span>${anotacao.titulo}</span>
                <div class="d-flex gap-2">
                    <button onclick="gerenciador.abrirEdicao(${anotacao.id})" class="btn btn-sm btn-primary">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button onclick="gerenciador.confirmarExclusao(${anotacao.id})" class="btn btn-sm btn-danger">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }
}

// Inicializar o gerenciador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.gerenciador = new GerenciadorAnotacoes();
});