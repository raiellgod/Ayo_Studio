import { NextResponse } from "next/server";

import { auth } from "../../../../../auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Não autorizado.",
      },
      {
        status: 401,
      },
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
      {
        status: 500,
      },
    );
  }

  const response = await fetch(
    `${API_URL}/requests`,
    {
      cache: "no-store",
      headers: {
        "x-admin-api-key": adminApiKey,
      },
    },
  );

  const data = await response.json();

  return NextResponse.json(
    data,
    {
      status: response.status,
    },
  );
}