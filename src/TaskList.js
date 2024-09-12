export class TaskList {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
  }
  deleteTask(index) {
    this.tasks.splice(index, 1);
  }
  getTasks() {
    return this.tasks;
  }
}