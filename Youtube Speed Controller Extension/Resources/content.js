const defaultShortcuts = {
    increaseShortcut: { shiftKey: true, key: "'" },
    decreaseShortcut: { shiftKey: true, key: "!" },
    resetShortcut: { shiftKey: true, key: "R" }
};

function matchesShortcut(event, shortcut) {
    return event.shiftKey === shortcut.shiftKey && event.key === shortcut.key;
}

document.addEventListener("keydown", (e) => {
    const video = document.querySelector("video");
    if (!video) return;

    // Arrow keys for speed adjustment
    if (matchesShortcut(e, defaultShortcuts.increaseShortcut)) {
        // Increase speed
        video.playbackRate = Math.min(video.playbackRate + 0.25, 8); // Limit max speed to 16x
        console.log(`Playback speed increased to ${video.playbackRate}x`);
    } else if (matchesShortcut(e, defaultShortcuts.decreaseShortcut)) {
        // Decrease speed
        video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25); // Limit min speed to 0.25x
        console.log(`Playback speed decreased to ${video.playbackRate}x`);
    } else if (matchesShortcut(e, defaultShortcuts.resetShortcut)) {
        // Reset to normal speed
        video.playbackRate = 1.0;
        console.log(`Playback speed reset to ${video.playbackRate}x`);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setSpeed") {
    const video = document.querySelector("video");
    if (video) {
      video.playbackRate = message.speed;
    }
  }
});
