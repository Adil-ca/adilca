import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CornerUpLeft, Globe, Github, Folder } from "lucide-react";
import Footer from "@/components/Footer";
import { projects } from "@/data/archive";
import { number, hasCapture, plates } from "@/data/presentation";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((item) => item.slug === slug);
  if (!p) return {};
  const path = "/work/" + slug;
  const images = hasCapture(slug)
    ? ["/projects/" + slug + ".webp"]
    : ["/social.jpg"];
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: p.name + " | Adil CA",
      description: p.summary,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: p.name,
      description: p.summary,
      images,
    },
  };
}
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params,
    index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const p = projects[index],
    next = projects[(index + 1) % projects.length],
    plate = plates[slug];
  const label =
    (p.featured ? "A/" : "E/") +
    number(
      projects
        .filter((v) => v.featured === p.featured)
        .findIndex((v) => v.slug === slug),
    );
  return (
    <>
      <main className="wrap case-page" id="main">
        <Link
          className="back-link"
          href={p.featured ? "/#work" : "/#experiments"}
        >
          <CornerUpLeft size={16} />{" "}
          {p.featured ? "Selected work" : "Experiment log"}
        </Link>
        <header className="case-head">
          <p className="eyebrow">
            <i /> Archive file {label} <span>/</span> {p.category}
          </p>
          <h1>
            {p.name}
            <span>.</span>
          </h1>
          <p>{p.summary}</p>
        </header>
        <dl className="case-meta">
          <div>
            <dt>Contribution</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{p.status}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{p.stack.join(" · ")}</dd>
          </div>
        </dl>
        {hasCapture(slug) && (
          <figure className={"case-preview " + (plate?.color || "plate-teal")}>
            <div className="case-frame">
              <div className="window-bar">
                <span>
                  <Folder size={14} />
                  {slug} / Interface capture
                </span>
              </div>
              <a
                href={"/projects/" + slug + ".webp"}
                aria-label={"Open full-size " + p.name + " capture"}
              >
                <Image
                  preload
                  src={"/projects/" + slug + ".webp"}
                  alt={
                    p.name + " homepage, captured from the working interface"
                  }
                  width={1440}
                  height={900}
                  sizes="(max-width:800px) 94vw, 1050px"
                />
              </a>
            </div>
            <figcaption>
              {slug === "fresheros"
                ? "Local production build"
                : "Deployed homepage"}{" "}
              · Full-size capture
            </figcaption>
          </figure>
        )}
        <div className="case-body">
          <aside>
            <p className="eyebrow">In this file</p>
            <a href="#problem">The problem</a>
            <a href="#build">Inside the build</a>
            <a href="#features">Feature notes</a>
            {p.challenge && <a href="#challenge">Design challenge</a>}
            {p.event && <p className="event-note">{p.event}</p>}
          </aside>
          <article>
            <section id="problem">
              <p className="eyebrow">Context</p>
              <h2>The problem.</h2>
              <p>{p.problem}</p>
              <p>{p.solution}</p>
            </section>
            <section id="build">
              <p className="eyebrow">Architecture</p>
              <h2>Inside the build.</h2>
              <p>{p.architecture}</p>
            </section>
            {plate?.detail && (
              <figure className="detail-preview">
                <a href={"/projects/" + slug + "-detail.webp"}>
                  <Image
                    src={"/projects/" + slug + "-detail.webp"}
                    alt={plate.detail}
                    width={1440}
                    height={900}
                    sizes="(max-width:700px) 90vw, 720px"
                  />
                </a>
                <figcaption>
                  <a href={plate.detailUrl}>{plate.detail}</a>
                </figcaption>
              </figure>
            )}
            <section id="features">
              <p className="eyebrow">Interaction</p>
              <h2>Feature notes.</h2>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
            {p.challenge && (
              <section id="challenge">
                <p className="eyebrow">Field note</p>
                <h2>Design challenge.</h2>
                <p>{p.challenge}</p>
              </section>
            )}
            {(p.live || p.source) && (
              <div className="cta-row case-actions">
                {p.live && (
                  <a className="button primary" href={p.live}>
                    <Globe size={16} />{" "}
                    {slug === "mern-task-dashboard"
                      ? "Frontend preview"
                      : "Visit project"}
                  </a>
                )}
                {p.source && (
                  <a className="button light" href={p.source}>
                    <Github size={17} /> Source code
                  </a>
                )}
              </div>
            )}
          </article>
        </div>
        <Link className="next-case" href={"/work/" + next.slug}>
          <span className="eyebrow">
            <BookOpen size={17} /> Next file
          </span>
          <strong>{next.name}</strong>
        </Link>
      </main>
      <Footer />
    </>
  );
}
