import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import "../auth.css";
export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };
export default function Page() { return <section className="auth-page"><div className="card auth-card"><span className="eyebrow">Restricted area</span><h1>Administrator sign in</h1><p>Visitors do not need an account. This sign-in is only for reviewing pending submissions.</p><AuthForm mode="login" /></div></section>; }
