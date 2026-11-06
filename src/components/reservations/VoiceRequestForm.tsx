"use client";

import { useEffect, useRef, useState } from "react";

import { createStudioRequest } from "@/lib/api/requests";

type VoiceRequestFormProps = {
  artistId: number;
  artistName: string;
  artistSlug: string;
};

export function VoiceRequestForm({
  artistId,
  artistName,
  artistSlug,
}: VoiceRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<number | null>(null);

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
     * Honeypot anti-spam.
     *
     * Para bots, simulamos sucesso sem gravar nada.
     */
    if (String(formData.get("_gotcha") ?? "").trim()) {
      setSubmitted(true);
      return;
    }

    /*
     * Evita envio automatizado imediatamente
     * após o carregamento da página.
     */
    if (
      formStartedAt.current === null ||
      Date.now() - formStartedAt.current < 2000
    ) {
      setError("Aguarde alguns segundos antes de enviar.");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const customerWhatsapp = String(
      formData.get("whatsapp") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const instagram = String(
      formData.get("instagram") ?? "",
    ).trim();

    const projectType = String(
      formData.get("projectType") ?? "",
    ).trim();

    const projectName = String(
      formData.get("projectName") ?? "",
    ).trim();

    const voiceDescription = String(
      formData.get("voiceDescription") ?? "",
    ).trim();

    const estimatedLength = String(
      formData.get("estimatedLength") ?? "",
    ).trim();

    const usage = String(
      formData.get("usage") ?? "",
    ).trim();

    const deadline = String(
      formData.get("deadline") ?? "",
    ).trim();

    const scriptUrl = String(
      formData.get("scriptUrl") ?? "",
    ).trim();

    const referenceUrl = String(
      formData.get("referenceUrl") ?? "",
    ).trim();

    const notes = String(
      formData.get("notes") ?? "",
    ).trim();

    setIsSubmitting(true);
    setError(null);

    try {
      /*
       * ============================================================
       * 1. BANCO DE DADOS
       * ============================================================
       *
       * Esta é a fonte oficial da solicitação.
       */
      const studioRequest = await createStudioRequest({
        type: "VOICE_CUSTOM",

        name,
        whatsapp: customerWhatsapp,
        email,

        instagram: instagram || null,
        message: notes || null,

        professionalId: artistId,

        details: {
          projectType,
          projectName,
          voiceDescription,
          estimatedLength,
          usage,
          deadline,
          scriptUrl,
          referenceUrl,
        },
      });

      setRequestId(studioRequest.id);

      /*
       * ============================================================
       * 2. FORMSPREE
       * ============================================================
       *
       * Agora funciona apenas como notificação auxiliar.
       *
       * Se o Formspree falhar, o pedido NÃO é perdido porque já
       * existe no PostgreSQL.
       */
      const formspreeEndpoint =
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

      if (formspreeEndpoint) {
        const notificationData = new FormData();

        notificationData.set(
          "tipo",
          "Pedido de dublagem",
        );

        notificationData.set(
          "pedidoId",
          String(studioRequest.id),
        );

        notificationData.set(
          "artista",
          artistName,
        );

        notificationData.set(
          "artistaSlug",
          artistSlug,
        );

        notificationData.set(
          "name",
          name,
        );

        notificationData.set(
          "whatsapp",
          customerWhatsapp,
        );

        notificationData.set(
          "email",
          email,
        );

        notificationData.set(
          "instagram",
          instagram,
        );

        notificationData.set(
          "projectType",
          projectType,
        );

        notificationData.set(
          "projectName",
          projectName,
        );

        notificationData.set(
          "voiceDescription",
          voiceDescription,
        );

        notificationData.set(
          "estimatedLength",
          estimatedLength,
        );

        notificationData.set(
          "usage",
          usage,
        );

        notificationData.set(
          "deadline",
          deadline,
        );

        notificationData.set(
          "scriptUrl",
          scriptUrl,
        );

        notificationData.set(
          "referenceUrl",
          referenceUrl,
        );

        notificationData.set(
          "notes",
          notes,
        );

        notificationData.set(
          "origem",
          "Site AYŌ Studio",
        );

        notificationData.set(
          "paginaDoArtista",
          `${window.location.origin}/artistas/${artistSlug}`,
        );

        notificationData.set(
          "_subject",
          `Pedido #${studioRequest.id} de dublagem para ${artistName}`,
        );

        try {
          await fetch(formspreeEndpoint, {
            method: "POST",
            body: notificationData,
            headers: {
              Accept: "application/json",
            },
          });
        } catch {
          /*
           * Não interrompe o fluxo.
           *
           * O pedido já está salvo no PostgreSQL.
           */
        }
      }

      /*
       * ============================================================
       * 3. WHATSAPP
       * ============================================================
       *
       * Continuação opcional após o pedido ter sido registrado.
       */
      const studioWhatsapp =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

      if (studioWhatsapp) {
        const message = `
Olá! Enviei um pedido de dublagem pelo site do AYŌ Studio.

PEDIDO
#${studioRequest.id}

DUBLADOR
${artistName}

TIPO DE PROJETO
${projectType}

PROJETO / PERSONAGEM
${projectName || "Não informado"}

VOZ DESEJADA
${voiceDescription}

DURAÇÃO / QUANTIDADE DE FALAS
${estimatedLength || "Não informado"}

USO
${usage || "Não informado"}

PRAZO
${deadline || "Não informado"}

ROTEIRO
${scriptUrl || "Não informado"}

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

      form.reset();
    } catch (error) {
      console.error(
        "Erro ao criar pedido de dublagem:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seu pedido. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-base text-white outline-none transition placeholder:text-white/25 focus:border-ayo-red";

  /*
   * ==============================================================
   * SUCESSO
   * ==============================================================
   */

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-8">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          PEDIDO ENVIADO
        </p>

        <h2 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
          RECEBEMOS SEU PROJETO
        </h2>

        {requestId && (
          <div className="mt-5 inline-flex rounded-full border border-ayo-red/30 bg-ayo-red/10 px-4 py-2">
            <span className="font-sans text-xs font-semibold tracking-[0.08em] text-ayo-red uppercase">
              PEDIDO #{requestId}
            </span>
          </div>
        )}

        <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/60 sm:text-base">
          Seu pedido foi registrado no AYŌ Studio com interesse
          em trabalhar com{" "}
          <strong className="text-white">
            {artistName}
          </strong>
          .
        </p>

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          O envio não representa orçamento, aceite do projeto ou
          contratação automática. O Studio entrará em contato
          para alinhar os próximos passos.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:-translate-y-0.5 hover:bg-ayo-red/85 sm:w-auto"
          >
            CONTINUAR NO WHATSAPP
          </a>
        )}
      </div>
    );
  }

  /*
   * ==============================================================
   * FORMULÁRIO
   * ==============================================================
   */

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6 md:p-8"
    >
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
        PEDIDO DE DUBLAGEM
      </p>

      <h1 className="font-title mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
        CRIAR COM {artistName.toUpperCase()}
      </h1>

      <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
        Conte sobre o projeto, personagem ou voz que você precisa.
        O Studio entrará em contato para alinhar disponibilidade,
        orçamento e entrega.
      </p>

      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        <Field label="Nome *" id="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field label="WhatsApp *" id="whatsapp">
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </Field>

        <Field label="E-mail *" id="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
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
          label="Tipo de projeto *"
          id="projectType"
        >
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" className="bg-[#090909]">
              Selecione
            </option>

            <option
              value="Dublagem de personagem"
              className="bg-[#090909]"
            >
              Dublagem de personagem
            </option>

            <option
              value="Locução"
              className="bg-[#090909]"
            >
              Locução
            </option>

            <option
              value="Narração"
              className="bg-[#090909]"
            >
              Narração
            </option>

            <option
              value="Vídeo / conteúdo"
              className="bg-[#090909]"
            >
              Vídeo / conteúdo
            </option>

            <option
              value="Game"
              className="bg-[#090909]"
            >
              Game
            </option>

            <option
              value="Animação"
              className="bg-[#090909]"
            >
              Animação
            </option>

            <option
              value="Publicidade"
              className="bg-[#090909]"
            >
              Publicidade
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
          label="Projeto / personagem"
          id="projectName"
        >
          <input
            id="projectName"
            name="projectName"
            placeholder="Nome do projeto ou personagem"
            className={inputClass}
          />
        </Field>

        <Field
          label="Duração ou quantidade de falas"
          id="estimatedLength"
        >
          <input
            id="estimatedLength"
            name="estimatedLength"
            placeholder="Ex.: 30 segundos, 20 falas..."
            className={inputClass}
          />
        </Field>

        <Field label="Uso" id="usage">
          <select
            id="usage"
            name="usage"
            defaultValue=""
            className={inputClass}
          >
            <option value="" className="bg-[#090909]">
              Selecione
            </option>

            <option
              value="Pessoal"
              className="bg-[#090909]"
            >
              Pessoal
            </option>

            <option
              value="Comercial"
              className="bg-[#090909]"
            >
              Comercial
            </option>

            <option
              value="Redes sociais"
              className="bg-[#090909]"
            >
              Redes sociais
            </option>

            <option
              value="Game"
              className="bg-[#090909]"
            >
              Game
            </option>

            <option
              value="Animação"
              className="bg-[#090909]"
            >
              Animação
            </option>

            <option
              value="Publicidade"
              className="bg-[#090909]"
            >
              Publicidade
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
            placeholder="Ex.: até 20/12"
            className={inputClass}
          />
        </Field>

        <Field
          label="Link do roteiro"
          id="scriptUrl"
        >
          <input
            id="scriptUrl"
            name="scriptUrl"
            type="url"
            placeholder="Drive, Docs, PDF..."
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
            placeholder="Vídeo, áudio ou referência"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <label
          htmlFor="voiceDescription"
          className="font-sans text-sm text-white/70"
        >
          Como você imagina a voz? *
        </label>

        <textarea
          id="voiceDescription"
          name="voiceDescription"
          rows={5}
          required
          placeholder="Descreva tom, idade aparente, personalidade, energia, ritmo ou referências."
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
          placeholder="Informações adicionais sobre o projeto."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:-translate-y-0.5 hover:bg-ayo-red/85 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting
          ? "ENVIANDO..."
          : "ENVIAR PEDIDO"}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-4 font-sans text-sm text-ayo-red"
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