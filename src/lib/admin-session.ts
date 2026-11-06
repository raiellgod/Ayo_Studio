import { auth } from "../../auth";

export type AdminRole =
  | "OWNER"
  | "ADMIN"
  | "EDITOR";

export async function getAdminSession() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user =
    session.user as typeof session.user & {
      id?: string;
      role?: AdminRole;
    };

  if (!user.role) {
    return null;
  }

  return {
    session,
    user,
  };
}

export async function getOwnerSession() {
  const result =
    await getAdminSession();

  if (
    !result ||
    result.user.role !== "OWNER"
  ) {
    return null;
  }

  return result;
}

export async function getOperationsSession() {
  const result =
    await getAdminSession();

  if (
    !result ||
    !(
      result.user.role === "OWNER" ||
      result.user.role === "ADMIN"
    )
  ) {
    return null;
  }

  return result;
}
