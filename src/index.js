import "./styles.css";
import { Task } from './Task.js';
import { TaskList } from './TaskList.js';
import { TaskDisplay } from './TaskDisplay.js';

const allButton = document.querySelector('#all');
const todayButton = document.querySelector('#today');
const tomorrowButton = document.querySelector('#tomorrow');
const weekButton = document.querySelector('#week');
const addTaskButton = document.querySelector('#add');
const addTaskWindow = document.querySelector('.add-task-window');
const cancelAddTaskButton = document.querySelector('.cancel-task-btn');
const addTaskForm = document.querySelector('#task-form');

// Создаем экземпляры TaskList и TaskDisplay
const taskList = new TaskList();
const taskDisplay = new TaskDisplay(taskList, handleEditTask);
taskDisplay.renderTaskList();



// Отображаем окно добавления задачи при нажатии на кнопку "Add Task"
addTaskButton.addEventListener('click', () => {
  addTaskWindow.classList.remove('hidden');
});

// Скрываем окно добавления задачи при нажатии на кнопку "Cancel"
cancelAddTaskButton.addEventListener('click', () => {
  addTaskWindow.classList.add('hidden');
});

// Обрабатываем отправку формы добавления задачи
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Получаем значения из формы
  const title = addTaskForm.elements['title'].value;
  const description = addTaskForm.elements['description'].value;
  const date = addTaskForm.elements['date'].value;
  console.log(date);
  const project = addTaskForm.elements['project'].value;

  // Создаем новый объект задачи
  const newTask = new Task(title, description, date, project);

  // Добавляем задачу в список задач
  taskList.addTask(newTask);

  // Обновляем отображение списка задач
  taskDisplay.renderTaskList();

  // Скрываем окно добавления задачи
  addTaskWindow.classList.add('hidden');

  // Сбрасываем форму
  addTaskForm.reset();

  // Обновляем список проектов
  // updateProjects();
});

// Функция для обработки редактирования задачи
function handleEditTask(id) {
  const task = taskList.getTaskById(id);

  // Выбираем элементы окна редактирования
  const editTaskWindow = document.querySelector('.edit-task-window');
  const editTaskForm = document.querySelector('#edit-task-form');
  const cancelEditTaskButton = document.querySelector('.cancel-edit-task-btn');

  // Заполняем форму текущими данными задачи
  editTaskForm.elements['edit-title'].value = task.title;
  editTaskForm.elements['edit-description'].value = task.description;
  editTaskForm.elements['edit-date'].value = task.date;
  editTaskForm.elements['edit-project'].value = task.project;

  // Отображаем окно редактирования
  editTaskWindow.classList.remove('hidden');

  // Обработчик отправки формы редактирования
  function onSubmit(event) {
    event.preventDefault();

    // Обновляем данные задачи
    task.title = editTaskForm.elements['edit-title'].value;
    task.description = editTaskForm.elements['edit-description'].value;
    task.date = editTaskForm.elements['edit-date'].value;
    task.project = editTaskForm.elements['edit-project'].value;

    // Обновляем отображение задач
    taskDisplay.renderTaskList();

    // Скрываем окно редактирования
    editTaskWindow.classList.add('hidden');

    // Удаляем обработчик, чтобы избежать дублирования 
    editTaskForm.removeEventListener('submit', onSubmit);

    // Обновляем список проектов
    // updateProjects();
  }

    editTaskForm.addEventListener('submit', onSubmit);

     // Обработчик для кнопки "Cancel" в окне редактирования
     cancelEditTaskButton.addEventListener('click', () => {
      editTaskWindow.classList.add('hidden');
      editTaskForm.removeEventListener('submit', onSubmit);
     });
}

// Обработчики для кнопок фильтрации по датам
allButton.addEventListener('click', () => {
  taskDisplay.renderTaskList();
});

todayButton.addEventListener('click', () => {
  const todayTasks = taskList.getTasksForToday();
  taskDisplay.renderTaskList(todayTasks);
});

tomorrowButton.addEventListener('click', () => {
  const tomorrowTasks = taskList.getTasksForTomorrow();
  taskDisplay.renderTaskList(tomorrowTasks);
});

weekButton.addEventListener('click', () => {
  const weekTasks = taskList.getTasksForThisWeek();
  taskDisplay.renderTaskList(weekTasks);
});








