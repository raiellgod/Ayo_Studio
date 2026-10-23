
    
  
import Link from "next/link";

export default function CustomOrderPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA O INÍCIO
        </Link>

        <header className="mt-10 max-w-3xl sm:mt-14">
          <p className="font-accent text-xs tracking-[0.14em] text-ayo-red uppercase sm:text-sm">
            PEDIDO PERSONALIZADO
          </p>

          <h1 className="font-title mt-4 text-5xl leading-[0.9] text-ayo-cream sm:text-6xl lg:text-7xl">
            O QUE VOCÊ QUER CRIAR?
          </h1>

          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/60 sm:text-base">
            Escolha o tipo de projeto e depois conte sua ideia para um dos profissionais do AYŌ Studio.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <OrderCard
            href="/pedido/tatuagem"
            eyebrow="TATUAGEM PERSONALIZADA"
            title="QUERO UMA TATUAGEM"
            description="Desenvolva uma ideia exclusiva com um tatuador do Studio."
          />

          <OrderCard
            href="/pedido/arte"
            eyebrow="QUADRO OU DESENHO"
            title="QUERO UMA ARTE"
            description="Peça uma obra personalizada, desenho ou ilustração autoral."
          />

          <OrderCard
            href="/pedido/dublagem"
            eyebrow="DUBLAGEM E VOZ"
            title="QUERO UMA DUBLAGEM"
            description="Solicite dublagem, locução, narração ou voz para seu projeto."
          />
        </div>

        <p className="mt-8 max-w-2xl font-sans text-xs leading-relaxed text-white/30">
          O envio do pedido não representa orçamento, aprovação do projeto, agendamento ou contratação automática.
        </p>
      </div>
    </main>
  );
}

function OrderCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-black/25 p-6 transition hover:border-ayo-red/40 hover:bg-black/35 sm:p-8"
    >
      <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
        {eyebrow}
      </p>

      <h2 className="font-title mt-3 text-4xl leading-none text-ayo-cream sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 font-sans text-sm leading-relaxed text-white/50">
        {description}
      </p>

      <span className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-ayo-red px-7 font-sans text-sm font-bold text-ayo-cream transition group-hover:-translate-y-0.5 group-hover:bg-ayo-red/85">
        COMEÇAR PEDIDO
      </span>
    </Link>
  );
}

