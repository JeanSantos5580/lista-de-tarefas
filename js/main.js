const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

inputTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

function limpaInput () {
    inputTarefa.value = '';
    inputTarefa.focus();
}


function criaListItem () {
    const listItem = document.createElement('li');
    return listItem;
}

function criaTarefa (textoInput) {
    const listItem = criaListItem();
    listItem.innerHTML = textoInput;
    tarefas.appendChild(listItem); 
    limpaInput();
    criaBotaoApagar(listItem);
    salvarTarefas();
}

btnTarefa.addEventListener('click', () => {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

function criaBotaoApagar (li) {
    li.innerHTML += '  ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

document.addEventListener('click', (e) => {
    const el = e.target;
        if (el.classList.contains('apagar')){
            el.parentElement.remove();
            salvarTarefas();
        }
})

function salvarTarefas () {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas () {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();