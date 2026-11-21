import JournalPreview from "@/components/JournalPreview";
import Link from "next/link";
import {
  FolderOpen,
  Send,
  Asterisk,
  FlaskConical,
  Code2,
  Database,
  Layers,
  Terminal,
  BookOpen,
  Globe,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Workbench from "@/components/Workbench";
import Archive from "@/components/Archive";
import Footer from "@/components/Footer";
import { communities, projects, toolkit } from "@/data/archive";
import { identity, external } from "@/data/site";
import { number } from "@/data/presentation";
import { origin } from "@/lib/origin";
export const metadata: Metadata = { alternates: { canonical: "/" } };
const toolIcons = [Code2, Database, Layers, Terminal];
export default function Home() {
  const records = projects
    .filter((p) => p.featured)
    .map(({ name, slug, summary, category, status }) => ({
      name,
      slug,
      summary,
      category,
      status,
    }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    url: origin.href,
    jobTitle: "Full-Stack Developer and Web3 Community Builder",
    sameAs: [external.github, external.x, external.linkedin],
    knowsAbout: identity.disciplines,
  };
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <section id="intro" className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow hero-label">
              <i /> Personal portfolio <span>/</span> Vol. 01
            </p>
            <h1>
              I BUILD THINGS
              <br />
              FOR THE
              <br />
              <em>INTERNET.</em>
            </h1>
            <p className="intro-text">{identity.intro}</p>
            <div className="cta-row">
              <Link href="#work" className="button primary">
                <FolderOpen /> Explore my work
              </Link>
              <Link href="#contact" className="button light">
                <Send /> Let’s connect
              </Link>
            </div>
          </div>
          <Workbench />
        </section>
        <div className="discipline-strip">
          <div className="wrap">
            {identity.disciplines.map((d) => (
              <span key={d}>
                <Asterisk aria-hidden="true" />
                {d}
              </span>
            ))}
          </div>
        </div>
        <Archive records={records} />
        <section className="lab-section" id="experiments">
          <div className="wrap lab-grid">
            <div>
              <p className="eyebrow">
                <i /> 02 / Field notes
              </p>
              <h2>
                Experiment
                <br />
                <em>log.</em>
              </h2>
              <p className="section-intro">
                Hackathon builds, browser tools, and ideas I wanted to try in
                code.
              </p>
              <FlaskConical className="lab-icon" size={50} strokeWidth={1} />
            </div>
            <div className="log-list">
              {projects
                .filter((p) => !p.featured)
                .map((p, i) => (
                  <Link key={p.slug} href={"/work/" + p.slug}>
                    <span className="file-no">E/{number(i)}</span>
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.event || p.category}</small>
                    </span>
                    <BookOpen size={18} />
                  </Link>
                ))}
            </div>
          </div>
        </section>
        <section id="about" className="wrap section about">
          <p className="eyebrow">
            <i /> 03 / The builder
          </p>
          <div className="about-grid">
            <div>
              <h2>
                Behind the
                <br />
                <em>archive.</em>
              </h2>
              <span className="byline">
                Adil CA <span>/</span> @HunterMonkX
              </span>
            </div>
            <div className="bio">
              <p>{identity.about}</p>
              <p>{identity.aboutMore}</p>
            </div>
          </div>
          <div className="about-ledgers">
            <div>
              <h3>
                <Users /> People &amp; communities
              </h3>
              {communities.map((c) => (
                <div className="community" key={c.name}>
                  <div>
                    <a href={c.url}>{c.name}</a>
                    <span>{c.role}</span>
                  </div>
                  <p>{c.description}</p>
                </div>
              ))}
            </div>
            <div id="toolkit">
              <h3>
                <Globe /> My toolkit
              </h3>
              {toolkit.map((t, i) => {
                const Icon = toolIcons[i];
                return (
                  <div className="tool-row" key={t.group}>
                    <Icon size={17} />
                    <div>
                      <strong>{t.group}</strong>
                      <p>{t.tools.join(" · ")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <JournalPreview />
      </main>
      <Footer />
    </>
  );
}
