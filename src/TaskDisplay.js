import { TaskList } from './TaskList.js'

export class TaskDisplay {
  constructor(taskList, onEdit) {
    this.taskList = taskList;
    this.mainElement = document.querySelector('.main');
    this.onEdit = onEdit;
  }

  renderTask(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('card');

    taskElement.innerHTML = 
    `<div class="title-task-container">
      <input type="checkbox" class="checkbox-input">
      <label class="checkbox-label"></label>
      <h3 class="title-task">${task.title}</h3>
    </div>
    <p class="description">${task.description}</p>
    <div class="footer">
      <span class="date">${task.date}</span>
      <div class="actions">
        <svg class="edit" data-index="${task.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
        <svg class="delete" data-index="${task.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-empty</title><path d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" /></svg>
    </div>
  </div>
  `;

  const editButton = taskElement.querySelector('.edit');
  editButton.addEventListener('click', () => {
    this.onEdit(task.id);
  });

  const deleteButton = taskElement.querySelector('.delete');
  deleteButton.addEventListener('click', () => {
    this.taskList.deleteTask(task.id);
    this.renderTaskList();

    // updateProjects();
  });



  this.mainElement.appendChild(taskElement);
  }

  renderTaskList(tasksToRender = null) {
    this.mainElement.innerHTML = '';
    const tasks = tasksToRender || this.taskList.getTasks();
    tasks.forEach((task) => {
      this.renderTask(task);      
    });
  }
}