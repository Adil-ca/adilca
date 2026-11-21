"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GalleryHorizontalEnd, List, FolderOpen, BookOpen } from "lucide-react";
import type { Project } from "@/data/archive";
import { plates, number, hasCapture } from "@/data/presentation";
type Card = Pick<Project, "name" | "slug" | "status" | "category" | "summary">;
export default function Archive({ records }: { records: Card[] }) {
  const [list, setList] = useState(false);
  return (
    <section id="work" className="wrap section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <i /> 01 / Project archive
          </p>
          <h2>
            Selected work<span>.</span>
          </h2>
        </div>
        <div className="view-switch" role="group" aria-label="Project view">
          <button aria-pressed={!list} onClick={() => setList(false)}>
            <GalleryHorizontalEnd size={15} />
            Gallery
          </button>
          <button aria-pressed={list} onClick={() => setList(true)}>
            <List size={16} />
            Index
          </button>
        </div>
      </div>
      {list ? (
        <div className="record-list">
          {records.map((p, i) => (
            <Link href={"/work/" + p.slug} key={p.slug}>
              <span className="file-no">A/{number(i)}</span>
              <strong>{p.name}</strong>
              <span className="record-cat">{p.category}</span>
              <BookOpen size={19} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="project-grid">
          {records.map((p, i) => (
            <Link
              key={p.slug}
              href={"/work/" + p.slug}
              className={
                "project-card " +
                (i === 0 ? "lead " : "") +
                (plates[p.slug]?.color || "plate-teal")
              }
            >
              <div className="cover">
                <div className="cover-top">
                  <span>
                    <FolderOpen size={14} /> Archive file A/{number(i)}
                  </span>
                  <span className="cross" aria-hidden="true">
                    +
                  </span>
                </div>
                {hasCapture(p.slug) && (
                  <div className="browser-capture">
                    <div className="capture-chrome" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    <Image
                      src={"/projects/" + p.slug + ".webp"}
                      width={1440}
                      height={900}
                      alt={p.name + " homepage"}
                      sizes="(max-width: 700px) 90vw, 48vw"
                    />
                  </div>
                )}
                <div className="cover-bottom" aria-hidden="true">
                  <b>+</b>
                  <i className="barcode" />
                </div>
              </div>
              <div className="card-copy">
                <p className="eyebrow">{p.category}</p>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <div className="card-foot">
                  <span className="read-case">
                    <BookOpen size={16} /> Read case study
                  </span>
                  <span className="project-status">{p.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
