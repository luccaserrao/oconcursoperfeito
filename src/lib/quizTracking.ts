type QuizTrackingContext = {
  quiz_session_id: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_path?: string;
};

const QUIZ_SESSION_KEY = "quiz_session_id";
const QUIZ_TRACKING_KEY = "quiz_tracking_context";
const QUIZ_START_TRACKED_KEY = "quiz_start_tracked_session";
const JOURNEY_STEPS_TRACKED_KEY = "journey_steps_tracked";

type JourneyStep =
  | "landing_viewed"
  | "preparation_viewed"
  | "quiz_started"
  | "quiz_completed"
  | "email_submitted"
  | "results_viewed"
  | "upsell_clicked"
  | "checkout_started"
  | "payment_confirmed";

type JourneyTrackPayload = {
  step: JourneyStep;
  page_path?: string;
  quiz_version?: string;
  home_variant?: string;
  quiz_response_id?: string | null;
  order_id?: string | null;
  metadata?: Record<string, unknown>;
};

const getSafeString = (value: string | null | undefined) => {
  if (!value) return "";
  return String(value).trim();
};

const createSessionId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getQuizSessionId = () => {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(QUIZ_SESSION_KEY);
  if (existing) return existing;
  const generated = createSessionId();
  window.localStorage.setItem(QUIZ_SESSION_KEY, generated);
  return generated;
};

const buildTrackingContext = (): QuizTrackingContext => {
  const params = new URLSearchParams(window.location.search);
  const utmSource = getSafeString(params.get("utm_source"));
  const sourceParam = getSafeString(params.get("source"));
  const referrer = getSafeString(document.referrer);
  const landingPath = `${window.location.pathname}${window.location.search}`;

  return {
    quiz_session_id: getQuizSessionId(),
    source: sourceParam || utmSource || "",
    utm_source: utmSource || "",
    utm_medium: getSafeString(params.get("utm_medium")),
    utm_campaign: getSafeString(params.get("utm_campaign")),
    utm_content: getSafeString(params.get("utm_content")),
    utm_term: getSafeString(params.get("utm_term")),
    referrer,
    landing_path: landingPath,
  };
};

export const getQuizTrackingContext = (): QuizTrackingContext => {
  if (typeof window === "undefined") {
    return { quiz_session_id: "" };
  }

  const stored = window.localStorage.getItem(QUIZ_TRACKING_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as QuizTrackingContext;
      if (parsed?.quiz_session_id) return parsed;
    } catch {
      // ignore and rebuild
    }
  }

  const context = buildTrackingContext();
  window.localStorage.setItem(QUIZ_TRACKING_KEY, JSON.stringify(context));
  return context;
};

export const trackQuizStart = async (quizVersion: "v1" | "v2") => {
  if (typeof window === "undefined") return;
  const context = getQuizTrackingContext();
  if (!context.quiz_session_id) return;

  const alreadyTracked = window.localStorage.getItem(QUIZ_START_TRACKED_KEY);
  if (alreadyTracked === context.quiz_session_id) return;

  const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  if (!supabaseUrl) return;

  window.localStorage.setItem(QUIZ_START_TRACKED_KEY, context.quiz_session_id);

  try {
    await fetch(`${supabaseUrl}/functions/v1/track-quiz-start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...context,
        quiz_version: quizVersion,
      }),
    });
  } catch {
    // no-op
  }
};

export type { QuizTrackingContext };

const getQuizVersionFromStorage = () => {
  if (typeof window === "undefined") return "";
  const value = window.localStorage.getItem("quiz_version");
  return value ? String(value).trim() : "";
};

const getHomeVariantFromStorage = () => {
  if (typeof window === "undefined") return "";
  const value = window.localStorage.getItem("home_variant");
  return value ? String(value).trim().toUpperCase() : "";
};

const getTrackedJourneySteps = () => {
  if (typeof window === "undefined") return {} as Record<string, Record<string, boolean>>;
  const raw = window.localStorage.getItem(JOURNEY_STEPS_TRACKED_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, Record<string, boolean>>;
  } catch {
    return {};
  }
};

const markJourneyStepTracked = (sessionId: string, step: JourneyStep) => {
  if (typeof window === "undefined") return;
  const stored = getTrackedJourneySteps();
  stored[sessionId] = stored[sessionId] || {};
  stored[sessionId][step] = true;
  window.localStorage.setItem(JOURNEY_STEPS_TRACKED_KEY, JSON.stringify(stored));
};

const isJourneyStepTracked = (sessionId: string, step: JourneyStep) => {
  const stored = getTrackedJourneySteps();
  return Boolean(stored?.[sessionId]?.[step]);
};

export const trackJourneyStep = async (payload: JourneyTrackPayload) => {
  if (typeof window === "undefined") return;
  const context = getQuizTrackingContext();
  if (!context.quiz_session_id) return;

  const sessionId = context.quiz_session_id;
  if (isJourneyStepTracked(sessionId, payload.step)) return;

  const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  if (!supabaseUrl) return;

  markJourneyStepTracked(sessionId, payload.step);

  const pagePath =
    payload.page_path ||
    (typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : "");

  const body = {
    ...context,
    step: payload.step,
    page_path: pagePath,
    quiz_version: payload.quiz_version || getQuizVersionFromStorage(),
    home_variant: payload.home_variant || getHomeVariantFromStorage(),
    quiz_response_id: payload.quiz_response_id || null,
    order_id: payload.order_id || null,
    metadata: payload.metadata || null,
  };

  try {
    await fetch(`${supabaseUrl}/functions/v1/track-journey-step`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    // no-op
  }
};
