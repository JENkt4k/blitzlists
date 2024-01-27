let headerRoot = null;
function loadHeaderControl() {
  fetch('/header.html')
      .then(response => response.text())
      .then(html => {
        headerRoot = document.getElementById('header-container').innerHTML = html;
        console.log(html);
          //initializeHeaderControl(); // Initialize the header control
        const userName = "John Doe";
        const userStatus = "Online";

        document.getElementById('user-name').textContent = `Welcome, ${userName}`;
        document.getElementById('user-status').textContent = `Status: ${userStatus}`;
      });
}


export { loadHeaderControl }