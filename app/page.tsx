import { HomeContent } from "@/components/home-content";
import { getApprovedResources } from "@/lib/resource-server";
import "./home.css";

export default async function Home() {
  const resources = await getApprovedResources();
  return <HomeContent resources={resources} />;
}
