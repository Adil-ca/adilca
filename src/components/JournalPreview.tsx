import Image from "next/image";
import Link from "next/link";
import { journal } from "@/data/journal";
export default function JournalPreview() {
  const e = journal[0];
  return (
    <section className="wrap journal-preview">
      <div>
        <p className="eyebrow">
          <i /> The field journal
        </p>
        <h2>
          Life outside
          <br />
          <em>the code.</em>
        </h2>
        <p>
          Not everything happens behind a screen. A few places, people and
          moments that have been part of the journey.
        </p>
        <Link className="button light" href="/field-journal">
          Explore the Field Journal →
        </Link>
      </div>
      <figure>
        <Image
          src={e.cover.src}
          alt={e.cover.alt}
          width={e.cover.width}
          height={e.cover.height}
          sizes="(max-width: 700px) 88vw, 32vw"
        />
        <figcaption>
          {e.name} / {e.city}, {e.year}
        </figcaption>
      </figure>
    </section>
  );
}
