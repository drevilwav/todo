export class Task {
  constructor(title, description, date, project) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.date = date;
    this.project = project;
  }
}