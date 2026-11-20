import type { Metadata } from "next";
import JournalEntry from "@/components/JournalEntry";
import Footer from "@/components/Footer";
import { journal } from "@/data/journal";
import "./journal.css";
export const metadata: Metadata = {
  title: "The Field Journal",
  description:
    "Beyond the screen. Out in the world. Adil CA’s photographs and field notes from Devcon VIII in Mumbai.",
  alternates: { canonical: "/field-journal" },
  openGraph: {
    title: "The Field Journal | Adil CA",
    description: "Beyond the screen. Out in the world.",
    images: [journal[0].cover.src],
  },
  twitter: { card: "summary_large_image", images: [journal[0].cover.src] },
};
export default function FieldJournal() {
  return (
    <>
      <main className="wrap journal" id="main">
        <header className="journal-mast">
          <h1>
            The Field Journal<span>.</span>
          </h1>
          <p>Beyond the screen. Out in the world.</p>
        </header>
        {journal.map((entry, i) => (
          <JournalEntry key={entry.slug} entry={entry} issue={i + 1} />
        ))}
      </main>
      <Footer />
    </>
  );
}
