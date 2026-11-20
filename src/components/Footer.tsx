import { Github, Linkedin, MessageSquare, CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { external, identity } from "@/data/site";
import Brand from "./Brand";
export default function Footer() {
  return (
    <>
      <section id="contact" className="transmission">
        <div className="wrap contact-grid">
          <div>
            <p className="eyebrow">
              <i /> 04 / Transmission
            </p>
            <h2>
              Let’s build
              <br />
              <em>something.</em>
            </h2>
          </div>
          <div className="contact-links">
            <p>{identity.contact}</p>
            <a href={external.linkedin} className="button dark">
              <MessageSquare size={17} /> Connect on LinkedIn
            </a>
            <div className="socials">
              <a href={external.x}>X / HunterMonkX</a>
              <a href={external.github}>
                <Github /> GitHub
              </a>
              <a href={external.linkedin}>
                <Linkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="wrap footer-inner">
          <Brand />
          <Link href="/#intro">
            <CornerUpLeft size={15} /> Back to index
          </Link>
        </div>
      </footer>
    </>
  );
}
