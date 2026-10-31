import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Link, ScriptOnce, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";

import Footer from "../components/site_footer";
import Header from "../components/site_header";
import PostHogProvider from "../integrations/posthog/provider";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "SaaSKit",
      },
      {
        name: "description",
        content: "A modern SaaS foundation built with TanStack Start.",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  errorComponent: RootErrorComponent,
  notFoundComponent: NotFoundComponent,
  shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ScriptOnce>{THEME_INIT_SCRIPT}</ScriptOnce>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <PostHogProvider>
          <Header />
          {children}
          <Footer />
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <main className="page-wrap px-4 py-16">
      <section className="island-shell rounded-2xl p-8" role="alert">
        <p className="island-kicker mb-2">Unexpected error</p>
        <h1 className="display-title mb-3 text-4xl font-bold">Something went wrong.</h1>
        {import.meta.env.DEV ? (
          <pre className="overflow-auto text-sm">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-full bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </section>
    </main>
  );
}

function NotFoundComponent() {
  return (
    <main className="page-wrap px-4 py-16">
      <section className="island-shell rounded-2xl p-8">
        <p className="island-kicker mb-2">404</p>
        <h1 className="display-title mb-3 text-4xl font-bold">Page not found.</h1>
        <Link to="/" className="font-semibold">
          Return home
        </Link>
      </section>
    </main>
  );
}
