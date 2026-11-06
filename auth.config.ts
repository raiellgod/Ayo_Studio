import type { NextAuthConfig } from "next-auth";

type AdminRole =
  | "OWNER"
  | "ADMIN"
  | "EDITOR";

function getAdminRole(
  user: unknown,
): AdminRole | undefined {
  if (
    !user ||
    typeof user !== "object"
  ) {
    return undefined;
  }

  const role =
    "role" in user
      ? user.role
      : undefined;

  if (
    role === "OWNER" ||
    role === "ADMIN" ||
    role === "EDITOR"
  ) {
    return role;
  }

  return undefined;
}

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }) {
      const role =
        getAdminRole(auth?.user);

      const hasValidAdminSession =
        Boolean(role);

      const isAdminRoute =
        nextUrl.pathname.startsWith(
          "/admin",
        );

      const isLoginRoute =
        nextUrl.pathname ===
        "/admin/login";

      if (
        isAdminRoute &&
        !isLoginRoute
      ) {
        return hasValidAdminSession;
      }

      if (
        isLoginRoute &&
        hasValidAdminSession
      ) {
        return Response.redirect(
          new URL(
            role === "EDITOR"
              ? "/admin/profissionais"
              : "/admin/solicitacoes",
            nextUrl,
          ),
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
