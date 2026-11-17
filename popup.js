const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

chrome.storage.local.get({ enabled: true }, (data) => {
  toggle.checked = data.enabled;
  status.textContent = data.enabled ? "Feed is blocked" : "Feed is visible";
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  status.textContent = enabled ? "Feed is blocked" : "Feed is visible";
});
