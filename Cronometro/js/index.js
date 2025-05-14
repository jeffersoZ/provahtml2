let inicio = 0, acumulado = 0, rodando = false, id = null;

function formatar(ms) {
  let s = Math.floor(ms / 1000);
  let h = String(Math.floor(s / 3600)).padStart(2, '0');
  let m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  s = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function atualizar() {
  document.getElementById('tempo').textContent = formatar(Date.now() - inicio + acumulado);
  if (rodando) id = setTimeout(atualizar, 1000);
}

function iniciar() {
  if (!rodando) {
    inicio = Date.now();
    rodando = true;
    atualizar();
  }
}

function parar() {
  if (rodando) {
    clearTimeout(id);
    acumulado += Date.now() - inicio;
    rodando = false;
  }
}

function zerar() {
  parar();
  acumulado = 0;
  document.getElementById('tempo').textContent = '00:00:00';
}

function registrar() {
  const li = document.createElement('li');
  li.textContent = document.getElementById('tempo').textContent;
  document.getElementById('registros').prepend(li); 
}

function limpar() {
  document.getElementById('registros').innerHTML = '';
}
