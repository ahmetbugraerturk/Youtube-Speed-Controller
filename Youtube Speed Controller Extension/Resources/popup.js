document.getElementById("speed1").addEventListener("click", () => setSpeed(1.0));
document.getElementById("speed25").addEventListener("click", () => setSpeed(2.5));
document.getElementById("speed275").addEventListener("click", () => setSpeed(2.75));
document.getElementById("speed3").addEventListener("click", () => setSpeed(3.0));

document.getElementById("setCustomSpeed").addEventListener("click", () => {
  const speed = parseFloat(document.getElementById("customSpeed").value);
  if (isNaN(speed) || speed <= 0) {
    alert("Please enter a valid speed (e.g. 1.0, 1.5, 2.0)");
    return;
  }
  setSpeed(speed);
});

document.getElementById("resetSpeed").addEventListener("click", () => {
  setSpeed(1.0); // Normal hızda (1.0) başlat
});

document.getElementById("customSpeed").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.getElementById("setCustomSpeed").click();
  }
});


function setSpeed(speed) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "setSpeed", speed: speed });
  });
}
