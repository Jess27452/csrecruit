"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { categories, slugify } from "@/lib/resource-data";
import { useLanguage } from "@/components/language-provider";

export function CategoryHero({ slug, activeSubcategory }: { slug: string; activeSubcategory: string }) {
  const { t, categoryName, categoryDescription, subcategoryName } = useLanguage();
  const category = categories.find((item) => item.slug === slug)!;
  const title = activeSubcategory ? subcategoryName(activeSubcategory) : categoryName(category.name);
  return <section className="category-hero"><div className="container"><Link className="back-link" href="/resources"><ArrowLeft size={15} /> {t("allResources")}</Link><div className="category-hero-row"><div><span className="eyebrow">{t("resourceCategory")}</span><h1>{title}</h1><p>{activeSubcategory ? `${subcategoryName(activeSubcategory)} ${t("categoryCurated")}` : categoryDescription(category.name, category.description)}</p></div><Link className="btn btn-primary" href="/resources/submit"><Plus size={16} /> {t("addResource")}</Link></div><nav className="subcategory-tabs" aria-label={`${category.name} subcategories`}><Link className={!activeSubcategory ? "active" : ""} href={`/${slug}`}>{t("all")}</Link>{category.subcategories.map((item) => <Link className={item === activeSubcategory ? "active" : ""} href={`/${slug}/${slugify(item)}`} key={item}>{subcategoryName(item)}</Link>)}</nav></div></section>;
}
