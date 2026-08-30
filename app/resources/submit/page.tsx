import type { Metadata } from "next";
import { ResourceSubmitForm } from "@/components/resource-submit-form";
import { ResourceSubmitIntro } from "@/components/resource-submit-intro";
import "./submit.css";
export const metadata: Metadata = { title: "Submit a resource", robots: { index: false, follow: false } };
export default function Page() { return <section className="section container submit-page"><ResourceSubmitIntro /><ResourceSubmitForm /></section>; }
