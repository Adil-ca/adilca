export const plates: Record<
  string,
  { color: string; detail?: string; detailUrl?: string }
> = {
  "meteora-playground": {
    color: "plate-cyan",
    detail: "Range Lab · Comparing liquidity allocations",
    detailUrl: "https://meteora-playground-sigma.vercel.app/#lab",
  },
  mandatemukti: {
    color: "plate-aqua",
    detail: "SMS Detector · Local message analysis",
    detailUrl: "https://www.mandatemukti.in/sms-detector",
  },
  "sahaaya-relay": {
    color: "plate-teal",
    detail: "Responder console · Simulated emergency workflow",
    detailUrl: "https://sahaaya-relay.vercel.app/command",
  },
  "pitch-patch": {
    color: "plate-cyan",
    detail: "Diagnostic desk · Prepared example",
    detailUrl: "https://pitch-patch.vercel.app/result/demo",
  },
  venodesign: {
    color: "plate-aqua",
    detail: "Studio index · Package comparison",
    detailUrl: "https://veno-design.vercel.app/#packages",
  },
};
const captured = new Set([
  ...Object.keys(plates),
  "runtime-radar",
  "memory-rift",
  "shadowleak",
  "cjp-action-hub",
  "fresheros",
]);
export const hasCapture = (slug: string) => captured.has(slug);
export const number = (index: number) => String(index + 1).padStart(2, "0");
