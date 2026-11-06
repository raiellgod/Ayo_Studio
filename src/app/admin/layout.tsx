import Link from "next/link";

import { signOut } from "../../../auth";
import { getAdminSession } from "@/lib/admin-session";

const contentNavItems = [
  {
    href: "/admin/profissionais",
    label: "Profissionais",
  },
  {
    href: "/admin/flashes",
    label: "Flashes",
  },
  {
    href: "/admin/artes",
    label: "Artes",
  },
  {
    href: "/admin/produtos",
    label: "Produtos",
  },
  {
    href: "/admin/videos",
    label: "Vídeos",
  },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin =
    await getAdminSession();

  const role =
    admin?.user.role;

  const navItems = [
    ...(
      role === "OWNER" ||
      role === "ADMIN"
        ? [
            {
              href:
                "/admin/solicitacoes",
              label: "Solicitações",
            },
          ]
        : []
    ),

    ...contentNavItems,

    ...(
      role === "OWNER"
        ? [
            {
              href:
                "/admin/usuarios",
              label: "Usuários",
            },
          ]
        : []
    ),
  ];

  const homeHref =
    role === "EDITOR"
      ? "/admin/profissionais"
      : "/admin/solicitacoes";

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <Link
              href={homeHref}
              className="font-title text-2xl tracking-wide text-white"
            >
              AYŌ Studio
            </Link>

            <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-white/35">
              Administração
              {role
                ? ` · ${role}`
                : ""}
            </p>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0">
            <nav className="flex gap-2">
              {navItems.map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap rounded-full border border-white/10 px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-white/55 transition hover:border-ayo-red/50 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <form
              action={async () => {
                "use server";

                await signOut({
                  redirectTo:
                    "/admin/login",
                });
              }}
            >
              <button
                type="submit"
                className="whitespace-nowrap rounded-full border border-ayo-red/30 px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-ayo-cream/70 transition hover:border-ayo-red hover:text-white"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
