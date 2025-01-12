// Seleciona os elementos da página
const taskInput = document.getElementById("task-input");
// Seleciona o campo de entrada onde o usuário digita a tarefa

const addTaskBtn = document.getElementById("add-task-btn");
// Seleciona o botão de adicionar tarefa

const taskList = document.getElementById("task-list");
// Seleciona a lista onde as tarefas serão exibidas

// Carrega tarefas salvas no LocalStorage ao inicializar
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
/* 
  - Pega as tarefas salvas no LocalStorage e as converte de volta para um array usando JSON.parse.
  - Se não houver tarefas salvas, inicia com um array vazio ([]).
*/

// Função para renderizar a lista de tarefas
function renderTasks() {
  taskList.innerHTML = "";
  // Limpa o conteúdo atual da lista para evitar duplicações

  tasks.forEach((task, index) => {
    // Itera sobre o array de tarefas (tasks) e cria um elemento para cada uma

    const li = document.createElement("li");
    li.className = "task-item";
    // Cria um elemento de lista (<li>) e adiciona a classe "task-item" para estilização

    if (task.completed) {
      li.classList.add("completed");
      // Adiciona a classe "completed" ao item se ele estiver concluído
    }

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    // Cria um elemento de texto (<span>) para exibir o conteúdo da tarefa

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    // Cria um campo de seleção (checkbox) e define se está marcado conforme o estado da tarefa

    checkBox.onclick = () => toggleComplete(index);
    // Adiciona um evento ao clicar no checkbox, que alterna o estado concluído

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    // Cria um botão com o símbolo de lixeira (🗑️) para excluir a tarefa

    deleteBtn.onclick = () => {
      deleteTask(index);
    };
    // Define uma função para o evento de clique do botão, chamando deleteTask com o índice da tarefa

    li.appendChild(checkBox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    // Adiciona o checkbox, o texto da tarefa e o botão "Excluir" ao elemento <li>

    taskList.appendChild(li);
    // Adiciona o elemento <li> à lista de tarefas exibida na página
  });
}

// Função para adicionar uma tarefa
function addTask() {
  const newTaskText = taskInput.value.trim();
  // Obtém o valor do campo de entrada e remove espaços extras antes/depois do texto

  if (newTaskText) {
    const newTask = { text: newTaskText, completed: false };
    // Cria um objeto representando a tarefa com o texto e o estado "não concluído"

    tasks.push(newTask);
    // Adiciona a nova tarefa ao array de tarefas

    saveTasks();
    // Salva o array atualizado no LocalStorage

    renderTasks();
    // Atualiza a lista exibida para incluir a nova tarefa

    taskInput.value = "";
    // Limpa o campo de entrada após adicionar a tarefa
  }
}

// Função para alternar o estado de conclusão de uma tarefa
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  // Alterna o valor de "completed" (true/false) no objeto da tarefa correspondente

  saveTasks();
  // Salva o array atualizado no LocalStorage

  renderTasks();
  // Atualiza a lista exibida para refletir o estado atualizado
}

// Função para excluir uma tarefa
function deleteTask(index) {
  tasks.splice(index, 1);
  // Remove a tarefa do array com base no índice passado

  saveTasks();
  // Salva o array atualizado no LocalStorage

  renderTasks();
  // Atualiza a lista exibida para remover a tarefa excluída
}

// Função para salvar tarefas no LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Converte o array de tarefas para uma string JSON e salva no LocalStorage
}

// Adiciona evento de clique ao botão de adicionar
addTaskBtn.addEventListener("click", addTask);
// Define que, ao clicar no botão "Adicionar", a função addTask será chamada

// Renderiza as tarefas ao carregar a página
renderTasks();
// Garante que as tarefas salvas sejam exibidas automaticamente ao abrir a aplicação
