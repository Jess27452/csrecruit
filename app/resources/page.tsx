import type { Metadata } from "next";
import { ResourceBrowser } from "@/components/resource-browser";
import { ResourceLibraryHero } from "@/components/resource-library-hero";
import { getApprovedResources } from "@/lib/resource-server";
import "./resources.css";

export const metadata: Metadata = { title: "Resources", description: "Browse community-curated CS recruiting resources." };

export default async function Page() {
  const resources = await getApprovedResources();
  return <><ResourceLibraryHero /><section className="container library-body"><ResourceBrowser resources={resources} /></section></>;
}
