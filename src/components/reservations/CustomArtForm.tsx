"use client";

import { useEffect, useRef, useState } from "react";

import { createStudioRequest } from "@/lib/api/requests";

type CustomArtFormProps = {
  artistId: number;
  artistName: string;
  artistSlug: string;
};

export function CustomArtForm({
  artistId,
  artistName,
  artistSlug,
}: CustomArtFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

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
    const formData = new FormData(form);

    /*
     * =========================================================
     * ANTISPAM
     * =========================================================
     */

    if (String(formData.get("_gotcha") ?? "").trim()) {
      setSubmitted(true);
      return;
    }

    if (
      formStartedAt.current === null ||
      Date.now() - formStartedAt.current < 2000
    ) {
      setError("Aguarde alguns segundos antes de enviar.");
      return;
    }

    /*
     * =========================================================
     * DADOS DO FORMULÁRIO
     * =========================================================
     */

    const name = String(formData.get("name") ?? "").trim();
    const customerWhatsapp = String(
      formData.get("whatsapp") ?? "",
    ).trim();
    const email = String(formData.get("email") ?? "").trim();
    const instagram = String(formData.get("instagram") ?? "").trim();

    const artType = String(formData.get("artType") ?? "").trim();
    const idea = String(formData.get("idea") ?? "").trim();
    const size = String(formData.get("size") ?? "").trim();
    const orientation = String(
      formData.get("orientation") ?? "",
    ).trim();
    const style = String(formData.get("style") ?? "").trim();
    const color = String(formData.get("color") ?? "").trim();
    const use = String(formData.get("use") ?? "").trim();
    const deadline = String(formData.get("deadline") ?? "").trim();
    const referenceUrl = String(
      formData.get("referenceUrl") ?? "",
    ).trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!name || !customerWhatsapp || !email || !artType || !idea) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    /*
     * =========================================================
     * CONFIGURAÇÕES OPCIONAIS
     * =========================================================
     */

    const formspreeEndpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    const studioWhatsapp =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const submissionId =
      typeof crypto !== "undefined" &&
      "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const origin = window.location.origin;
    const artistUrl = `${origin}/artistas/${artistSlug}`;

    setIsSubmitting(true);
    setError(null);

    try {
      /*
       * =========================================================
       * 1. BANCO DE DADOS
       * =========================================================
       */

      const studioRequest = await createStudioRequest({
        type: "ART_CUSTOM",

        name,
        whatsapp: customerWhatsapp,
        email,

        instagram: instagram || null,
        message: idea,

        professionalId: artistId,

        details: {
          artType,
          idea,

          size,
          orientation,
          style,
          color,
          use,
          deadline,
          referenceUrl,
          notes,

          artistName,
          artistSlug,
        },
      });

      /*
       * =========================================================
       * 2. FORMSPREE
       * =========================================================
       *
       * Formspree continua sendo uma notificação auxiliar.
       * O banco é a fonte principal da solicitação.
       */

      if (formspreeEndpoint) {
        const notificationData = new FormData();

        notificationData.set(
          "_subject",
          `Pedido #${studioRequest.id} de arte para ${artistName}`,
        );

        notificationData.set(
          "tipo",
          "Pedido de arte personalizada",
        );

        notificationData.set(
          "pedidoId",
          String(studioRequest.id),
        );

        notificationData.set("nome", name);
        notificationData.set(
          "whatsapp",
          customerWhatsapp,
        );
        notificationData.set("email", email);
        notificationData.set(
          "instagram",
          instagram || "",
        );

        notificationData.set("artista", artistName);
        notificationData.set("artistaSlug", artistSlug);
        notificationData.set(
          "paginaDoArtista",
          artistUrl,
        );

        notificationData.set("artType", artType);
        notificationData.set("idea", idea);
        notificationData.set("size", size);
        notificationData.set(
          "orientation",
          orientation,
        );
        notificationData.set("style", style);
        notificationData.set("color", color);
        notificationData.set("use", use);
        notificationData.set(
          "deadline",
          deadline,
        );
        notificationData.set(
          "referenceUrl",
          referenceUrl,
        );
        notificationData.set("notes", notes);

        notificationData.set(
          "submissionId",
          submissionId,
        );

        notificationData.set(
          "origem",
          "Site AYŌ Studio",
        );

        /*
         * O Formspree é secundário.
         * Se falhar, o pedido já está salvo no banco.
         */

        try {
          await fetch(formspreeEndpoint, {
            method: "POST",
            body: notificationData,
            headers: {
              Accept: "application/json",
            },
          });
        } catch {
          console.warn(
            "Pedido salvo no banco, mas a notificação do Formspree falhou.",
          );
        }
      }

      /*
       * =========================================================
       * 3. WHATSAPP
       * =========================================================
       */

      if (studioWhatsapp) {
        const message = `
Olá! Enviei um pedido de arte personalizada pelo site do AYŌ Studio.

PEDIDO
#${studioRequest.id}

ARTISTA
${artistName}

TIPO DE ARTE
${artType}

IDEIA
${idea}

TAMANHO
${size || "Não informado"}

ORIENTAÇÃO
${orientation || "Não informada"}

ESTILO
${style || "Não informado"}

COR
${color || "Não informada"}

USO
${use || "Não informado"}

PRAZO
${deadline || "Não informado"}

REFERÊNCIA
${referenceUrl || "Não informada"}

OBSERVAÇÕES
${notes || "Nenhuma"}

MEUS DADOS
Nome: ${name}
WhatsApp: ${customerWhatsapp}
E-mail: ${email}
Instagram: ${instagram || "Não informado"}
        `.trim();

        setWhatsappUrl(
          `https://wa.me/${studioWhatsapp}?text=${encodeURIComponent(
            message,
          )}`,
        );
      }

      setSubmitted(true);
    } catch (requestError) {
      console.error(
        "Erro ao criar solicitação de arte:",
        requestError,
      );

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível enviar seu pedido. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-base text-white outline-none transition placeholder:text-white/25 focus:border-ayo-red";

  /*
   * =========================================================
   * SUCESSO
   * =========================================================
   */

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-8">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          PEDIDO ENVIADO
        </p>

        <h2 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
          RECEBEMOS SUA IDEIA
        </h2>

        <p className="mt-5 font-sans text-sm leading-relaxed text-white/60 sm:text-base">
          Seu pedido foi registrado no AYŌ Studio com
          interesse em desenvolver a obra com {artistName}.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:bg-ayo-red/85 sm:w-auto"
          >
            CONTINUAR NO WHATSAPP
          </a>
        )}
      </div>
    );
  }

  /*
   * =========================================================
   * FORMULÁRIO
   * =========================================================
   */

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6 md:p-8"
    >
      {/* Honeypot */}
      <div className="absolute -top-[9999px] -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">
          Não preencha
        </label>

        <input
          id="_gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
        ARTE PERSONALIZADA
      </p>

      <h1 className="font-title mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
        CRIAR COM {artistName.toUpperCase()}
      </h1>

      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        <Field label="Nome *" id="name">
          <input
            id="name"
            name="name"
            required
            className={inputClass}
          />
        </Field>

        <Field label="WhatsApp *" id="whatsapp">
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            className={inputClass}
          />
        </Field>

        <Field label="E-mail *" id="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Instagram" id="instagram">
          <input
            id="instagram"
            name="instagram"
            className={inputClass}
          />
        </Field>

        <Field
          label="O que você quer criar? *"
          id="artType"
        >
          <select
            id="artType"
            name="artType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option
              value=""
              className="bg-[#090909]"
            >
              Selecione
            </option>

            <option
              value="Quadro"
              className="bg-[#090909]"
            >
              Quadro
            </option>

            <option
              value="Desenho"
              className="bg-[#090909]"
            >
              Desenho
            </option>

            <option
              value="Ilustração"
              className="bg-[#090909]"
            >
              Ilustração
            </option>

            <option
              value="Outro"
              className="bg-[#090909]"
            >
              Outro
            </option>
          </select>
        </Field>

        <Field
          label="Tamanho aproximado"
          id="size"
        >
          <input
            id="size"
            name="size"
            placeholder="Ex.: A3, 50x70 cm..."
            className={inputClass}
          />
        </Field>

        <Field
          label="Orientação"
          id="orientation"
        >
          <select
            id="orientation"
            name="orientation"
            defaultValue=""
            className={inputClass}
          >
            <option
              value=""
              className="bg-[#090909]"
            >
              Selecione
            </option>

            <option
              value="Retrato"
              className="bg-[#090909]"
            >
              Retrato
            </option>

            <option
              value="Paisagem"
              className="bg-[#090909]"
            >
              Paisagem
            </option>

            <option
              value="Quadrado"
              className="bg-[#090909]"
            >
              Quadrado
            </option>

            <option
              value="Ainda não sei"
              className="bg-[#090909]"
            >
              Ainda não sei
            </option>
          </select>
        </Field>

        <Field
          label="Estilo desejado"
          id="style"
        >
          <input
            id="style"
            name="style"
            placeholder="Ex.: realista, anime..."
            className={inputClass}
          />
        </Field>

        <Field label="Cor" id="color">
          <select
            id="color"
            name="color"
            defaultValue=""
            className={inputClass}
          >
            <option
              value=""
              className="bg-[#090909]"
            >
              Selecione
            </option>

            <option
              value="Colorido"
              className="bg-[#090909]"
            >
              Colorido
            </option>

            <option
              value="Preto e branco"
              className="bg-[#090909]"
            >
              Preto e branco
            </option>

            <option
              value="Ainda não sei"
              className="bg-[#090909]"
            >
              Ainda não sei
            </option>
          </select>
        </Field>

        <Field
          label="Uso da obra"
          id="use"
        >
          <select
            id="use"
            name="use"
            defaultValue=""
            className={inputClass}
          >
            <option
              value=""
              className="bg-[#090909]"
            >
              Selecione
            </option>

            <option
              value="Pessoal"
              className="bg-[#090909]"
            >
              Pessoal
            </option>

            <option
              value="Presente"
              className="bg-[#090909]"
            >
              Presente
            </option>

            <option
              value="Comercial"
              className="bg-[#090909]"
            >
              Comercial
            </option>

            <option
              value="Outro"
              className="bg-[#090909]"
            >
              Outro
            </option>
          </select>
        </Field>

        <Field
          label="Prazo desejado"
          id="deadline"
        >
          <input
            id="deadline"
            name="deadline"
            placeholder="Ex.: até dezembro"
            className={inputClass}
          />
        </Field>

        <Field
          label="Link de referência"
          id="referenceUrl"
        >
          <input
            id="referenceUrl"
            name="referenceUrl"
            type="url"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <label
          htmlFor="idea"
          className="font-sans text-sm text-white/70"
        >
          Descreva sua ideia *
        </label>

        <textarea
          id="idea"
          name="idea"
          rows={5}
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="notes"
          className="font-sans text-sm text-white/70"
        >
          Observações
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:bg-ayo-red/85 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting
          ? "ENVIANDO..."
          : "ENVIAR PEDIDO"}
      </button>

      {error && (
        <p
          className="mt-4 font-sans text-sm text-ayo-red"
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-sans text-sm text-white/70"
      >
        {label}
      </label>

      {children}
    </div>
  );
}