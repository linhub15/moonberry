import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useState } from "react";

import { authClient } from "#/lib/auth_client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in | SaaSKit" },
      { name: "description", content: "Sign in to your SaaSKit account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(undefined);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");
    const result = isSignUp
      ? await authClient.signUp.email({ email, name, password })
      : await authClient.signIn.email({ email, password });

    setIsPending(false);
    if (result.error) {
      setErrorMessage(result.error.message ?? "Authentication failed. Please try again.");
      return;
    }

    await router.invalidate();
    await navigate({ to: "/" });
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell mx-auto max-w-md rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Account</p>
        <h1 className="display-title mb-6 text-4xl font-bold">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp ? (
            <label className="block text-sm font-semibold">
              Name
              <input
                name="name"
                autoComplete="name"
                required
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2.5"
              />
            </label>
          ) : null}
          <label className="block text-sm font-semibold">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2.5"
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={8}
              required
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2.5"
            />
          </label>

          {errorMessage ? (
            <p className="text-sm font-medium text-red-700 dark:text-red-300" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60"
          >
            {isPending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setErrorMessage(undefined);
            setIsSignUp((value) => !value);
          }}
          className="mt-5 w-full text-sm font-semibold text-[var(--lagoon-deep)]"
        >
          {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
        </button>
      </section>
    </main>
  );
}
