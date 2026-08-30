"use client";

import Link from "next/link";
import { ArrowUp, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getVisitorKey, hasLocalVote, rememberLocalVote } from "@/lib/visitor-key";
import type { Resource } from "@/lib/resource-data";
import { useLanguage } from "@/components/language-provider";

export function ResourceCard({ resource }: { resource: Resource }) {
  const { language, t, categoryName, subcategoryName } = useLanguage();
  const [votes, setVotes] = useState(resource.upvotes);
  const [voted, setVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    // Voting history lives in browser storage, so it is restored after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVoted(hasLocalVote(resource.id));
  }, [resource.id]);

  async function toggleVote() {
    const supabase = createClient();
    if (!supabase) { setNotice("Voting will be available when the community database is connected."); return; }
    setVoting(true); setNotice("");
    const { data, error } = await supabase.rpc("toggle_anonymous_upvote", { target_resource_id: resource.id, visitor_key: getVisitorKey() });
    setVoting(false);
    if (error) { setNotice("Could not update your vote. Please try again."); return; }
    const serverVoted = Boolean(data);
    setVotes((count) => Math.max(0, count + (serverVoted ? 1 : -1)));
    setVoted(serverVoted);
    rememberLocalVote(resource.id, serverVoted);
  }

  return <article className="resource-card card"><div className="resource-card-top"><div className="resource-path"><Link href={`/${resource.category.toLowerCase()}`}>{categoryName(resource.category)}</Link><span>/</span><span>{subcategoryName(resource.subcategory)}</span></div><button className={`vote-button ${voted ? "voted" : ""}`} onClick={toggleVote} disabled={voting} aria-label={`${voted ? "Remove upvote from" : "Upvote"} ${resource.title}`} aria-pressed={voted}><ArrowUp size={16} /> {votes}</button></div><h2>{resource.title}</h2><p>{resource.description}</p><div className="resource-tags">{resource.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="resource-card-bottom"><div className="submitted-by"><span className="avatar" aria-hidden="true">{resource.submittedBy.slice(0, 1).toUpperCase()}</span><span>{t("addedBy")} <strong>{resource.submittedBy}</strong><small>{new Date(resource.createdAt).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</small></span></div><a className="resource-link" href={resource.url} target="_blank" rel="noopener noreferrer">{t("viewResource")} <ExternalLink size={15} /></a></div>{notice && <p className="card-notice" role="status">{notice}</p>}</article>;
}
