import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pure-faith-global-one.vercel.app";

  const routes = [
    "",
    "/about",
    "/programs",
    "/speaking",
    "/academy",
    "/resources",
    "/books",
    "/store",
    "/give",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
