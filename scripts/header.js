let headerRoot = null;
function loadHeaderControl() {
  fetch('/header.html')
      .then(response => response.text())
      .then(html => {
        headerRoot = document.getElementById('header-container').innerHTML = html;
        console.log(html);
        const userName = localStorage.getItem('userName');
        const userStatus = localStorage.getItem('userStatus');

        setHeaderData(userName, userStatus);
        
      });
}

function setHeaderData( userName = "Unknown", userStatus = "No Peers" ) {
  document.getElementById('user-name').textContent = `Welcome, ${userName}`;
  document.getElementById('user-status').textContent = `Status: ${userStatus}`;
}

export { loadHeaderControl }