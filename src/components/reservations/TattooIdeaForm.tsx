"use client";

import { useEffect, useRef, useState } from "react";

type TattooIdeaFormProps = {
  artistName: string;
  artistSlug: string;
};

export function TattooIdeaForm({
  artistName,
  artistSlug,
}: TattooIdeaFormProps) {
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
    const endpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    const studioWhatsapp =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    const formData = new FormData(form);

    const honeypot = String(
      formData.get("_gotcha") ?? "",
    ).trim();

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (formStartedAt.current === null) {
      setError(
        "Aguarde alguns segundos antes de enviar a solicitação.",
      );
      return;
    }

    const elapsed =
      Date.now() - formStartedAt.current;

    if (elapsed < 2000) {
      setError(
        "Aguarde alguns segundos antes de enviar a solicitação.",
      );
      return;
    }

    if (!endpoint) {
      setError(
        "O formulário de contato ainda não foi configurado.",
      );
      return;
    }

    if (!studioWhatsapp) {
      setError(
        "O WhatsApp do Studio ainda não foi configurado.",
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const origin = window.location.origin;
    const artistUrl =
      `${origin}/artistas/${artistSlug}`;

    const name = String(
      formData.get("name") ?? "",
    );
    const customerWhatsapp = String(
      formData.get("whatsapp") ?? "",
    );
    const email = String(
      formData.get("email") ?? "",
    );
    const instagram = String(
      formData.get("instagram") ?? "",
    );
    const idea = String(
      formData.get("idea") ?? "",
    );
    const bodyArea = String(
      formData.get("bodyArea") ?? "",
    );
    const size = String(
      formData.get("size") ?? "",
    );
    const style = String(
      formData.get("style") ?? "",
    );
    const color = String(
      formData.get("color") ?? "",
    );
    const firstTattoo = String(
      formData.get("firstTattoo") ?? "",
    );
    const referenceUrl = String(
      formData.get("referenceUrl") ?? "",
    );
    const notes = String(
      formData.get("notes") ?? "",
    );

    const submissionId =
      typeof crypto !== "undefined" &&
      "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;

    const submittedAt =
      new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
      });

    formData.set(
      "tipo",
      "Pedido de ideia de tatuagem",
    );
    formData.set("artista", artistName);
    formData.set("artistaSlug", artistSlug);
    formData.set("paginaDoArtista", artistUrl);
    formData.set(
      "submissionId",
      submissionId,
    );
    formData.set(
      "enviadoEm",
      submittedAt,
    );
    formData.set(
      "origem",
      "Site AYŌ Studio",
    );
    formData.set(
      "_subject",
      `Nova ideia de tatuagem para ${artistName}`,
    );

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Não foi possível enviar a solicitação.",
        );
      }

      const whatsappMessage = `
Olá! Enviei uma ideia de tatuagem pelo site do AYŌ Studio.

ARTISTA
${artistName}

IDEIA
${idea}

LOCAL DO CORPO
${bodyArea}

TAMANHO
${size || "Não informado"}

ESTILO
${style || "Não informado"}

COR
${color || "Não informado"}

PRIMEIRA TATUAGEM
${firstTattoo || "Não informado"}

REFERÊNCIA
${referenceUrl || "Não informada"}

OBSERVAÇÕES
${notes || "Nenhuma observação adicional."}

MEUS DADOS
Nome: ${name}
WhatsApp: ${customerWhatsapp}
E-mail: ${email}
Instagram: ${instagram || "Não informado"}

PERFIL DO ARTISTA
${artistUrl}

Código da solicitação:
${submissionId}
      `.trim();

      setWhatsappUrl(
        `https://wa.me/${studioWhatsapp}?text=${encodeURIComponent(
          whatsappMessage,
        )}`,
      );

      setSubmitted(true);
    } catch {
      setError(
        "Não foi possível enviar sua ideia. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-8">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          IDEIA ENVIADA
        </p>

        <h2 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
          RECEBEMOS SUA IDEIA
        </h2>

        <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/60 sm:text-base">
          Sua ideia foi enviada ao AYŌ Studio com
          interesse em desenvolver o projeto com{" "}
          <strong className="text-white">
            {artistName}
          </strong>
          .
        </p>

        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/45">
          O envio não representa orçamento, aprovação
          do projeto ou agendamento automático.
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

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-base text-white transition outline-none placeholder:text-white/25 focus:border-ayo-red";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6 md:p-8"
    >
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

      <div className="border-b border-white/10 pb-6">
        <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
          IDEIA PERSONALIZADA
        </p>

        <h1 className="font-title mt-3 text-3xl leading-[0.95] text-white sm:text-4xl">
          CRIAR COM {artistName.toUpperCase()}
        </h1>

        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
          Conte sua ideia. O Studio entrará em contato
          para conversar sobre viabilidade, orçamento
          e próximos passos.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-sans text-sm text-white/70">
            Nome *
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="whatsapp" className="font-sans text-sm text-white/70">
            WhatsApp *
          </label>
          <input id="whatsapp" name="whatsapp" type="tel" required autoComplete="tel" placeholder="(11) 99999-9999" className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className="font-sans text-sm text-white/70">
            E-mail *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>

        <div>
          <label htmlFor="instagram" className="font-sans text-sm text-white/70">
            Instagram
          </label>
          <input id="instagram" name="instagram" type="text" placeholder="@usuario" autoComplete="off" className={inputClass} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="idea" className="font-sans text-sm text-white/70">
          Qual é a sua ideia? *
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={5}
          required
          placeholder="Descreva a tatuagem que você imagina, elementos importantes, significado, composição..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="bodyArea" className="font-sans text-sm text-white/70">
            Local do corpo *
          </label>
          <input id="bodyArea" name="bodyArea" type="text" required placeholder="Ex.: antebraço, costas..." className={inputClass} />
        </div>

        <div>
          <label htmlFor="size" className="font-sans text-sm text-white/70">
            Tamanho aproximado
          </label>
          <input id="size" name="size" type="text" placeholder="Ex.: 10 cm, 20 cm..." className={inputClass} />
        </div>

        <div>
          <label htmlFor="style" className="font-sans text-sm text-white/70">
            Estilo desejado
          </label>
          <input id="style" name="style" type="text" placeholder="Ex.: blackwork, anime, fine line..." className={inputClass} />
        </div>

        <div>
          <label htmlFor="color" className="font-sans text-sm text-white/70">
            Cor
          </label>
          <select id="color" name="color" className={inputClass} defaultValue="">
            <option value="" className="bg-[#090909]">
              Selecione
            </option>
            <option value="Preto e cinza" className="bg-[#090909]">
              Preto e cinza
            </option>
            <option value="Colorido" className="bg-[#090909]">
              Colorido
            </option>
            <option value="Ainda não sei" className="bg-[#090909]">
              Ainda não sei
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="firstTattoo" className="font-sans text-sm text-white/70">
            É sua primeira tatuagem?
          </label>
          <select id="firstTattoo" name="firstTattoo" className={inputClass} defaultValue="">
            <option value="" className="bg-[#090909]">
              Selecione
            </option>
            <option value="Sim" className="bg-[#090909]">
              Sim
            </option>
            <option value="Não" className="bg-[#090909]">
              Não
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="referenceUrl" className="font-sans text-sm text-white/70">
            Link de referência
          </label>
          <input
            id="referenceUrl"
            name="referenceUrl"
            type="url"
            placeholder="Pinterest, Instagram, Drive..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className="font-sans text-sm text-white/70">
          Observações
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Disponibilidade, dúvidas ou qualquer informação adicional."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:-translate-y-0.5 hover:bg-ayo-red/85 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting
          ? "ENVIANDO..."
          : "ENVIAR MINHA IDEIA"}
      </button>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-4 font-sans text-sm text-ayo-red"
        >
          {error}
        </p>
      )}

      <p className="mt-4 max-w-2xl font-sans text-xs leading-relaxed text-white/35">
        O envio não confirma orçamento, desenho,
        agendamento ou reserva de horário.
      </p>
    </form>
  );
}
