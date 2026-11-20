import type { MetadataRoute } from "next";
import { projects } from "@/data/archive";
import { origin } from "@/lib/origin";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/field-journal", ...projects.map((p) => "/work/" + p.slug)].map(
    (path) => ({
      url: new URL(path, origin).href,
    }),
  );
}
