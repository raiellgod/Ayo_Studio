"use client";

import { useEffect, useRef, useState } from "react";

import { createStudioRequest } from "@/lib/api/requests";

type ReservationFormProps = {
  itemType: "flash" | "arte" | "produto";

  itemId: number;

  itemName: string;
  itemSlug: string;

  artistName: string;
  artistSlug?: string | null;
  professionalId?: number | null;

  price: number | null;
  itemImage: string;
};

export function ReservationForm({
  itemType,
  itemId,
  itemName,
  itemSlug,
  artistName,
  artistSlug,
  professionalId,
  price,
  itemImage,
}: ReservationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(
    null,
  );

  const [requestId, setRequestId] = useState<number | null>(
    null,
  );

  /*
   * Marca quando o formulário foi carregado.
   *
   * Serve como proteção simples contra bots que
   * submetem formulários imediatamente.
   */
  const formStartedAt = useRef<number | null>(null);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;

    const endpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    const studioWhatsapp =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const formData = new FormData(form);

    /*
     * =========================================
     * ANTI-SPAM 1 — HONEYPOT
     * =========================================
     */

    const honeypot = String(
      formData.get("_gotcha") ?? "",
    ).trim();

    if (honeypot) {
      /*
       * Para bots fingimos que o envio funcionou.
       * Nenhuma solicitação será criada.
       */
      setSubmitted(true);

      return;
    }

    /*
     * =========================================
     * ANTI-SPAM 2 — TEMPO MÍNIMO
     * =========================================
     */

    if (formStartedAt.current === null) {
      setError(
        "Aguarde alguns segundos antes de enviar a solicitação.",
      );

      return;
    }

    const elapsed =
      Date.now() - formStartedAt.current;

    const minimumTime = 2000;

    if (elapsed < minimumTime) {
      setError(
        "Aguarde alguns segundos antes de enviar a solicitação.",
      );

      return;
    }

    /*
     * =========================================
     * CONFIGURAÇÃO
     * =========================================
     */

    if (!studioWhatsapp) {
      setError(
        "O WhatsApp do Studio ainda não foi configurado.",
      );

      return;
    }

    setIsSubmitting(true);
    setError(null);

    /*
     * =========================================
     * URLS
     * =========================================
     */

    const origin = window.location.origin;

    const itemPath =
      itemType === "flash"
        ? `/flashes/${itemSlug}`
        : itemType === "arte"
          ? `/artes/${itemSlug}`
          : `/loja/${itemSlug}`;

    const itemUrl = `${origin}${itemPath}`;

    const absoluteImageUrl =
      itemImage.startsWith("http")
        ? itemImage
        : `${origin}${itemImage}`;

    const artistUrl = artistSlug
      ? `${origin}/artistas/${artistSlug}`
      : null;

    /*
     * =========================================
     * PREÇO
     * =========================================
     */

    const formattedPrice =
      price !== null
        ? price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : "Consultar";

    /*
     * =========================================
     * DADOS DO CLIENTE
     * =========================================
     */

    const name = String(
      formData.get("name") ?? "",
    ).trim();

    const customerWhatsapp = String(
      formData.get("whatsapp") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const instagram = String(
      formData.get("instagram") ?? "",
    ).trim();

    const message = String(
      formData.get("message") ?? "",
    ).trim();

    /*
     * =========================================
     * TIPO DA SOLICITAÇÃO NO BACKEND
     * =========================================
     */

    const requestType =
      itemType === "flash"
        ? "FLASH_RESERVATION"
        : itemType === "arte"
          ? "ARTWORK_RESERVATION"
          : "PRODUCT_INTEREST";

    try {
      /*
       * =========================================
       * 1. SALVAR NO BANCO
       * =========================================
       *
       * O banco passa a ser a fonte principal.
       */

      const studioRequest =
        await createStudioRequest({
          type: requestType,

          name,
          whatsapp: customerWhatsapp,
          email,

          instagram:
            instagram.length > 0
              ? instagram
              : null,

          message:
            message.length > 0
              ? message
              : null,

          professionalId:
            professionalId ?? null,

          flashId:
            itemType === "flash"
              ? itemId
              : null,

          artworkId:
            itemType === "arte"
              ? itemId
              : null,

          productId:
            itemType === "produto"
              ? itemId
              : null,

          details: {
            itemName,
            itemSlug,

            itemType,

            artistName,

            artistSlug:
              artistSlug ?? null,

            itemUrl,

            artistUrl,

            image:
              absoluteImageUrl,

            price,

            formattedPrice,
          },
        });

      /*
       * Este é agora o número oficial
       * da solicitação.
       */
      const createdRequestId =
        studioRequest.id;

      setRequestId(createdRequestId);

      /*
       * =========================================
       * 2. PREPARAR FORMSPREE
       * =========================================
       */

      formData.set(
        "pedido",
        String(createdRequestId),
      );

      formData.set(
        "tipo",
        itemType === "flash"
          ? "Flash"
          : itemType === "arte"
            ? "Arte"
            : "Produto",
      );

      formData.set(
        "item",
        itemName,
      );

      formData.set(
        "slug",
        itemSlug,
      );

      formData.set(
        "artista",
        artistName,
      );

      if (artistSlug) {
        formData.set(
          "artistaSlug",
          artistSlug,
        );
      }

      formData.set(
        "valor",
        formattedPrice,
      );

      formData.set(
        "imagem",
        absoluteImageUrl,
      );

      formData.set(
        "paginaDoItem",
        itemUrl,
      );

      formData.set(
        "origem",
        "Site AYŌ Studio",
      );

      formData.set(
        "enviadoEm",
        new Date().toLocaleString(
          "pt-BR",
          {
            dateStyle: "short",
            timeStyle: "medium",
          },
        ),
      );

      formData.set(
        "_subject",
        `Pedido #${createdRequestId} - ${itemName}`,
      );

      /*
       * =========================================
       * 3. FORMSPREE
       * =========================================
       *
       * Formspree deixa de ser a fonte principal.
       * O pedido já está salvo no banco.
       */

      if (endpoint) {
        try {
          const response =
            await fetch(endpoint, {
              method: "POST",

              body: formData,

              headers: {
                Accept:
                  "application/json",
              },
            });

          if (!response.ok) {
            console.warn(
              `Pedido #${createdRequestId} foi salvo no banco, mas o Formspree não confirmou o envio.`,
            );
          }
        } catch (formspreeError) {
          console.warn(
            `Pedido #${createdRequestId} foi salvo no banco, mas houve erro no Formspree.`,
            formspreeError,
          );
        }
      }

      /*
       * =========================================
       * 4. WHATSAPP
       * =========================================
       */

      const whatsappMessage = `
Olá! Enviei uma solicitação pelo site do AYŌ Studio.

PEDIDO
#${createdRequestId}

ITEM
${itemName}

TIPO
${
  itemType === "flash"
    ? "Flash"
    : itemType === "arte"
      ? "Arte"
      : "Produto"
}

ARTISTA
${artistName}

VALOR
${formattedPrice}

PÁGINA DO ITEM
${itemUrl}

IMAGEM
${absoluteImageUrl}

MEUS DADOS
Nome: ${name}
WhatsApp: ${customerWhatsapp}
E-mail: ${email}
Instagram: ${
        instagram ||
        "Não informado"
      }

MENSAGEM
${
        message ||
        "Nenhuma observação adicional."
      }
      `.trim();

      const generatedWhatsappUrl =
        `https://wa.me/${studioWhatsapp}` +
        `?text=${encodeURIComponent(
          whatsappMessage,
        )}`;

      setWhatsappUrl(
        generatedWhatsappUrl,
      );

      /*
       * =========================================
       * SUCESSO
       * =========================================
       */

      setSubmitted(true);
    } catch (requestError) {
      console.error(
        "Erro ao criar solicitação:",
        requestError,
      );

      setError(
        "Não foi possível registrar sua solicitação. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * =========================================
   * SUCESSO
   * =========================================
   */

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-8">
        <p className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase">
          SOLICITAÇÃO ENVIADA
        </p>

        <h2 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
          RECEBEMOS SEU INTERESSE
        </h2>

        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/60">
          Sua solicitação para{" "}
          <strong className="text-white">
            {itemName}
          </strong>{" "}
          foi registrada no AYŌ Studio.
        </p>

        {requestId !== null && (
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/60">
            Número do pedido:{" "}
            <strong className="text-white">
              #{requestId}
            </strong>
          </p>
        )}

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          O envio não representa confirmação
          automática de reserva, compra ou
          agendamento.
        </p>

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          O Studio analisará sua solicitação e
          entrará em contato para confirmar os
          próximos passos.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-ayo-red text-ayo-cream mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 font-sans text-sm font-bold transition hover:-translate-y-0.5 hover:scale-[1.02] sm:w-auto"
          >
            CONTINUAR NO WHATSAPP
          </a>
        )}
      </div>
    );
  }

  /*
   * =========================================
   * FORMULÁRIO
   * =========================================
   */

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6 md:p-8"
    >
      {/*
       * =========================================
       * HONEYPOT
       * =========================================
       */}

      <div
        aria-hidden="true"
        className="absolute -top-[9999px] -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="_gotcha">
          Não preencha este campo
        </label>

        <input
          id="_gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/*
       * =========================================
       * ITEM
       * =========================================
       */}

      <div className="border-b border-white/10 pb-6">
        <p className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase">
          {itemType === "flash"
            ? "SOLICITAÇÃO DE FLASH"
            : itemType === "arte"
              ? "SOLICITAÇÃO DE ARTE"
              : "SOLICITAÇÃO DE PRODUTO"}
        </p>

        <h1 className="font-title mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
          {itemName}
        </h1>

        <p className="mt-2 font-sans text-sm text-white/50">
          por {artistName}
        </p>

        {price !== null && (
          <p className="text-ayo-cream mt-3 font-sans text-lg font-semibold">
            {price.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              },
            )}
          </p>
        )}
      </div>

      {/*
       * =========================================
       * CAMPOS
       * =========================================
       */}

      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="font-sans text-sm text-white/70"
          >
            Nome
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="focus:border-ayo-red mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="whatsapp"
            className="font-sans text-sm text-white/70"
          >
            WhatsApp
          </label>

          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            className="focus:border-ayo-red mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-sans text-sm text-white/70"
          >
            E-mail
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="focus:border-ayo-red mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="instagram"
            className="font-sans text-sm text-white/70"
          >
            Instagram
          </label>

          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder="@usuario"
            autoComplete="off"
            className="focus:border-ayo-red mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none"
          />
        </div>
      </div>

      {/*
       * =========================================
       * MENSAGEM
       * =========================================
       */}

      <div className="mt-5">
        <label
          htmlFor="message"
          className="font-sans text-sm text-white/70"
        >
          Mensagem
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={
            itemType === "flash"
              ? "Conte sobre tamanho, local da tatuagem ou alguma dúvida."
              : itemType === "arte"
                ? "Conte sobre seu interesse na obra ou alguma dúvida."
                : "Conte sobre seu interesse no produto ou alguma dúvida."
          }
          className="focus:border-ayo-red mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none"
        />
      </div>

      {/*
       * =========================================
       * BOTÃO
       * =========================================
       */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full px-8 font-sans text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting
          ? "ENVIANDO..."
          : "ENVIAR SOLICITAÇÃO"}
      </button>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="text-ayo-red mt-4 font-sans text-sm"
        >
          {error}
        </p>
      )}

      <p className="mt-4 max-w-2xl font-sans text-xs leading-relaxed text-white/35">
        O envio deste formulário não confirma
        automaticamente reserva, venda ou horário.
        O Studio entrará em contato para confirmar.
      </p>
    </form>
  );
}