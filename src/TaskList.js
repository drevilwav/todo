export class TaskList {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
  }
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  getTasks() {
    return this.tasks;
  }

  getUniqueProjects() {
    const projects = this.tasks
      .map(task => task.project)
      .filter(project => project && project.trim() !== '');
    return [...new Set(projects)].sort((a, b) => a.localeCompare(b));
  }

  getTasksForToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.tasks.filter(task => task.date === today);
  }
  
  getTasksForTomorrow() {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];
    return this.tasks.filter(task => task.date === tomorrow);
  }
  
  getTasksForThisWeek() {
    const today = new Date();
    const weekEnd = new Date();
    weekEnd.setDate(today.getDate() + 7);
  
    return this.tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= today && taskDate <= weekEnd;
    });
  }
  
}

