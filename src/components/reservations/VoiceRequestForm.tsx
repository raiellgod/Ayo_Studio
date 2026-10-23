"use client";

import { useEffect, useRef, useState } from "react";

type VoiceRequestFormProps = {
  artistName: string;
  artistSlug: string;
};

export function VoiceRequestForm({
  artistName,
  artistSlug,
}: VoiceRequestFormProps) {
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

    if (isSubmitting) return;

    const endpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    const studioWhatsapp =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!endpoint || !studioWhatsapp) {
      setError("O formulário ainda não foi configurado.");
      return;
    }

    const formData = new FormData(event.currentTarget);

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

    const name = String(formData.get("name") ?? "");
    const customerWhatsapp = String(
      formData.get("whatsapp") ?? "",
    );
    const email = String(formData.get("email") ?? "");
    const instagram = String(
      formData.get("instagram") ?? "",
    );

    const projectType = String(
      formData.get("projectType") ?? "",
    );
    const projectName = String(
      formData.get("projectName") ?? "",
    );
    const voiceDescription = String(
      formData.get("voiceDescription") ?? "",
    );
    const estimatedLength = String(
      formData.get("estimatedLength") ?? "",
    );
    const usage = String(formData.get("usage") ?? "");
    const deadline = String(
      formData.get("deadline") ?? "",
    );
    const scriptUrl = String(
      formData.get("scriptUrl") ?? "",
    );
    const referenceUrl = String(
      formData.get("referenceUrl") ?? "",
    );
    const notes = String(formData.get("notes") ?? "");

    const submissionId =
      typeof crypto !== "undefined" &&
      "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;

    const origin = window.location.origin;
    const artistUrl =
      `${origin}/artistas/${artistSlug}`;

    formData.set(
      "tipo",
      "Pedido de dublagem",
    );
    formData.set("artista", artistName);
    formData.set("artistaSlug", artistSlug);
    formData.set(
      "paginaDoArtista",
      artistUrl,
    );
    formData.set(
      "submissionId",
      submissionId,
    );
    formData.set(
      "origem",
      "Site AYŌ Studio",
    );
    formData.set(
      "_subject",
      `Novo pedido de dublagem para ${artistName}`,
    );

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      const message = `
Olá! Enviei um pedido de dublagem pelo site do AYŌ Studio.

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

Código:
${submissionId}
      `.trim();

      setWhatsappUrl(
        `https://wa.me/${studioWhatsapp}?text=${encodeURIComponent(
          message,
        )}`,
      );

      setSubmitted(true);
    } catch {
      setError(
        "Não foi possível enviar seu pedido. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-base text-white outline-none transition placeholder:text-white/25 focus:border-ayo-red";

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-8">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          PEDIDO ENVIADO
        </p>

        <h2 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
          RECEBEMOS SEU PROJETO
        </h2>

        <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/60 sm:text-base">
          Seu pedido foi enviado ao AYŌ Studio com interesse em trabalhar com{" "}
          <strong className="text-white">
            {artistName}
          </strong>
          .
        </p>

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          O envio não representa orçamento, aceite do projeto ou contratação automática.
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
        Conte sobre o projeto, personagem ou voz que você precisa. O Studio entrará em contato para alinhar disponibilidade, orçamento e entrega.
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
            <option value="Dublagem de personagem" className="bg-[#090909]">
              Dublagem de personagem
            </option>
            <option value="Locução" className="bg-[#090909]">
              Locução
            </option>
            <option value="Narração" className="bg-[#090909]">
              Narração
            </option>
            <option value="Vídeo / conteúdo" className="bg-[#090909]">
              Vídeo / conteúdo
            </option>
            <option value="Game" className="bg-[#090909]">
              Game
            </option>
            <option value="Animação" className="bg-[#090909]">
              Animação
            </option>
            <option value="Publicidade" className="bg-[#090909]">
              Publicidade
            </option>
            <option value="Outro" className="bg-[#090909]">
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
            <option value="Pessoal" className="bg-[#090909]">
              Pessoal
            </option>
            <option value="Comercial" className="bg-[#090909]">
              Comercial
            </option>
            <option value="Redes sociais" className="bg-[#090909]">
              Redes sociais
            </option>
            <option value="Game" className="bg-[#090909]">
              Game
            </option>
            <option value="Animação" className="bg-[#090909]">
              Animação
            </option>
            <option value="Publicidade" className="bg-[#090909]">
              Publicidade
            </option>
            <option value="Outro" className="bg-[#090909]">
              Outro
            </option>
          </select>
        </Field>

        <Field label="Prazo desejado" id="deadline">
          <input
            id="deadline"
            name="deadline"
            placeholder="Ex.: até 20/12"
            className={inputClass}
          />
        </Field>

        <Field label="Link do roteiro" id="scriptUrl">
          <input
            id="scriptUrl"
            name="scriptUrl"
            type="url"
            placeholder="Drive, Docs, PDF..."
            className={inputClass}
          />
        </Field>

        <Field label="Link de referência" id="referenceUrl">
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
