import Image from "next/image";
import CrtDisplay from "./CrtDisplay";

export default function Workbench() {
  return (
    <figure className="workbench">
      <div className="crt-frame">
        <Image
          src="/art/workstation-cutout.avif"
          alt="Beige vintage computer, keyboard and wired mouse with an interactive CRT screen."
          width={1320}
          height={1056}
          sizes="(max-width:760px) 90vw, 45vw"
          loading="eager"
          fetchPriority="high"
        />
        <CrtDisplay />
      </div>
      <figcaption>Move to explore ↔</figcaption>
    </figure>
  );
}
