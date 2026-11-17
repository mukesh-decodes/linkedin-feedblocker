const FEED_SELECTORS = [
  "div[componentkey*='FeedType_MAIN FEED RELEVANCE']",
  "div[role='listitem'][componentkey*='FeedType_MAIN']",
  "div[componentkey*='update-card-fo']"
];

const BANNER_ID = "lfb-blocked-banner";

function hideFeed() {
  document.documentElement.classList.add("lfb-active");

  FEED_SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.setProperty("display", "none", "important");
    });
  });

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/feed/"
  ) {
    showBanner();
  }
}

function showFeed() {
  document.documentElement.classList.remove("lfb-active");

  FEED_SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.removeProperty("display");
    });
  });

  removeBanner();
}

function showBanner() {
  if (document.getElementById(BANNER_ID)) return;

  const main = document.querySelector("main.scaffold-layout__main");
  if (!main) return;

  const banner = document.createElement("div");
  banner.id = BANNER_ID;
  banner.innerHTML = `
    <div style="
      max-width: 560px;
      margin: 60px auto;
      padding: 40px;
      text-align: center;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="font-size: 48px; margin-bottom: 16px;">🛡️</div>
      <h2 style="margin: 0 0 8px; font-size: 22px; color: #191919;">Feed Blocked</h2>
      <p style="margin: 0; color: #666; font-size: 15px; line-height: 1.5;">
        LinkedIn Feed Blocker is keeping you focused.<br>
        Use the extension icon to toggle the feed back on.
      </p>
    </div>
  `;
  main.prepend(banner);
}

function removeBanner() {
  const banner = document.getElementById(BANNER_ID);
  if (banner) banner.remove();
}

function applyState(enabled) {
  if (enabled) {
    hideFeed();
  } else {
    showFeed();
  }
}

chrome.storage.local.get({ enabled: true }, (data) => {
  applyState(data.enabled);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    applyState(changes.enabled.newValue);
  }
});

const observer = new MutationObserver(() => {
  chrome.storage.local.get({ enabled: true }, (data) => {
    if (data.enabled) hideFeed();
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
