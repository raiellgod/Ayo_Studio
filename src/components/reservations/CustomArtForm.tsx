"use client";

import { useEffect, useRef, useState } from "react";

type CustomArtFormProps = {
  artistName: string;
  artistSlug: string;
};

export function CustomArtForm({
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
    const customerWhatsapp = String(formData.get("whatsapp") ?? "");
    const email = String(formData.get("email") ?? "");
    const instagram = String(formData.get("instagram") ?? "");
    const artType = String(formData.get("artType") ?? "");
    const idea = String(formData.get("idea") ?? "");
    const size = String(formData.get("size") ?? "");
    const orientation = String(formData.get("orientation") ?? "");
    const style = String(formData.get("style") ?? "");
    const color = String(formData.get("color") ?? "");
    const use = String(formData.get("use") ?? "");
    const deadline = String(formData.get("deadline") ?? "");
    const referenceUrl = String(formData.get("referenceUrl") ?? "");
    const notes = String(formData.get("notes") ?? "");

    const submissionId =
      typeof crypto !== "undefined" &&
      "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const origin = window.location.origin;
    const artistUrl = `${origin}/artistas/${artistSlug}`;

    formData.set("tipo", "Pedido de arte personalizada");
    formData.set("artista", artistName);
    formData.set("artistaSlug", artistSlug);
    formData.set("paginaDoArtista", artistUrl);
    formData.set("submissionId", submissionId);
    formData.set("origem", "Site AYŌ Studio");
    formData.set("_subject", `Novo pedido de arte para ${artistName}`);

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
Olá! Enviei um pedido de arte personalizada pelo site do AYŌ Studio.

ARTISTA
${artistName}

TIPO
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

Código:
${submissionId}
      `.trim();

      setWhatsappUrl(
        `https://wa.me/${studioWhatsapp}?text=${encodeURIComponent(message)}`,
      );

      setSubmitted(true);
    } catch {
      setError("Não foi possível enviar seu pedido. Tente novamente.");
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
          RECEBEMOS SUA IDEIA
        </h2>

        <p className="mt-5 font-sans text-sm leading-relaxed text-white/60 sm:text-base">
          Seu pedido foi enviado ao AYŌ Studio com interesse em desenvolver a
          obra com {artistName}.
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

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6 md:p-8"
    >
      <div className="absolute -top-[9999px] -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">Não preencha</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
        ARTE PERSONALIZADA
      </p>

      <h1 className="font-title mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
        CRIAR COM {artistName.toUpperCase()}
      </h1>

      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        <Field label="Nome *" id="name">
          <input id="name" name="name" required className={inputClass} />
        </Field>

        <Field label="WhatsApp *" id="whatsapp">
          <input id="whatsapp" name="whatsapp" type="tel" required className={inputClass} />
        </Field>

        <Field label="E-mail *" id="email">
          <input id="email" name="email" type="email" required className={inputClass} />
        </Field>

        <Field label="Instagram" id="instagram">
          <input id="instagram" name="instagram" className={inputClass} />
        </Field>

        <Field label="O que você quer criar? *" id="artType">
          <select id="artType" name="artType" required defaultValue="" className={inputClass}>
            <option value="" className="bg-[#090909]">Selecione</option>
            <option value="Quadro" className="bg-[#090909]">Quadro</option>
            <option value="Desenho" className="bg-[#090909]">Desenho</option>
            <option value="Ilustração" className="bg-[#090909]">Ilustração</option>
            <option value="Outro" className="bg-[#090909]">Outro</option>
          </select>
        </Field>

        <Field label="Tamanho aproximado" id="size">
          <input id="size" name="size" placeholder="Ex.: A3, 50x70 cm..." className={inputClass} />
        </Field>

        <Field label="Orientação" id="orientation">
          <select id="orientation" name="orientation" defaultValue="" className={inputClass}>
            <option value="" className="bg-[#090909]">Selecione</option>
            <option value="Retrato" className="bg-[#090909]">Retrato</option>
            <option value="Paisagem" className="bg-[#090909]">Paisagem</option>
            <option value="Quadrado" className="bg-[#090909]">Quadrado</option>
            <option value="Ainda não sei" className="bg-[#090909]">Ainda não sei</option>
          </select>
        </Field>

        <Field label="Estilo desejado" id="style">
          <input id="style" name="style" placeholder="Ex.: realista, anime..." className={inputClass} />
        </Field>

        <Field label="Cor" id="color">
          <select id="color" name="color" defaultValue="" className={inputClass}>
            <option value="" className="bg-[#090909]">Selecione</option>
            <option value="Colorido" className="bg-[#090909]">Colorido</option>
            <option value="Preto e branco" className="bg-[#090909]">Preto e branco</option>
            <option value="Ainda não sei" className="bg-[#090909]">Ainda não sei</option>
          </select>
        </Field>

        <Field label="Uso da obra" id="use">
          <select id="use" name="use" defaultValue="" className={inputClass}>
            <option value="" className="bg-[#090909]">Selecione</option>
            <option value="Pessoal" className="bg-[#090909]">Pessoal</option>
            <option value="Presente" className="bg-[#090909]">Presente</option>
            <option value="Comercial" className="bg-[#090909]">Comercial</option>
            <option value="Outro" className="bg-[#090909]">Outro</option>
          </select>
        </Field>

        <Field label="Prazo desejado" id="deadline">
          <input id="deadline" name="deadline" placeholder="Ex.: até dezembro" className={inputClass} />
        </Field>

        <Field label="Link de referência" id="referenceUrl">
          <input id="referenceUrl" name="referenceUrl" type="url" className={inputClass} />
        </Field>
      </div>

      <div className="mt-5">
        <label htmlFor="idea" className="font-sans text-sm text-white/70">
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
        <label htmlFor="notes" className="font-sans text-sm text-white/70">
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
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:bg-ayo-red/85 disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? "ENVIANDO..." : "ENVIAR PEDIDO"}
      </button>

      {error && (
        <p className="mt-4 font-sans text-sm text-ayo-red" role="alert">
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
      <label htmlFor={id} className="font-sans text-sm text-white/70">
        {label}
      </label>
      {children}
    </div>
  );
}
