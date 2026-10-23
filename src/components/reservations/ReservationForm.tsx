"use client";

import { useEffect, useRef, useState } from "react";

type ReservationFormProps = {
  itemType: "flash" | "arte";
  itemName: string;
  itemSlug: string;
  artistName: string;
  price: number | null;
  itemImage: string;
};

export function ReservationForm({
  itemType,
  itemName,
  itemSlug,
  artistName,
  price,
  itemImage,
}: ReservationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  /*
   * Marca quando o formulário foi carregado.
   *
   * Bots normalmente submetem formulários quase
   * instantaneamente.
   */
  const formStartedAt = useRef<number | null>(null);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    const studioWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const formData = new FormData(form);

    /* =========================================
       ANTI-SPAM 1 — HONEYPOT
    ========================================== */

    const honeypot = String(formData.get("_gotcha") ?? "").trim();

    if (honeypot) {
      /*
       * Não enviamos nada ao Formspree.
       *
       * Para o bot, simulamos sucesso para evitar
       * novas tentativas automáticas.
       */
      setSubmitted(true);

      return;
    }

    /* =========================================
       ANTI-SPAM 2 — TEMPO MÍNIMO
    ========================================== */

    if (formStartedAt.current === null) {
      setError("Aguarde alguns segundos antes de enviar a solicitação.");

      return;
    }

    const elapsed = Date.now() - formStartedAt.current;

    const minimumTime = 2000;

    if (elapsed < minimumTime) {
      setError("Aguarde alguns segundos antes de enviar a solicitação.");

      return;
    }

    /* =========================================
       CONFIGURAÇÃO
    ========================================== */

    if (!endpoint) {
      setError("O formulário de contato ainda não foi configurado.");

      return;
    }

    if (!studioWhatsapp) {
      setError("O WhatsApp do Studio ainda não foi configurado.");

      return;
    }

    setIsSubmitting(true);
    setError(null);

    /* =========================================
       URLS
    ========================================== */

    const origin = window.location.origin;

    const itemPath = itemType === "flash" ? `/flashes/${itemSlug}` : `/artes/${itemSlug}`;

    const itemUrl = `${origin}${itemPath}`;

    const absoluteImageUrl = itemImage.startsWith("http") ? itemImage : `${origin}${itemImage}`;

    /* =========================================
       PREÇO
    ========================================== */

    const formattedPrice =
      price !== null
        ? price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : "Consultar";

    /* =========================================
       IDENTIFICAÇÃO DA SOLICITAÇÃO
    ========================================== */

    const submissionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const submittedAt = new Date().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });

    /* =========================================
       DADOS DO ITEM
    ========================================== */

    formData.set("tipo", itemType === "flash" ? "Flash" : "Arte");

    formData.set("item", itemName);

    formData.set("slug", itemSlug);

    formData.set("artista", artistName);

    formData.set("valor", formattedPrice);

    formData.set("imagem", absoluteImageUrl);

    formData.set("paginaDoItem", itemUrl);

    /* =========================================
       DADOS TÉCNICOS
    ========================================== */

    formData.set("submissionId", submissionId);

    formData.set("enviadoEm", submittedAt);

    formData.set("origem", "Site AYŌ Studio");

    formData.set("_subject", `Nova solicitação AYŌ Studio - ${itemName}`);

    try {
      /* =========================================
         ENVIO PARA FORMSPREE
      ========================================== */

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível enviar a solicitação.");
      }

      /* =========================================
         DADOS DO CLIENTE
      ========================================== */

      const name = String(formData.get("name") ?? "");

      const customerWhatsapp = String(formData.get("whatsapp") ?? "");

      const email = String(formData.get("email") ?? "");

      const instagram = String(formData.get("instagram") ?? "");

      const message = String(formData.get("message") ?? "");

      /* =========================================
         WHATSAPP
      ========================================== */

      const whatsappMessage = `
Olá! Enviei uma solicitação pelo site do AYŌ Studio.

ITEM
${itemName}

Tipo: ${itemType === "flash" ? "Flash" : "Arte"}
Artista: ${artistName}
Valor: ${formattedPrice}

Ver página:
${itemUrl}

Ver imagem:
${absoluteImageUrl}

MEUS DADOS
Nome: ${name}
WhatsApp: ${customerWhatsapp}
E-mail: ${email}
Instagram: ${instagram || "Não informado"}

MENSAGEM
${message || "Nenhuma observação adicional."}

Código da solicitação:
${submissionId}
      `.trim();

      const generatedWhatsappUrl =
        `https://wa.me/${studioWhatsapp}` + `?text=${encodeURIComponent(whatsappMessage)}`;

      setWhatsappUrl(generatedWhatsappUrl);

      setSubmitted(true);
    } catch {
      setError("Não foi possível enviar a solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* =========================================
     SUCESSO
  ========================================== */

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-8">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          SOLICITAÇÃO ENVIADA
        </p>

        <h2 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">RECEBEMOS SEU INTERESSE</h2>

        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/60">
          Sua solicitação para <strong className="text-white">{itemName}</strong> foi enviada ao
          Studio.
        </p>

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          O Studio também recebeu o link da página e da imagem da arte selecionada.
        </p>

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          Você também pode continuar o atendimento pelo WhatsApp. A mensagem já estará preenchida
          com os dados da solicitação.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:-translate-y-0.5 hover:scale-[1.02] sm:w-auto"
          >
            CONTINUAR NO WHATSAPP
          </a>
        )}

        <p className="mt-5 max-w-xl font-sans text-xs leading-relaxed text-white/30">
          A solicitação não representa confirmação automática de reserva, venda ou horário.
        </p>
      </div>
    );
  }

  /* =========================================
     FORMULÁRIO
  ========================================== */

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6 md:p-8"
    >
      {/* =========================================
          HONEYPOT
      ========================================== */}

      <div
        aria-hidden="true"
        className="absolute -top-[9999px] -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="_gotcha">Não preencha este campo</label>

        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* =========================================
          ITEM
      ========================================== */}

      <div className="border-b border-white/10 pb-6">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          {itemType === "flash" ? "SOLICITAÇÃO DE FLASH" : "SOLICITAÇÃO DE ARTE"}
        </p>

        <h1 className="font-title mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">{itemName}</h1>

        <p className="mt-2 font-sans text-sm text-white/50">por {artistName}</p>

        {price !== null && (
          <p className="mt-3 font-sans text-lg font-semibold text-ayo-cream">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        )}
      </div>

      {/* =========================================
          CAMPOS
      ========================================== */}

      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-sans text-sm text-white/70">
            Nome
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none focus:border-ayo-red"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="font-sans text-sm text-white/70">
            WhatsApp
          </label>

          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none focus:border-ayo-red"
          />
        </div>

        <div>
          <label htmlFor="email" className="font-sans text-sm text-white/70">
            E-mail
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none focus:border-ayo-red"
          />
        </div>

        <div>
          <label htmlFor="instagram" className="font-sans text-sm text-white/70">
            Instagram
          </label>

          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder="@usuario"
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none focus:border-ayo-red"
          />
        </div>
      </div>

      {/* =========================================
          MENSAGEM
      ========================================== */}

      <div className="mt-5">
        <label htmlFor="message" className="font-sans text-sm text-white/70">
          Mensagem
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={
            itemType === "flash"
              ? "Conte sobre tamanho, local da tatuagem ou alguma dúvida."
              : "Conte sobre seu interesse na obra ou alguma dúvida."
          }
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white transition outline-none focus:border-ayo-red"
        />
      </div>

      {/* =========================================
          BOTÃO
      ========================================== */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:-translate-y-0.5 hover:bg-ayo-red/85 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO"}
      </button>

      {error && (
        <p role="alert" aria-live="polite" className="mt-4 font-sans text-sm text-ayo-red">
          {error}
        </p>
      )}

      <p className="mt-4 max-w-2xl font-sans text-xs leading-relaxed text-white/35">
        O envio deste formulário não confirma automaticamente reserva, venda ou horário. O Studio
        entrará em contato para confirmar.
      </p>
    </form>
  );
}
