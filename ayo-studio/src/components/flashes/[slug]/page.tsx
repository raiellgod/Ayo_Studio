import { notFound } from "next/navigation";

import { FlashDetail } from "@/components/flashes/FlashDetail";
import { mockFlashes } from "@/data/mockFlashes";

type FlashPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FlashPage({
  params,
}: FlashPageProps) {
  const { slug } = await params;

  const flash = mockFlashes.find(
    (item) => item.slug === slug,
  );

  if (!flash) {
    notFound();
  }

  return <FlashDetail flash={flash} />;
}