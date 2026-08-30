import { categories, slugify } from "@/lib/resource-data";
import { ResourceBrowser } from "@/components/resource-browser";
import { CategoryHero } from "@/components/category-hero";
import { getApprovedResources } from "@/lib/resource-server";
import "@/app/resources/resources.css";
import "./category-page.css";

export async function CategoryPage({ slug, subcategory = "" }: { slug: string; subcategory?: string }) {
  const category = categories.find((item) => item.slug === slug)!;
  const activeSubcategory = category.subcategories.find((item) => slugify(item) === subcategory) ?? "";
  const resources = await getApprovedResources({ category: category.name });
  return <><CategoryHero slug={slug} activeSubcategory={activeSubcategory} /><section className="container library-body"><ResourceBrowser initialCategory={category.name} initialSubcategory={activeSubcategory} resources={resources} /></section></>;
}
