import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/products/ProductDetail";
import { mockProducts } from "@/data/mockProducts";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
