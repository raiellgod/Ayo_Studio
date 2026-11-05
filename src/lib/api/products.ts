export type Product = {
  id: number;
  slug: string;
  name: string;
  type: string;
  image: string;
  price: number | null;
  available: boolean;

  authorId: number | null;
  authorName: string | null;
  authorSlug: string | null;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

type GetProductsOptions = {
  authorId?: number;
  type?: string;
};

export async function getProducts(
  options: GetProductsOptions = {},
): Promise<Product[]> {
  const url = new URL(`${API_URL}/products`);

  if (options.authorId) {
    url.searchParams.set(
      "authorId",
      options.authorId.toString(),
    );
  }

  if (options.type) {
    url.searchParams.set(
      "type",
      options.type,
    );
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar os produtos.",
    );
  }

  return response.json();
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const response = await fetch(
    `${API_URL}/products/${slug}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Não foi possível carregar o produto.",
    );
  }

  return response.json();
}