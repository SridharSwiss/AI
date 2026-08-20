"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const VIDEO_ID = "NRQfFUHbySA";
// Show the intro reel once per browser session so it doesn't replay on
// every internal navigation.
const SESSION_KEY = "aihub_intro_reel_seen";

/**
 * Full-screen intro overlay that plays a YouTube Short as soon as the site is
 * launched, then reveals the website. Autoplay starts muted (browsers block
 * autoplay with sound); the visitor can unmute, or skip at any time. The
 * overlay closes automatically when the reel finishes.
 */
export function IntroReel() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!window.sessionStorage.getItem(SESSION_KEY)) {
        setOpen(true);
      }
    } catch {
      // sessionStorage unavailable (private mode / blocked) — show once anyway.
      setOpen(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // Lock body scroll while the overlay is visible.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Listen for the YouTube IFrame API "ended" state to auto-close the overlay.
  useEffect(() => {
    if (!open) return;

    function post(func: string, args: unknown[] = []) {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }

    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "string") return;
      if (!e.origin.includes("youtube.com")) return;
      let data: { event?: string; info?: number };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      // Subscribe to state changes once the player is ready.
      if (data.event === "onReady") {
        post("addEventListener", ["onStateChange"]);
      }
      // Player state 0 === ENDED.
      if (data.event === "onStateChange" && data.info === 0) {
        dismiss();
      }
    }

    window.addEventListener("message", onMessage);
    // Kick off the listener handshake.
    const t = setTimeout(() => post("addEventListener", ["onStateChange"]), 800);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(t);
    };
  }, [open, dismiss]);

  const unmute = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    win?.postMessage(
      JSON.stringify({ event: "command", func: "unMute", args: [] }),
      "*"
    );
    win?.postMessage(
      JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
      "*"
    );
    setMuted(false);
  }, []);

  if (!open) return null;

  const src =
    `https://www.youtube.com/embed/${VIDEO_ID}` +
    `?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1&enablejsapi=1` +
    `&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
    >
      {/* Vertical Short: cap to viewport, keep 9:16 portrait ratio. */}
      <div className="relative h-[85vh] max-h-[85vh] aspect-[9/16] max-w-[95vw] overflow-hidden rounded-xl shadow-2xl">
        <iframe
          ref={iframeRef}
          className="h-full w-full"
          src={src}
          title="AIHub intro reel"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        {muted && (
          <button
            onClick={unmute}
            className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            🔊 Tap for sound
          </button>
        )}
        <button
          onClick={dismiss}
          className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
        >
          Skip &amp; enter site →
        </button>
      </div>
    </div>
  );
}
