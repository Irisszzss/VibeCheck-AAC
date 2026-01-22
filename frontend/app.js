// This file controls the buttons.
// Each button calls the backend API and prints the result on screen.

const out = document.getElementById("out");

// If your backend runs locally, keep this.
const API_BASE = "http://localhost:3000";

// FIX: Helper function now expects plain text, not an object
function show(text) {
  out.textContent = text;
}

async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

document.getElementById("btnFortune").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/fortune`);
  show(data.fortune); // Only show the fortune text
});

document.getElementById("btnJoke").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/joke`);
  show(data.joke); // Only show the joke text
});

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    // Combine emoji and message for a clean look
    show(`${data.emoji} ${data.message}`);
  });
});

document.getElementById("btnSmash").addEventListener("click", async () => {
  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json();
  // Custom message for the smash counter
  show(`💥 SMASH registered! Total count: ${data.smashes}`);
});

document.getElementById("btnSecret").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  show(data);
});

// --- VISUAL THEME CHANGER ---
// This code changes the background color based on button clicks

const body = document.body;

function setTheme(themeName) {
    // Remove all previous theme classes
    body.className = ''; 
    // Add the new theme class
    body.classList.add(themeName);
}

// Attach events to buttons
document.getElementById('btnFortune').addEventListener('click', () => setTheme('theme-fortune'));
document.getElementById('btnJoke').addEventListener('click', () => setTheme('theme-joke'));
document.getElementById('btnSmash').addEventListener('click', () => setTheme('theme-smash'));
document.getElementById('btnSecret').addEventListener('click', () => setTheme('theme-secret'));

// Mood buttons (using the data attribute)
document.querySelectorAll('.btnMood').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Get the mood (happy, tired, stressed) from the button
        const mood = btn.getAttribute('data-mood');
        setTheme('theme-' + mood);
    });
  show(data.message); // Only show the secret message
});