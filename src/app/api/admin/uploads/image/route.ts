import { NextResponse } from "next/server";

import { auth } from "../../../../../../auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

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

  const uploadKey =
    process.env.ADMIN_UPLOAD_KEY;

  if (!uploadKey) {
    return NextResponse.json(
      {
        message:
          "ADMIN_UPLOAD_KEY não configurada no frontend.",
      },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const category =
    url.searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      {
        message:
          "Categoria de upload não informada.",
      },
      { status: 400 },
    );
  }

  const incomingFormData =
    await request.formData();

  const file =
    incomingFormData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        message:
          "Nenhuma imagem foi enviada.",
      },
      { status: 400 },
    );
  }

  const outgoingFormData =
    new FormData();

  outgoingFormData.append(
    "file",
    file,
    file.name,
  );

  const response = await fetch(
    `${API_URL}/uploads/image?category=${encodeURIComponent(category)}`,
    {
      method: "POST",
      headers: {
        "x-admin-upload-key": uploadKey,
      },
      body: outgoingFormData,
    },
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
