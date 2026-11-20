import Image from "next/image";
import Link from "next/link";
export default function Brand() {
  return (
    <Link
      className="brand"
      href="/#intro"
      aria-label="ADIL CA / Digital archive home"
    >
      <Image className="mark" src="/brand/adil-ca-mark.png" width={32} height={32} alt="" unoptimized />
      <strong>ADIL CA</strong>
      <span className="brand-divider">/</span>
      <span className="brand-sub">Digital archive</span>
    </Link>
  );
}
