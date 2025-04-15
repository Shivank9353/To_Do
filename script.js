// Load tasks when the page loads
window.onload = function () {
    loadTasks();
  };
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
  
    const task = {
      text: taskText,
      completed: false
    };
  
    saveTask(task);
    renderTask(task);
    taskInput.value = '';
  }
  
  // Save a new task to localStorage
  function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Get all tasks from localStorage
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  // Render a single task on the UI
  function renderTask(task) {
    const taskList = document.getElementById('taskList');
  
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');
  
    // Toggle complete
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      task.completed = !task.completed;
      updateTasks();
    });
  
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      li.remove();
      deleteTask(task);
    });
  
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
  
  // Render all tasks from storage
  function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
  }
  
  // Update all tasks in localStorage (after edit, complete, etc.)
  function updateTasks() {
    const listItems = document.querySelectorAll('#taskList li');
    const tasks = [];
  
    listItems.forEach(li => {
      const text = li.childNodes[0].nodeValue.trim();
      const completed = li.classList.contains('completed');
      tasks.push({ text, completed });
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Delete a task from localStorage
  function deleteTask(taskToDelete) {
    const tasks = getTasks().filter(task => task.text !== taskToDelete.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  