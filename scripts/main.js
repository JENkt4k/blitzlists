function loadContent(url) {
  fetch(url)
      .then(response => response.text())
      .then(html => {
          document.getElementById('main-content').innerHTML = html;
          // Initialize any JavaScript needed for the new content
      });
}
