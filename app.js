const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const goBtn = document.getElementById('goBtn');
const addressBar = document.getElementById('addressBar');
const contentDiv = document.getElementById('content');

const historyManager = new HistoryManager();

function updateButtons() {
  backBtn.disabled = !historyManager.canGoBack();
  forwardBtn.disabled = !historyManager.canGoForward();
}

async function loadUrl(url, pushToHistory = true) {
  if (!url) return;

  try {
    contentDiv.textContent = 'Loading...';
    // Use AllOrigins proxy
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);

    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const safeHTML = sanitizeHTML(data.contents);

    contentDiv.innerHTML = safeHTML;
    addressBar.value = url;

    if (pushToHistory) {
      historyManager.push(url);
    }
    updateButtons();
  } catch (err) {
    contentDiv.textContent = 'Error loading page: ' + err.message;
  }
}

goBtn.addEventListener('click', () => {
  let input = addressBar.value.trim();
  if (!input) return;

  // Try to form a URL, or treat as search query
  let url;
  try {
    url = new URL(input);
  } catch {
    // Not a valid URL, search Google
    url = new URL('https://www.google.com/search?q=' + encodeURIComponent(input));
  }
  loadUrl(url.href);
});

backBtn.addEventListener('click', () => {
  const url = historyManager.back();
  if (url) loadUrl(url, false);
  updateButtons();
});

forwardBtn.addEventListener('click', () => {
  const url = historyManager.forward();
  if (url) loadUrl(url, false);
  updateButtons();
});

reloadBtn.addEventListener('click', () => {
  const url = historyManager.current();
  if (url) loadUrl(url, false);
});

addressBar.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    goBtn.click();
  }
});

// Load a default page on start
loadUrl('https://example.com');
