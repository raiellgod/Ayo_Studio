import { NextResponse } from "next/server";

import { getOwnerSession } from "@/lib/admin-session";

const API_URL =
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  const owner =
    await getOwnerSession();

  if (!owner) {
    return NextResponse.json(
      { message: "Acesso restrito ao OWNER." },
      { status: 403 },
    );
  }

  const key =
    process.env.ADMIN_API_KEY;

  if (!key) {
    return NextResponse.json(
      {
        message:
          "ADMIN_API_KEY não configurada.",
      },
      { status: 500 },
    );
  }

  const { id } =
    await context.params;

  const response = await fetch(
    `${API_URL}/admin/users/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
        "x-admin-api-key": key,
      },
      body: JSON.stringify(
        await request.json(),
      ),
    },
  );

  return NextResponse.json(
    await response.json(),
    {
      status: response.status,
    },
  );
}
