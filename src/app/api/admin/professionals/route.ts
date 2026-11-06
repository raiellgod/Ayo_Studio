import { NextResponse } from "next/server";

import { auth } from "../../../../../auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

function getAdminApiKey() {
  return process.env.ADMIN_API_KEY;
}

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 },
    );
  }

  const adminApiKey = getAdminApiKey();

  if (!adminApiKey) {
    return NextResponse.json(
      {
        message:
          "ADMIN_API_KEY não configurada.",
      },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${API_URL}/admin/professionals`,
    {
      cache: "no-store",
      headers: {
        "x-admin-api-key": adminApiKey,
      },
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function POST(
  request: Request,
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 },
    );
  }

  const adminApiKey = getAdminApiKey();

  if (!adminApiKey) {
    return NextResponse.json(
      {
        message:
          "ADMIN_API_KEY não configurada.",
      },
      { status: 500 },
    );
  }

  const body = await request.json();

  const response = await fetch(
    `${API_URL}/admin/professionals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-api-key": adminApiKey,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
