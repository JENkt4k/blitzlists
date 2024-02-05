/**
 * Populating the Drawer:
When populating the drawer with named lists, you can dynamically create elements based on your data model and append them to the #hamburger-menu-container.

Responsive Considerations:
Ensure that your drawer and the rest of your UI are responsive. The drawer should be easy to use on all device sizes. You might hide the hamburger menu on larger screens if you have enough space to always display the drawer content.

This implementation provides a basic sliding drawer menu that you can expand upon and style according to your application's design.
 * 
 */
let menuRoot = null;
let controlNode = null;
function loadMenuControl() {
  fetch('/menu.html')
      .then(response => response.text())
      .then(html => {
        controlNode = document.getElementById('hamburger-menu-control-container');
        menuRoot = controlNode.innerHTML = html;
        initializeMenuControl(); // Initialize the list control
      });
}

function initializeMenuControl(){
  document.getElementById('hamburger-menu-button').addEventListener('click', connectDrawerHandler );
  console.log(`Added event listener ${this}`);

  document.getElementById('hamburger-menu-list-button').addEventListener('click', connectDrawerHandler );
  console.log(`Added event listener ${this}`);

  document.getElementById('hamburger-menu-container').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        loadContentFromElement(event.target);
    }
  });

  //menu-item-connections replaced this
  // document.getElementById('show-qr-tasks').addEventListener('click', function() {
  //   renderQRTasksView();
  // });

  // document.getElementById('show-message-tasks').addEventListener('click', function() {
  //   renderMessageTasksView();
  // });
}

function loadContentFromElement(element) {
  const url = element.getAttribute('data-url');
  if (url) {
      loadContent(url);
  } else {
      console.error('No URL provided in data-url attribute');
  }
}


function loadContent(url) {
  fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('main-content').innerHTML = '<p>Sorry, there was a problem loading the content.</p>';
        });
}


function connectDrawerHandler(){
  console.log(`Menu clicked ${this}`);
  const drawer = document.getElementById('hamburger-menu-container');
  if (drawer.classList.contains('drawer-open')) {
      drawer.classList.remove('drawer-open');
      drawer.classList.add('drawer-closed');
  } else {
      drawer.classList.remove('drawer-closed');
      drawer.classList.add('drawer-open');
  }
  
}

//menu-item-connections replaced this with routing
// function renderQRTasksView() {
//   // Logic to render QR tasks view
//   loadContent()
//   console.log(`renderQRTasksView ${menuRoot}`);
// }

function renderMessageTasksView() {
  // Logic to render message tasks view
  console.log(`renderMessageTasksView ${menuRoot}`);
}

export { loadMenuControl }
