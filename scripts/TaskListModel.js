class TaskList {
  constructor(id, name) {
      this.id = id;
      this.name = name;
      this.tasks = [];
      this.creationDate = new Date();
  }

  addTask(task) {
      this.tasks.push(task);
  }

  // Additional methods as needed
}