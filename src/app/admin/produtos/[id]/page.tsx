"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ProductForm,
  type ProductFormData,
} from "@/components/admin/ProductForm";

type ProductResponse =
  ProductFormData & {
    authorName: string | null;
    authorSlug: string | null;
  };

export default function EditarProdutoPage() {
  const params = useParams<{
    id: string;
  }>();

  const id = Number(params.id);

  const [product, setProduct] =
    useState<ProductFormData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadProduct =
    useCallback(async () => {
      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        setError(
          "ID de produto inválido.",
        );
        setLoading(false);
        return;
      }

      try {
        setError(null);

        const response = await fetch(
          `/api/admin/products/${id}`,
          {
            cache: "no-store",
          },
        );

        const result =
          (await response.json()) as
            | ProductResponse
            | {
                message?: string;
              };

        if (!response.ok) {
          throw new Error(
            "message" in result
              ? result.message ??
                  "Não foi possível carregar o produto."
              : "Não foi possível carregar o produto.",
          );
        }

        setProduct(
          result as ProductResponse,
        );
      } catch (loadError) {
        console.error(loadError);

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Não foi possível carregar o produto.",
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        void loadProduct();
      }, 0);

    return () =>
      window.clearTimeout(timeoutId);
  }, [loadProduct]);

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/admin/produtos"
          className="font-sans text-xs uppercase tracking-[0.08em] text-white/45 transition hover:text-white"
        >
          ← Voltar para produtos
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
            AYŌ STUDIO
          </p>

          <h1 className="mt-3 font-title text-4xl sm:text-5xl">
            Editar produto
          </h1>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando produto...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading && product && (
          <div className="mt-8">
            <ProductForm
              mode="edit"
              initialData={product}
            />
          </div>
        )}
      </div>
    </main>
  );
}
