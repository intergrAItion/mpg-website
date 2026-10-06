// The preference contains only this optional choice, never enquiry information.
export const CONSENT_KEY = "mpg-analytics-consent";
export const CONSENT_COOKIE = "mpg_analytics_choice";
export const CONSENT_VERSION = 1;
export const GA_MEASUREMENT_ID = "G-1T14DW2GGH";
export type AnalyticsChoice = boolean | null;
const preferenceLifetime = 60 * 60 * 24 * 180;

export function parsePreference(raw: string | null): AnalyticsChoice {
  try {
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    if (Object.keys(record).sort().join(",") !== "analytics,version") return null;
    return record.version === CONSENT_VERSION && typeof record.analytics === "boolean" ? record.analytics : null;
  } catch { return null; }
}

function cookiePreference(): AnalyticsChoice {
  const cookie = document.cookie.split(";").map(value => value.trim()).find(value => value.startsWith(CONSENT_COOKIE + "="));
  return parsePreference(cookie ? decodeURIComponent(cookie.slice(CONSENT_COOKIE.length + 1)) : null);
}

export function readPreference(): AnalyticsChoice {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    const stored = parsePreference(raw);
    // A host-only essential cookie also bounds the lifetime and prevents a stale
    // acceptance surviving a failed storage write during withdrawal.
    if (stored === null || stored !== cookiePreference()) return null;
    // Read-only/unavailable storage must not revive an old affirmative choice.
    // Writing the identical value does not dispatch a cross-tab storage event.
    if (stored) window.localStorage.setItem(CONSENT_KEY, raw!);
    return stored;
  } catch { return null; }
}

function writeCookie(analytics: boolean) {
  const raw = JSON.stringify({ version: CONSENT_VERSION, analytics });
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(raw)}; Path=/; Max-Age=${preferenceLifetime}; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
}

type AnalyticsWindow = Window & {
  dataLayer: unknown[][];
  gtag: (...args: unknown[]) => void;
} & Record<string, unknown>;
let analyticsFrame: HTMLIFrameElement | null = null;
let lastPath: string | null = null;

function removeAnalyticsCookies() {
  // Only cookies used by this site's measurement integration. The new loader
  // always uses Path=/; also cover accessible legacy ancestor paths/domains.
  const names = ["_ga", `_ga_${GA_MEASUREMENT_ID.slice(2)}`];
  const host = window.location.hostname;
  const siteDomain = "macfarlanepropertygroup.co.za";
  const domains = new Set(["", host, `.${host}`]);
  if (host === siteDomain || host.endsWith(`.${siteDomain}`)) {
    domains.add(siteDomain); domains.add(`.${siteDomain}`);
  }
  const paths = new Set(["/"]);
  const segments = window.location.pathname.split("/").filter(Boolean);
  for (let index = 1; index <= segments.length; index++) {
    const path = "/" + segments.slice(0, index).join("/");
    paths.add(path); paths.add(path + "/");
  }
  for (const name of names) for (const domain of domains) for (const path of paths) {
    try {
      document.cookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}${domain ? `; Domain=${domain}` : ""}; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    } catch { /* Cookie access may be disabled; tracking still stops. */ }
  }
}

export function stopAnalytics() {
  if (typeof window === "undefined") return;
  if (analyticsFrame) {
    const child = analyticsFrame.contentWindow as AnalyticsWindow | null;
    if (child) {
      child[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      child.gtag = () => undefined;
      child.dataLayer = [];
    }
    // Destroy the loaded script's browsing context, including its listeners and
    // timers. No reload is needed, so an unfinished enquiry remains intact.
    analyticsFrame.remove(); analyticsFrame = null;
  }
  lastPath = null;
  removeAnalyticsCookies();
}

function cleanReferrer(): string {
  try { const url = new URL(document.referrer); return url.origin + url.pathname; }
  catch { return ""; }
}

export function syncAnalytics(pathname: string, title: string) {
  if (readPreference() !== true) { stopAnalytics(); return; }
  const location = window.location.origin + pathname;
  if (!analyticsFrame) {
    const frame = document.createElement("iframe");
    frame.hidden = true;
    frame.title = "Optional website analytics";
    frame.setAttribute("aria-hidden", "true");
    frame.dataset.mpgAnalytics = "";
    // about:blank inherits our origin. The tag receives only explicit page
    // views, running against an empty document with no enquiry form or history
    // transitions of its own.
    document.body.appendChild(frame);
    const child = frame.contentWindow as AnalyticsWindow | null;
    if (!child) { frame.remove(); return; }
    analyticsFrame = frame;
    child.dataLayer = [];
    child.gtag = (...args: unknown[]) => { child.dataLayer.push(args); };
    child.gtag("js", new Date());
    child.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: window.location.hostname,
      cookie_path: "/",
      cookie_expires: preferenceLifetime,
      cookie_flags: window.location.protocol === "https:" ? "SameSite=Lax;Secure" : "SameSite=Lax",
      page_location: location,
      page_referrer: cleanReferrer(),
    });
    const loader = child.document.createElement("script");
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    child.document.head.appendChild(loader);
  }
  if (lastPath === pathname) return;
  const child = analyticsFrame.contentWindow as AnalyticsWindow | null;
  if (!child) { stopAnalytics(); return; }
  child.document.title = title;
  child.gtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_location: location,
    page_title: title,
    page_referrer: lastPath ? window.location.origin + lastPath : cleanReferrer(),
  });
  lastPath = pathname;
}

let choice: AnalyticsChoice = null;
let initialised = false;
const listeners = new Set<() => void>();
let channel: BroadcastChannel | null = null;

function refreshPreference() {
  const next = readPreference();
  if (next !== true) stopAnalytics();
  if (choice !== next) {
    choice = next;
    for (const listener of listeners) listener();
  }
}
function storageChanged(event: StorageEvent) {
  if (event.key === null || event.key === CONSENT_KEY) refreshPreference();
}

export function subscribePreference(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", storageChanged);
    window.addEventListener("focus", refreshPreference);
    window.addEventListener("pageshow", refreshPreference);
    document.addEventListener("visibilitychange", refreshPreference);
    try { channel = new BroadcastChannel(CONSENT_KEY); channel.onmessage = refreshPreference; }
    catch { channel = null; } // Storage events still synchronise supported tabs.
  }
  refreshPreference();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", storageChanged);
      window.removeEventListener("focus", refreshPreference);
      window.removeEventListener("pageshow", refreshPreference);
      document.removeEventListener("visibilitychange", refreshPreference);
      channel?.close(); channel = null;
    }
  };
}
export function getPreferenceSnapshot(): AnalyticsChoice {
  if (!initialised && typeof window !== "undefined") {
    choice = readPreference(); initialised = true;
  }
  return choice;
}
export function getServerPreferenceSnapshot(): AnalyticsChoice { return null; }

export function savePreference(analytics: boolean): boolean {
  // Stop synchronously before persistence, cross-tab notifications or rendering.
  if (!analytics) stopAnalytics();
  try {
    writeCookie(analytics);
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: CONSENT_VERSION, analytics }));
  } catch {
    // Invalidate any previous affirmative value wherever storage is writable.
    try { writeCookie(false); } catch { /* Storage may be unavailable. */ }
    try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: CONSENT_VERSION, analytics: false })); } catch { /* Reads fail safely as well. */ }
  }
  refreshPreference();
  try { channel?.postMessage("preference-changed"); } catch { /* Focus/storage checks remain. */ }
  return choice === analytics;
}
