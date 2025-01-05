import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css?url"
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { useSupabase } from "./lib/supabase";
import { getSupabaseEnv, getSupabaseWithSessionHeaders } from "./lib/supabase.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


export function Layout({ children }: { children: React.ReactNode }) {
  const { env, serverSession, doaminUrl } = useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, serverSession });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { serverSession, headers } = await getSupabaseWithSessionHeaders({
    request,
  });
  const env = getSupabaseEnv();
  const doaminUrl = process.env.DOMAIN_URL;
  return json(
    {env, serverSession, doaminUrl},
    { headers }
  );
};

export default function App() {
  const { env, serverSession, doaminUrl } = useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, serverSession });
  
  return <Outlet context={{ supabase, doaminUrl }} />;
}
