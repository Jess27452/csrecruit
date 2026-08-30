import { CategoryPage } from "@/components/category-page";
import { categories, slugify } from "@/lib/resource-data";

export function generateStaticParams() {
  const category = categories.find((item) => item.slug === "projects");
  return category?.subcategories.map((slug) => ({ slug: slugify(slug) })) ?? [];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryPage slug="projects" subcategory={slug} />;
}
