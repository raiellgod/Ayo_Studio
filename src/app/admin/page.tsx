import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/admin-session";

export default async function AdminPage() {
  const admin =
    await getAdminSession();

  if (
    admin?.user.role === "EDITOR"
  ) {
    redirect(
      "/admin/profissionais",
    );
  }

  redirect(
    "/admin/solicitacoes",
  );
}
