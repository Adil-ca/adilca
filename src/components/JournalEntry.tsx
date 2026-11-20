"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { JournalEntry as Entry, JournalPhoto } from "@/data/journal";
const ordinal = (n: number) => String(n).padStart(2, "0");
export default function JournalEntry({
  entry,
  issue,
}: {
  entry: Entry;
  issue: number;
}) {
  const photos = entry.chapters.flatMap((c) => c.photos);
  const sequence = photos.some((p) => p.src === entry.cover.src)
    ? photos
    : [entry.cover, ...photos];
  const [index, setIndex] = useState(0),
    [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    start = useRef<{ x: number; y: number } | null>(null);
  const selected = sequence[index];
  function move(by: number) {
    setIndex((i) => (i + by + sequence.length) % sequence.length);
  }
  function print(p: JournalPhoto, cover = false) {
    return (
      <figure className="journal-print" key={p.src}>
        <button
          type="button"
          aria-label={"Enlarge photograph: " + p.caption}
          onClick={() => {
            setIndex(sequence.findIndex((v) => v.src === p.src));
            setOpen(true);
            dialog.current?.showModal();
          }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes="(max-width: 700px) 90vw, 58vw"
            loading={cover ? "eager" : "lazy"}
          />
          <span className="expand">
            <Expand size={16} />
          </span>
        </button>
        <figcaption>
          <b>{ordinal(sequence.findIndex((v) => v.src === p.src) + 1)}</b>
          {p.caption}
        </figcaption>
      </figure>
    );
  }
  return (
    <article id={entry.slug} className="journal-entry">
      <header className="journal-cover">
        <div>
          <p className="eyebrow">
            <i /> Dispatch {ordinal(issue)} / {entry.city}
          </p>
          <h2>{entry.title}</h2>
          <p className="journal-sub">{entry.subtitle}</p>
          <p className="journal-first">{entry.story[0]}</p>
          <a className="read-case" href={"#" + entry.slug + "-venue"}>
            View the photographs ↓
          </a>
        </div>
        {print(entry.cover, true)}
      </header>
      <dl className="journal-stats">
        {[
          ...(entry.distance ? [[entry.distance, "Travelled to attend."]] : []),
          [
            ordinal(entry.days) + " DAYS",
            entry.experienceLabel ?? "At the event.",
          ],
          [entry.city, entry.country + "."],
          [entry.dates, entry.year + "."],
        ].map(([v, d]) => (
          <div key={v}>
            <dt>{v}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
      <div className="journal-story">
        <aside>
          <p className="eyebrow">Location notes</p>
          <strong>{entry.location}</strong>
          <p>
            {entry.city}, {entry.country}
          </p>
          <p>{entry.description}</p>
          {entry.official && (
            <a href={entry.official}>Official event website</a>
          )}
        </aside>
        <div>
          {entry.story.slice(1).map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      </div>
      {entry.chapters.map((c, i) => (
        <section
          id={i === 0 ? entry.slug + "-venue" : undefined}
          className="journal-chapter"
          key={c.title}
        >
          <div className="chapter-head">
            <p className="eyebrow">Chapter {ordinal(i + 1)}</p>
            <h3>{c.title}.</h3>
          </div>
          <div className={"journal-plates spread-" + (i % 4)}>
            {c.photos.map((p) => print(p))}
          </div>
        </section>
      ))}
      <dialog
        className="journal-viewer"
        aria-label="Photograph viewer"
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            move(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="viewer-top">
          <span>{entry.name}</span>
          <button
            autoFocus
            aria-label="Close photograph"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <div
          className="viewer-picture"
          style={{ aspectRatio: selected.width / selected.height }}
          onTouchStart={(e) => {
            const t = e.touches[0];
            start.current =
              e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null;
          }}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0],
              s = start.current;
            start.current = null;
            if (
              s &&
              Math.abs(t.clientX - s.x) > 45 &&
              Math.abs(t.clientX - s.x) > Math.abs(t.clientY - s.y)
            )
              move(t.clientX < s.x ? 1 : -1);
          }}
        >
          {open ? (
            <Image
              key={selected.src}
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="95vw"
            />
          ) : null}
        </div>
        <div className="viewer-foot">
          <button aria-label="Previous photograph" onClick={() => move(-1)}>
            <ArrowLeft />
          </button>
          <p aria-live="polite">
            {ordinal(index + 1)} / {ordinal(sequence.length)} ·{" "}
            {selected.caption}
          </p>
          <button aria-label="Next photograph" onClick={() => move(1)}>
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </article>
  );
}
