import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wrap missing" id="main">
      <span className="eyebrow">Archive / 404</span>
      <h1>File not found.</h1>
      <p>This address has no entry in the archive.</p>
      <Link className="button dark" href="/#work">
        Browse selected work
      </Link>
    </main>
  );
}
