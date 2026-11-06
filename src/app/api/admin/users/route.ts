import { NextResponse } from "next/server";

import { getOwnerSession } from "@/lib/admin-session";

const API_URL =
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

function adminApiKey() {
  return process.env.ADMIN_API_KEY;
}

export async function GET() {
  const owner =
    await getOwnerSession();

  if (!owner) {
    return NextResponse.json(
      { message: "Acesso restrito ao OWNER." },
      { status: 403 },
    );
  }

  const key = adminApiKey();

  if (!key) {
    return NextResponse.json(
      {
        message:
          "ADMIN_API_KEY não configurada.",
      },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${API_URL}/admin/users`,
    {
      cache: "no-store",
      headers: {
        "x-admin-api-key": key,
      },
    },
  );

  return NextResponse.json(
    await response.json(),
    {
      status: response.status,
    },
  );
}

export async function POST(
  request: Request,
) {
  const owner =
    await getOwnerSession();

  if (!owner) {
    return NextResponse.json(
      { message: "Acesso restrito ao OWNER." },
      { status: 403 },
    );
  }

  const key = adminApiKey();

  if (!key) {
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
    `${API_URL}/admin/users`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        "x-admin-api-key": key,
      },
      body: JSON.stringify(body),
    },
  );

  return NextResponse.json(
    await response.json(),
    {
      status: response.status,
    },
  );
}
