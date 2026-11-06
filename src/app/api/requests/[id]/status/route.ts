import { NextResponse } from "next/server";

import { getOperationsSession } from "@/lib/admin-session";

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
  const admin =
    await getOperationsSession();

  if (!admin) {
    return NextResponse.json(
      {
        message:
          "Acesso restrito a OWNER ou ADMIN.",
      },
      { status: 403 },
    );
  }

  const adminApiKey =
    process.env.ADMIN_API_KEY;

  if (!adminApiKey) {
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
    `${API_URL}/requests/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
        "x-admin-api-key":
          adminApiKey,
      },
      body: JSON.stringify(
        await request.json(),
      ),
    },
  );

  const data =
    await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
