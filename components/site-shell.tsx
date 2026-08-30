"use client";

import Link from "next/link";
import { Braces, Menu, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { appConfig } from "@/lib/config";
import { useLanguage } from "@/components/language-provider";
import "./site-shell.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const nav = [[t("home"), "/"], [t("resources"), "/resources"], [t("categories"), "/#categories"]];
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" href="/" aria-label="CSRecruit home"><span className="brand-mark"><Braces size={20} /></span><span><strong>{appConfig.name}</strong><small>{t("brandDescription")}</small></span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
    <div className="header-actions"><Link className="icon-button" href="/resources" aria-label={t("search")}><Search size={18} /></Link><Link className="btn add-button" href="/resources/submit"><Plus size={16} /> {t("addResource")}</Link><div className="language-switch" role="group" aria-label="Language / 语言"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button><span>/</span><button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button></div><button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Open menu">{open ? <X /> : <Menu />}</button></div>
  </div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label, href]) => <Link href={href} onClick={() => setOpen(false)} key={href}>{label}</Link>)}<Link href="/resources/submit" onClick={() => setOpen(false)}>{t("addResource")}</Link></nav>}</header>;
}

export function SiteFooter() {
  const { t } = useLanguage();
  return <footer className="site-footer"><div className="container footer-inner"><div><Link className="brand footer-brand" href="/"><span className="brand-mark"><Braces size={20} /></span><span><strong>{appConfig.name}</strong><small>{t("brandDescription")}</small></span></Link></div><nav aria-label="Footer navigation"><Link href="/resources">{t("resources")}</Link><Link href="/resources/submit">{t("submitResource")}</Link></nav><p>{t("madeForCommunity")}</p></div></footer>;
}
