"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  getPreferenceSnapshot, getServerPreferenceSnapshot, savePreference,
  subscribePreference, syncAnalytics,
} from "@/lib/analytics-consent";

const openPreferencesEvent = "mpg:cookie-preferences";

export function CookiePreferencesButton() {
  return (
    <button
      type="button" id="cookie-preferences-button" aria-controls="cookie-preferences"
      className="text-xs text-white/70 transition-colors hover:text-yellow-400 cursor-pointer"
      onClick={() => window.dispatchEvent(new Event(openPreferencesEvent))}
    >
      Cookie preferences
    </button>
  );
}

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribePreference, getPreferenceSnapshot, getServerPreferenceSnapshot);
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLElement>(null);
  const visible = opened || choice === null;

  useEffect(() => {
    const open = () => setOpened(true);
    window.addEventListener(openPreferencesEvent, open);
    return () => window.removeEventListener(openPreferencesEvent, open);
  }, []);

  useEffect(() => {
    if (opened) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [opened]);

  useEffect(() => { syncAnalytics(pathname, document.title); }, [choice, pathname]);

  useEffect(() => {
    if (!visible || !panel.current) return;
    const markVisible = (inView: boolean) => document.documentElement.toggleAttribute("data-cookie-preferences-in-view", inView);
    if (!("IntersectionObserver" in window)) {
      markVisible(true);
      return () => { markVisible(false); };
    }
    const observer = new IntersectionObserver(entries => markVisible(entries[0].isIntersecting));
    observer.observe(panel.current);
    return () => { observer.disconnect(); markVisible(false); };
  }, [visible]);

  function close() {
    setOpened(false);
    requestAnimationFrame(() => document.getElementById("cookie-preferences-button")?.focus());
  }
  function choose(analytics: boolean) {
    if (savePreference(analytics)) {
      setMessage(analytics ? "Your choice is saved. Analytics is on." : "Your choice is saved. Analytics is off.");
      close();
    } else {
      setMessage("We couldn’t save your choice. Analytics remains off. You can still use the site and send an enquiry.");
    }
  }

  return (
    <>
      <section
        ref={panel} id="cookie-preferences" aria-labelledby="cookie-preferences-title" hidden={!visible}
        className="bg-mpg-cream border-t border-mpg-gold/40"
        onKeyDown={event => { if (event.key === "Escape" && opened && choice !== null) close(); }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 sm:px-8">
          <h2 ref={heading} id="cookie-preferences-title" tabIndex={-1} className="text-2xl font-semibold text-mpg-green-deep mb-3" style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}>
            Your cookie choice
          </h2>
          <p className="text-sm text-mpg-text-dark max-w-3xl leading-relaxed">
            Optional Google Analytics cookies help us understand which pages people use.
            Analytics stays off until you accept. You can decline or withdraw at any time
            using Cookie preferences in the footer. Your enquiry works either way.{" "}
            <Link href="/legal#privacy" className="contact-link">Read our privacy policy</Link>.
          </p>
          {choice !== null && <p className="text-sm text-mpg-text-dark mt-3">Analytics is currently {choice ? "on" : "off"}.</p>}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button type="button" onClick={() => choose(true)} className="cookie-choice-button">Accept analytics</button>
            <button type="button" onClick={() => choose(false)} className="cookie-choice-button">{choice ? "Withdraw analytics" : "Decline analytics"}</button>
            {opened && choice !== null && <button type="button" onClick={close} className="contact-link px-3 py-3 text-sm cursor-pointer">Close preferences</button>}
          </div>
          {message && <p className="text-sm text-mpg-text-dark mt-3">{message}</p>}
        </div>
      </section>
      <p role="status" aria-live="polite" className="sr-only">{message}</p>
    </>
  );
}
