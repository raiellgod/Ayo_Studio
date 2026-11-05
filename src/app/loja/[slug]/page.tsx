import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/products/ProductDetail";
import { getProductBySlug } from "@/lib/api/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}