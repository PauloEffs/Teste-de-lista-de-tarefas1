let listaDeTarefas = [];

function adicionarTarefa(evento) {
    evento.preventDefault();
    
    const nomeTarefa = document.getElementById('taskName').value;
    const responsavel = document.getElementById('responsible').value;
    const status = document.getElementById('status').value;
    
    const novaTarefa = {
        id: Date.now(),
        nome: nomeTarefa,
        responsavel: responsavel,
        status: status
    };
    
    listaDeTarefas.push(novaTarefa);
    
    salvarTarefas();
    mostrarTarefas();
    
    document.getElementById('taskForm').reset();
}

function removerTarefa(idTarefa) {
    listaDeTarefas = listaDeTarefas.filter(tarefa => tarefa.id !== idTarefa);
    
    salvarTarefas();
    mostrarTarefas();
}

function editarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    
    const novoStatus = prompt(
        'Digite o novo status:\n- pendente\n- em-andamento\n- concluida',
        tarefa.status
    );
    
    if (novoStatus && ['pendente', 'em-andamento', 'concluida'].includes(novoStatus)) {
        tarefa.status = novoStatus;
        salvarTarefas();
        mostrarTarefas();
    } else {
        alert('Status inválido!');
    }
}

function mostrarTarefas() {
    const lista = document.getElementById('taskList');
    lista.innerHTML = '';
    
    listaDeTarefas.forEach(tarefa => {
        const elementoTarefa = document.createElement('div');
        elementoTarefa.className = 'task-item';
        
        elementoTarefa.innerHTML = `
            <div class="task-info">
                <h3>${tarefa.nome}</h3>
                <p>Responsável: ${tarefa.responsavel}</p>
                <p>Status: <span class="status-${tarefa.status}">${tarefa.status}</span></p>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button class="delete-btn" onclick="removerTarefa(${tarefa.id})">Remover</button>
            </div>
        `;
        
        lista.appendChild(elementoTarefa);
    });
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        listaDeTarefas = JSON.parse(tarefasSalvas);
        mostrarTarefas();
    }
}

document.getElementById('taskForm').addEventListener('submit', adicionarTarefa);

carregarTarefas();