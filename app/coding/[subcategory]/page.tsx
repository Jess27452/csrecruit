import { CategoryPage } from "@/components/category-page";
import { categories, slugify } from "@/lib/resource-data";

export function generateStaticParams() {
  const category = categories.find((item) => item.slug === "coding");
  return category?.subcategories.map((subcategory) => ({ subcategory: slugify(subcategory) })) ?? [];
}

export default async function Page({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  return <CategoryPage slug="coding" subcategory={subcategory} />;
}
