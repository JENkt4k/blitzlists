/**
 * To integrate the task list and task ID information into your routing for a Single Page Application (SPA), you will need to modify the routing logic to handle dynamic parameters. These parameters will typically be part of the URL path. Here's how you can adjust your routing to include task list IDs and task IDs:

Dynamic Path Handling:

Modify your routing function to parse the URL and extract dynamic parameters like task list IDs or task IDs.
Route Definition with Parameters:

Define routes that include placeholders for these parameters, such as /task-list/:listId or /task/:taskId.
Extracting Parameters from URL:

Use a function to parse the current URL and extract the dynamic parameters.
Routing Based on Extracted Parameters:

Use the extracted parameters to determine which component to render.
Here's an example of how this can be implemented:
 * 
 */

function handleRouting() {
  const path = window.location.pathname;
  const pathSegments = path.split('/').filter(segment => segment);

  if (pathSegments.length === 0) {
      // Handle root route
  } else if (pathSegments[0] === 'task-list' && pathSegments[1]) {
      const listId = pathSegments[1];
      new TaskListModule(listId).render(); // Render TaskListModule with listId
  } else if (pathSegments[0] === 'task' && pathSegments[1]) {
      const taskId = pathSegments[1];
      new TaskModule(taskId).render(); // Render TaskModule with taskId
  }
  // ... other routes ...
}

window.onpopstate = handleRouting;
handleRouting(); // Call on initial load
