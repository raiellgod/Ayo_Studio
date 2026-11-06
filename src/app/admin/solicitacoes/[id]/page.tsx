"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  RequestStatusSelect,
  type StudioRequestStatus,
} from "@/components/admin/RequestStatusSelect";

type StudioRequestType =
  | "FLASH_RESERVATION"
  | "ARTWORK_RESERVATION"
  | "PRODUCT_INTEREST"
  | "TATTOO_CUSTOM"
  | "ART_CUSTOM"
  | "VOICE_CUSTOM";

type RelatedItem = {
  id: number;
  slug: string;
  name: string;
} | null;

type Professional = {
  id: number;
  slug: string;
  name: string;
} | null;

type StudioRequest = {
  id: number;
  type: StudioRequestType;
  status: StudioRequestStatus;

  name: string;
  whatsapp: string;
  email: string;
  instagram: string | null;

  message: string | null;
  details: Record<string, unknown> | null;

  professionalId: number | null;
  flashId: number | null;
  artworkId: number | null;
  productId: number | null;

  createdAt: string;
  updatedAt: string;

  professional: Professional;
  flash: RelatedItem;
  artwork: RelatedItem;
  product: RelatedItem;
};

function getTypeLabel(type: StudioRequestType) {
  const labels: Record<StudioRequestType, string> = {
    FLASH_RESERVATION: "Reserva de flash",
    ARTWORK_RESERVATION: "Reserva de obra",
    PRODUCT_INTEREST: "Interesse em produto",
    TATTOO_CUSTOM: "Tatuagem personalizada",
    ART_CUSTOM: "Arte personalizada",
    VOICE_CUSTOM: "Dublagem personalizada",
  };

  return labels[type];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDetailValue(value: unknown) {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  return JSON.stringify(value, null, 2);
}

export default function AdminSolicitacaoDetailPage() {
  const params = useParams<{ id: string }>();
  const requestId = Number(params.id);

  const [request, setRequest] =
    useState<StudioRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(
    null,
  );

  const loadRequest = useCallback(async () => {
    if (!Number.isInteger(requestId)) {
      setError("Solicitação inválida.");
      setLoading(false);
      return;
    }

    try {
      setError(null);

      const response = await fetch(
        `/api/admin/requests/${requestId}`,
        {
          cache: "no-store",
        },
      );

      if (response.status === 404) {
        setRequest(null);
        setError("Solicitação não encontrada.");
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Não foi possível carregar a solicitação.",
        );
      }

      const data =
        (await response.json()) as StudioRequest;

      setRequest(data);
    } catch (loadError) {
      console.error(loadError);
      setError(
        "Não foi possível carregar a solicitação.",
      );
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadRequest();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadRequest]);

  const whatsappUrl = useMemo(() => {
    if (!request) {
      return null;
    }

    const digits = request.whatsapp.replace(/\D/g, "");

    if (!digits) {
      return null;
    }

    const message = encodeURIComponent(
      `Olá, ${request.name}! Estou entrando em contato sobre o pedido #${request.id} enviado ao AYŌ Studio.`,
    );

    return `https://wa.me/${digits}?text=${message}`;
  }, [request]);

  async function updateStatus(
    id: number,
    status: StudioRequestStatus,
  ) {
    try {
      setUpdating(true);

      const response = await fetch(
        `/api/admin/requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Não foi possível atualizar o status.",
        );
      }

      await loadRequest();
    } catch (updateError) {
      console.error(updateError);
      setError(
        "Não foi possível atualizar o status da solicitação.",
      );
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl font-sans text-sm text-white/40">
          Carregando solicitação...
        </div>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-sans text-white/60">
            {error ?? "Solicitação não encontrada."}
          </p>

          <Link
            href="/admin/solicitacoes"
            className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.08em] text-white/70 transition hover:border-ayo-red/50 hover:text-white"
          >
            Voltar para solicitações
          </Link>
        </div>
      </main>
    );
  }

  const relatedItem =
    request.flash ??
    request.artwork ??
    request.product;

  const detailEntries = request.details
    ? Object.entries(request.details)
    : [];

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/admin/solicitacoes"
          className="font-sans text-xs uppercase tracking-[0.08em] text-white/45 transition hover:text-white"
        >
          ← Voltar para solicitações
        </Link>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-accent text-xs uppercase tracking-[0.12em] text-ayo-red">
                Pedido #{request.id}
              </span>

              <span className="rounded-full border border-white/10 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.08em] text-white/50">
                {getTypeLabel(request.type)}
              </span>
            </div>

            <h1 className="mt-5 font-title text-4xl sm:text-5xl">
              {request.name}
            </h1>

            <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.1em] text-white/30">
                  Contato
                </p>

                <div className="mt-3 space-y-2 font-sans text-sm text-white/65">
                  <p>WhatsApp: {request.whatsapp}</p>
                  <p>E-mail: {request.email}</p>

                  {request.instagram && (
                    <p>
                      Instagram: {request.instagram}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-[0.1em] text-white/30">
                  Solicitação
                </p>

                <div className="mt-3 space-y-2 font-sans text-sm text-white/65">
                  {request.professional && (
                    <p>
                      Profissional:{" "}
                      {request.professional.name}
                    </p>
                  )}

                  {relatedItem && (
                    <p>Item: {relatedItem.name}</p>
                  )}

                  <p>
                    Criado em:{" "}
                    {formatDate(request.createdAt)}
                  </p>

                  <p>
                    Atualizado em:{" "}
                    {formatDate(request.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {request.message && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="font-sans text-xs uppercase tracking-[0.1em] text-white/30">
                  Mensagem
                </p>

                <p className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/70">
                  {request.message}
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="font-sans text-xs uppercase tracking-[0.1em] text-white/30">
                Detalhes enviados
              </p>

              {detailEntries.length > 0 ? (
                <dl className="mt-4 grid gap-3 md:grid-cols-2">
                  {detailEntries.map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="rounded-2xl border border-white/5 bg-black/30 p-4"
                      >
                        <dt className="font-sans text-[11px] uppercase tracking-[0.08em] text-white/30">
                          {key}
                        </dt>

                        <dd className="mt-2 whitespace-pre-wrap break-words font-sans text-sm text-white/70">
                          {formatDetailValue(value)}
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              ) : (
                <p className="mt-3 font-sans text-sm text-white/40">
                  Nenhum detalhe adicional informado.
                </p>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#101010] p-5">
              <RequestStatusSelect
                requestId={request.id}
                value={request.status}
                disabled={updating}
                onChange={updateStatus}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#101010] p-5">
              <p className="font-sans text-xs uppercase tracking-[0.1em] text-white/30">
                Ações
              </p>

              <div className="mt-4 space-y-3">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center rounded-full bg-ayo-red px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
                  >
                    Abrir WhatsApp
                  </a>
                )}

                <a
                  href={`mailto:${request.email}`}
                  className="flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Enviar e-mail
                </a>
              </div>
            </div>
          </aside>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
