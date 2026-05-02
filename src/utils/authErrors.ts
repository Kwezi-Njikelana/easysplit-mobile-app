const ERROR_MAP: Array<{
  match: (msg: string, code: string) => boolean;
  message: string;
}> = [
  {
    match: (msg) => msg.includes("invalid login credentials") || msg.includes("invalid credentials"),
    message: "Incorrect email or password. Please try again.",
  },
  {
    match: (msg) => msg.includes("email not confirmed"),
    message: "Please check your inbox and confirm your email before signing in.",
  },
  {
    match: (msg) => msg.includes("user not found"),
    message: "No account found with that email address.",
  },
  {
    match: (msg, code) => msg.includes("too many requests") || code === "over_request_rate_limit",
    message: "Too many attempts. Please wait a moment and try again.",
  },
  {
    match: (msg) => msg.includes("network") || msg.includes("fetch") || msg.includes("failed to fetch"),
    message: "Connection error. Please check your internet and try again.",
  },
  {
    match: (msg, code) => msg.includes("email already") || code === "user_already_exists",
    message: "An account with this email already exists. Try signing in instead.",
  },
  {
    match: (msg) => msg.includes("password") && msg.includes("weak"),
    message: "Password is too weak. Use at least 8 characters with a mix of letters and numbers.",
  },
  {
    match: (msg) => msg.includes("row not found") || msg.includes("no rows"),
    message: "Account profile not found. Please contact support.",
  },
];

export function getAuthError(error: any): string {
  const msg = (error?.message ?? "").toLowerCase();
  const code = error?.code ?? "";

  const match = ERROR_MAP.find((entry) => entry.match(msg, code));

  if (!match) {
    console.error("[Auth] Unclassified error:", error);
    return "Something went wrong. Please try again.";
  }

  return match.message;
}