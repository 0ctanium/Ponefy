const DELAY_IN_MS = 3000;
const VIDEO_LENGTH_IN_MS = 20000;
const MAX_Z_INDEX = 2147483647;

const SHOULD_PONEFY = Math.floor(Math.random() * 100) === 69;

let hasLearnedWhoTheChampIs = false;
let timeoutId;

function ponefy() {
  if (hasLearnedWhoTheChampIs) {
    return;
  }

  // This acts as a basic debounce so that if the user is doing
  // something click intensive, we don't show them who the champ is
  // until they've taken a brief break
  if (timeoutId != null) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    // Don't show the video if the tab isn't active. We'll show
    // them who the champ is next time
    if (document.hidden) {
      return;
    }

    const url = chrome.runtime.getURL("poney.mp3");
    const audio = new Audio(url);

    // Prevent future clicks from spawning additional videos while
    // this is playing. In theory, pointer-events: none should guard
    // against this but child nodes could have pointer-events set
    // explicitly
    window.removeEventListener("mouseup", ponefy);

    audio.addEventListener("ended", () => {
      hasLearnedWhoTheChampIs = true;
    });

    audio.play();
  }, DELAY_IN_MS);
}

if (SHOULD_PONEFY) {
  // Add this to mouse-up instead of on load so we can auto-play
  // the video with sound
  window.addEventListener("mouseup", ponefy);
}
