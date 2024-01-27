/**
 * Populating the Drawer:
When populating the drawer with named lists, you can dynamically create elements based on your data model and append them to the #drawer-container.

Responsive Considerations:
Ensure that your drawer and the rest of your UI are responsive. The drawer should be easy to use on all device sizes. You might hide the hamburger menu on larger screens if you have enough space to always display the drawer content.

This implementation provides a basic sliding drawer menu that you can expand upon and style according to your application's design.
 * 
 */
let menuRoot = null;
function loadMenuControl() {
  fetch('/menu.html')
      .then(response => response.text())
      .then(html => {
        menuRoot = document.getElementById('hamburger-menu-container').innerHTML = html;
          initializeMenuControl(); // Initialize the list control
      });
}

function initializeMenuControl(){
  document.getElementById('hamburger-menu-button').addEventListener('click', connectDrawerHandler );
  console.log(`Added event listener ${this}`);
  document.getElementById('hamburger-menu-list-button').addEventListener('click', connectDrawerHandler );
  console.log(`Added event listener ${this}`);


  document.getElementById('show-qr-tasks').addEventListener('click', function() {
    renderQRTasksView();
  });

  document.getElementById('show-message-tasks').addEventListener('click', function() {
    renderMessageTasksView();
  });
}

function connectDrawerHandler(){
  console.log(`Menu clicked ${this}`);
  const drawer = document.getElementById('drawer-container');
  if (drawer.classList.contains('drawer-open')) {
      drawer.classList.remove('drawer-open');
      drawer.classList.add('drawer-closed');
      // console.log(`Menu clicked ${drawer.classList}`);
  } else {
      drawer.classList.remove('drawer-closed');
      drawer.classList.add('drawer-open');
      // console.log(`Menu clicked ${drawer.classList}`);
  }
  
}

function renderQRTasksView() {
  // Logic to render QR tasks view
  console.log(`renderQRTasksView ${menuRoot}`);
}

function renderMessageTasksView() {
  // Logic to render message tasks view
  console.log(`renderMessageTasksView ${menuRoot}`);
}

export { loadMenuControl }
