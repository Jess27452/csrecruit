const VISITOR_KEY = "csrecruit_visitor_key";
const VISITOR_VOTES = "csrecruit_visitor_votes";

export function getVisitorKey() {
  let key = localStorage.getItem(VISITOR_KEY);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, key);
  }
  return key;
}

export function hasLocalVote(resourceId: string) {
  try { return JSON.parse(localStorage.getItem(VISITOR_VOTES) || "[]").includes(resourceId); }
  catch { return false; }
}

export function rememberLocalVote(resourceId: string, voted: boolean) {
  let votes: string[] = [];
  try { votes = JSON.parse(localStorage.getItem(VISITOR_VOTES) || "[]"); } catch {}
  const next = voted ? [...new Set([...votes, resourceId])] : votes.filter((id) => id !== resourceId);
  localStorage.setItem(VISITOR_VOTES, JSON.stringify(next));
}
