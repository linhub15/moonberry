import { PostHogProvider as BasePostHogProvider } from "@posthog/react";
import type { PostHogConfig } from "posthog-js";
import type { ReactNode } from "react";

const POSTHOG_OPTIONS = {
  api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
  capture_pageview: "history_change",
  defaults: "2025-11-30",
  person_profiles: "identified_only",
} satisfies Partial<PostHogConfig>;

interface PostHogProviderProps {
  children: ReactNode;
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;

  if (!apiKey) {
    return children;
  }

  return (
    <BasePostHogProvider apiKey={apiKey} options={POSTHOG_OPTIONS}>
      {children}
    </BasePostHogProvider>
  );
}
