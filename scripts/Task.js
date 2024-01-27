class Task {
  constructor(id, description, dueDate) {
      this.id = id;
      this.description = description;
      this.dueDate = dueDate;
      this.isCompleted = false;
      this.totalSeconds = 0;
      // Additional properties as needed
  }
}