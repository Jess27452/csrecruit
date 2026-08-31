"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, Code2, ExternalLink, FileText, FolderKanban, Plus, Search, Sparkles } from "lucide-react";
import { categories, type Resource } from "@/lib/resource-data";
import { ResourceCard } from "@/components/resource-card";
import { useLanguage } from "@/components/language-provider";

const icons = [Code2, BriefcaseBusiness, FolderKanban, FileText, Sparkles];

export function HomeContent({ resources }: { resources: Resource[] }) {
  const { t, categoryName, categoryDescription, subcategoryName } = useLanguage();
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow"><span className="live-dot" /> {t("builtByStudents")}</span>
          <h1>{t("heroBefore")} <span>{t("heroAccent")}</span></h1>
          <p>{t("heroDescription")}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/resources">{t("browseResources")} <ArrowRight size={17} /></Link>
            <Link className="btn btn-secondary" href="/resources/submit"><Plus size={17} /> {t("addResource")}</Link>
          </div>
          <form className="hero-search" action="/resources">
            <Search size={20} /><label className="sr-only" htmlFor="home-search">{t("searchResources")}</label><input id="home-search" name="q" placeholder={t("searchPlaceholder")} /><button type="submit">{t("search")}</button>
          </form>
          <div className="hero-proof"><span><strong>{resources.length}+</strong> {t("curatedResources")}</span><span><strong>5</strong> {t("focusedCategories")}</span><span><strong>100%</strong> {t("freeToBrowse")}</span></div>
        </div>
      </section>

      <section className="section container" id="categories">
        <div className="section-head"><div><span className="eyebrow">{t("browseByTopic")}</span><h2>{t("startWhere")}</h2></div><p>{t("browseDescription")}</p></div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const Icon = icons[index];
            const count = resources.filter((resource) => resource.category === category.name).length;
            return <Link className="category-card card" href={`/${category.slug}`} key={category.slug}><span className="category-icon"><Icon size={21} /></span><h3>{categoryName(category.name)}</h3><p>{categoryDescription(category.name, category.description)}</p><div><span>{count} {count === 1 ? t("resource") : t("resourcesCount")}</span><ArrowRight size={17} /></div></Link>;
          })}
        </div>
      </section>

      <section className="inside-section">
        <div className="container">
          <div className="inside-heading"><div><span className="eyebrow">{t("insideEach")}</span><h2>{t("seeWhat")}</h2></div><p>{t("insideDescription")}</p></div>
          <div className="inside-grid">
            {categories.map((category) => {
              const categoryResources = resources.filter((resource) => resource.category === category.name).slice(0, 3);
              return <article className="inside-column" key={category.slug}>
                <div className="inside-column-head"><h3>{categoryName(category.name)}</h3><Link href={`/${category.slug}`} aria-label={`${t("browse")} ${categoryName(category.name)}`}><ArrowRight size={15} /></Link></div>
                <div className="inside-links">
                  {categoryResources.map((resource) => <a href={resource.url} target="_blank" rel="noopener noreferrer" key={resource.id}><span><strong>{resource.title === "Summer Internship GitHub List" ? "SimplifyJobs Summer 2026 Internships" : resource.title}</strong><small>{subcategoryName(resource.subcategory)}</small></span><ExternalLink size={14} /></a>)}
                </div>
                <Link className="inside-browse" href={`/${category.slug}`}>{t("browse")} {categoryName(category.name)} <ArrowRight size={13} /></Link>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-head"><div><span className="eyebrow">{t("topThisWeek")}</span><h2>{t("recommended")}</h2></div><Link className="text-link" href="/resources">{t("viewAll")} <ArrowRight size={16} /></Link></div>
          <div className="resource-list featured-list">{resources.slice(0, 3).map((resource) => <ResourceCard resource={resource} key={resource.id} />)}</div>
        </div>
      </section>

      <section className="section container community-cta">
        <div><span className="cta-icon"><BookOpen /></span><span className="eyebrow">{t("knowUseful")}</span><h2>{t("helpNext")}</h2><p>{t("shareDescription")}</p></div>
        <Link className="btn btn-primary" href="/resources/submit"><Plus size={17} /> {t("addResource")}</Link>
      </section>
    </>
  );
}
