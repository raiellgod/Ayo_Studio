import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";

type AdminRole =
  | "OWNER"
  | "ADMIN"
  | "EDITOR";

type VerifiedAdmin = {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
};

type AdminTokenFields = {
  role?: AdminRole;
  adminValidatedAt?: number;
  adminInvalid?: boolean;
};

const API_URL =
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

const SESSION_REVALIDATE_MS =
  60 * 1000;

async function fetchCurrentAdmin(
  id: string,
) {
  const adminApiKey =
    process.env.ADMIN_API_KEY;

  if (!adminApiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}/admin/auth/session/${id}`,
      {
        cache: "no-store",
        headers: {
          "x-admin-api-key":
            adminApiKey,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as
      VerifiedAdmin;
  } catch (error) {
    console.error(
      "Falha ao revalidar sessão administrativa.",
      error,
    );

    return null;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email =
          typeof credentials.email ===
          "string"
            ? credentials.email
                .trim()
                .toLowerCase()
            : "";

        const password =
          typeof credentials.password ===
          "string"
            ? credentials.password
            : "";

        const adminApiKey =
          process.env.ADMIN_API_KEY;

        if (
          !email ||
          !password ||
          !adminApiKey
        ) {
          return null;
        }

        try {
          const response = await fetch(
            `${API_URL}/admin/auth/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                "x-admin-api-key":
                  adminApiKey,
              },
              body: JSON.stringify({
                email,
                password,
              }),
              cache: "no-store",
            },
          );

          if (!response.ok) {
            return null;
          }

          const admin =
            (await response.json()) as
              VerifiedAdmin;

          if (!admin.isActive) {
            return null;
          }

          return {
            id: String(admin.id),
            name: admin.name,
            email: admin.email,
            role: admin.role,
          };
        } catch (error) {
          console.error(
            "Falha ao validar login administrativo.",
            error,
          );

          return null;
        }
      },
    }),
  ],

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user }) {
      const adminToken =
        token as typeof token &
          AdminTokenFields;

      if (user) {
        const adminUser =
          user as typeof user & {
            role?: AdminRole;
          };

        adminToken.role =
          adminUser.role;

        adminToken.adminValidatedAt =
          Date.now();

        adminToken.adminInvalid =
          false;

        return adminToken;
      }

      if (
        adminToken.adminInvalid
      ) {
        return adminToken;
      }

      const userId =
        adminToken.sub;

      if (!userId) {
        adminToken.adminInvalid =
          true;

        return adminToken;
      }

      const lastValidation =
        adminToken.adminValidatedAt ??
        0;

      if (
        Date.now() -
          lastValidation <
        SESSION_REVALIDATE_MS
      ) {
        return adminToken;
      }

      const currentAdmin =
        await fetchCurrentAdmin(
          userId,
        );

      adminToken.adminValidatedAt =
        Date.now();

      if (!currentAdmin) {
        adminToken.adminInvalid =
          true;

        return adminToken;
      }

      adminToken.adminInvalid =
        false;

      adminToken.role =
        currentAdmin.role;

      adminToken.name =
        currentAdmin.name;

      adminToken.email =
        currentAdmin.email;

      return adminToken;
    },

    session({ session, token }) {
      const adminToken =
        token as typeof token &
          AdminTokenFields;

      if (
        adminToken.adminInvalid
      ) {
        if (session.user) {
          const invalidUser =
            session.user as typeof session.user & {
              id?: string;
              role?: AdminRole;
            };

          invalidUser.id = "";
          invalidUser.role = undefined;
        }

        return session;
      }

      if (session.user) {
        const adminUser =
          session.user as typeof session.user & {
            id?: string;
            role?: AdminRole;
          };

        adminUser.id =
          token.sub ?? "";

        adminUser.role =
          adminToken.role;
      }

      return session;
    },
  },
});
