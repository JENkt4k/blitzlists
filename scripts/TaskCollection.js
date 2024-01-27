//rename
/**
 * 
 * In this structure, Task represents the smallest unit. TaskList aggregates 
 * multiple Task objects, and LabelledLists is a higher-level organization that
 * groups several TaskList objects under various labels or categories.
 * This model should provide a solid foundation for your application's data 
 * structure, allowing for effective organization and manipulation of tasks and
 * lists.
 * 
 */
class LabelledLists {
  constructor() {
      this.lists = {};
  }

  addList(label, taskList) {
      if (!this.lists[label]) {
          this.lists[label] = [];
      }
      this.lists[label].push(taskList);
  }

  // Additional methods as needed
}
