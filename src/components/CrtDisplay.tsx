"use client";
import { useEffect, useId, useRef } from "react";

const SOURCE = process.env.NEXT_PUBLIC_CRT_VIDEO_SRC || "/art/crt-scrub.mp4";
const SENSITIVITY = 0.8;
// Glass outline from the illustration's 680 × 544 reference frame.
const GLASS =
  "M220 76 Q224 68 239 66 Q330 53 412 52 Q431 51 433 64 Q435 153 429 244 Q428 257 414 258 Q310 262 214 250 Q201 249 201 234 Q202 149 220 76Z";

export default function CrtDisplay() {
  const clip = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const events = new AbortController();
    const options = { signal: events.signal };
    let targetTime = 0,
      requestedTime = 0,
      seeking = false,
      frame = 0;
    let previousX: number | null = null;
    let visible = false;

    function seek() {
      frame = 0;
      if (
        !video ||
        seeking ||
        video.seeking ||
        video.error ||
        motion.matches ||
        !Number.isFinite(video.duration) ||
        Math.abs(targetTime - requestedTime) < 0.001
      )
        return;
      requestedTime = targetTime;
      seeking = true;
      video.currentTime = requestedTime;
    }
    function schedule() {
      if (!frame && !seeking) frame = requestAnimationFrame(seek);
    }
    function source() {
      if (!video) return;
      if (motion.matches && video.hasAttribute("src")) {
        video.removeAttribute("src");
        video.load();
        delete video.dataset.ready;
        targetTime = requestedTime = 0;
        seeking = false;
        previousX = null;
      } else if (!motion.matches && visible && !video.hasAttribute("src")) {
        video.src = SOURCE;
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      source();
    });
    observer.observe(video);
    motion.addEventListener("change", source, options);
    video.addEventListener(
      "loadeddata",
      () => {
        video.dataset.ready = "true";
      },
      options,
    );
    video.addEventListener(
      "error",
      () => {
        delete video.dataset.ready;
        seeking = false;
      },
      options,
    );
    video.addEventListener(
      "seeked",
      () => {
        seeking = false;
        schedule();
      },
      options,
    );
    function start(e: PointerEvent) {
      if (e.isPrimary) previousX = e.clientX;
    }
    function reset(e: PointerEvent) {
      if (e.isPrimary) previousX = null;
    }
    video.addEventListener("pointerenter", start, options);
    video.addEventListener("pointerdown", start, options);
    video.addEventListener("pointerleave", reset, options);
    video.addEventListener("pointercancel", reset, options);
    video.addEventListener(
      "pointerup",
      (e) => {
        if (e.pointerType !== "mouse") reset(e);
      },
      options,
    );
    video.addEventListener(
      "pointermove",
      (e) => {
        if (
          !e.isPrimary ||
          motion.matches ||
          video.error ||
          !Number.isFinite(video.duration)
        )
          return;
        const delta = previousX === null ? 0 : e.clientX - previousX;
        previousX = e.clientX;
        const width = video.getBoundingClientRect().width;
        if (width) {
          targetTime = Math.max(
            0,
            Math.min(
              video.duration,
              targetTime + (delta / width) * video.duration * SENSITIVITY,
            ),
          );
          schedule();
        }
      },
      options,
    );
    return () => {
      observer.disconnect();
      events.abort();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="crt-display" aria-hidden="true">
      <svg width="0" height="0" focusable="false">
        <defs>
          <clipPath id={clip} clipPathUnits="objectBoundingBox">
            <path
              d={GLASS}
              transform="scale(.004237288136 .004784688995) translate(-200 -51)"
            />
          </clipPath>
        </defs>
      </svg>
      <div className="crt-glass" style={{ clipPath: `url(#${clip})` }}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      </div>
    </div>
  );
}
