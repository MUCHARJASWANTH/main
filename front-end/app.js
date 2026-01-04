// ================================
// 🌐 REAL-TIME TYPING PROBABILITY
// ================================

const textarea = document.querySelector("textarea");
const reasons = document.getElementById("aiReasons");
const historyCanvas = document.getElementById("historyChart");

let probabilityHistory = [];

const suspiciousWords = [
    "password", "verify", "urgent", "click", "login", "bank", "account", "reset"
];

textarea.addEventListener("input", () => {
    const text = textarea.value.toLowerCase();
    let score = 0;
    let detected = [];

    suspiciousWords.forEach(word => {
        if (text.includes(word)) {
            score += 10;
            detected.push(word);
        }
    });

    score = Math.min(score, 100);

    updateExplanation(detected);
    updateHistory(score);
});

// ================================
// ⚠️ AI EXPLANATION PANEL
// ================================

function updateExplanation(words) {
    reasons.innerHTML = "";

    if (words.length === 0) {
        reasons.innerHTML = "<li>No suspicious patterns detected</li>";
        return;
    }

    words.forEach(word => {
        const li = document.createElement("li");
        li.textContent = `⚠️ Suspicious keyword detected: "${word}"`;
        reasons.appendChild(li);
    });
}

// ================================
// 📊 PROBABILITY HISTORY GRAPH
// ================================

function updateHistory(value) {
    probabilityHistory.push(value);
    if (probabilityHistory.length > 20) probabilityHistory.shift();

    const ctx = historyCanvas.getContext("2d");
    ctx.clearRect(0, 0, historyCanvas.width, historyCanvas.height);

    ctx.strokeStyle = "#00d4ff";
    ctx.lineWidth = 2;
    ctx.beginPath();

    probabilityHistory.forEach((val, i) => {
        const x = (i / 20) * historyCanvas.width;
        const y = historyCanvas.height - (val / 100) * historyCanvas.height;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.stroke();
}
