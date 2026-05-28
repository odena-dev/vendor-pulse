export type Role = "admin" | "vendor";

const ROLE_KEY = "vp_role";
const AUTH_KEY = "vp_auth";

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  const r = localStorage.getItem(ROLE_KEY);
  return r === "admin" || r === "vendor" ? r : null;
}

export function setRole(role: Role) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(AUTH_KEY, "1");
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}
