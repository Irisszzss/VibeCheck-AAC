// This file controls the buttons.
// Each button calls the backend API and prints the result on screen.

const out = document.getElementById("out");

// If your backend runs locally, keep this.
const API_BASE = "http://localhost:3000";

// --- VISUAL THEME CHANGER FUNCTION ---
const body = document.body;

function setTheme(themeName) {
  // Remove all previous theme classes
  body.className = ''; 
  // Add the new theme class
  body.classList.add(themeName);
}

// --- HELPER FUNCTIONS ---
function show(text) {
  out.textContent = text;
}

async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

// --- BUTTON EVENTS ---

document.getElementById("btnFortune").addEventListener("click", async () => {
  setTheme('theme-fortune'); // Change color
  const data = await getJSON(`${API_BASE}/api/fortune`);
  show(data.fortune); 
});

document.getElementById("btnJoke").addEventListener("click", async () => {
  setTheme('theme-joke'); // Change color
  const data = await getJSON(`${API_BASE}/api/joke`);
  show(data.joke); 
});

document.getElementById("btnSmash").addEventListener("click", async () => {
  setTheme('theme-smash'); // Change color
  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json();
  show(`💥 SMASH registered! Total count: ${data.smashes}`);
});

document.getElementById("btnSecret").addEventListener("click", async () => {
  setTheme('theme-secret'); // Change color
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  
  // FIX: Access the specific property (likely .message or .secret)
  // If this still says undefined, check if your API returns { secret: "..." } instead
  show(data.message); 
});

// MOOD BUTTONS (Handles both API and Color)
document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    
    // 1. Change the color immediately
    setTheme('theme-' + mood);

    // 2. Call the API
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    
    // 3. Show result
    show(`${data.emoji} ${data.message}`);
  });
});