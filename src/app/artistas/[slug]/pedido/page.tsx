import Link from "next/link";
import { notFound } from "next/navigation";

import { mockArtists } from "@/data/mockArtists";

type ArtistOrderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const serviceConfig = {
  tattoo: {
    eyebrow: "TATUAGEM PERSONALIZADA",
    title: "PEDIR TATUAGEM",
    description:
      "Conte sua ideia, local do corpo, tamanho e referências para desenvolver o projeto com este artista.",
    href: (slug: string) => `/artistas/${slug}/ideia`,
  },

  art: {
    eyebrow: "QUADRO OU DESENHO",
    title: "PEDIR ARTE",
    description:
      "Solicite um quadro, desenho ou ilustração personalizada com este artista.",
    href: (slug: string) => `/pedido/arte/${slug}`,
  },

  voice: {
    eyebrow: "DUBLAGEM E VOZ",
    title: "PEDIR DUBLAGEM",
    description:
      "Envie seu projeto de dublagem, locução, narração ou voz diretamente para este profissional.",
    href: (slug: string) => `/pedido/dublagem/${slug}`,
  },
} as const;

export default async function ArtistOrderPage({
  params,
}: ArtistOrderPageProps) {
  const { slug } = await params;

  const artist = mockArtists.find(
    (item) => item.slug === slug,
  );

  if (!artist) {
    notFound();
  }

  const availableServices = artist.services
    .map((service) => ({
      service,
      config: serviceConfig[service],
    }))
    .filter((item) => item.config);

  return (
    <main
      className="
        min-h-screen
        bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)]
        px-5
        py-8
        text-white
        sm:px-6
        sm:py-10
        lg:px-12
      "
    >
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href={`/artistas/${artist.slug}`}
          className="
            inline-flex
            items-center
            gap-2
            font-sans
            text-sm
            text-white/60
            transition
            hover:text-white
          "
        >
          ← VOLTAR PARA O ARTISTA
        </Link>

        <header className="mt-10 max-w-3xl sm:mt-14">
          <p
            className="
              font-accent
              text-xs
              tracking-[0.14em]
              text-ayo-red
              uppercase
              sm:text-sm
            "
          >
            PEDIDO PARA {artist.name.toUpperCase()}
          </p>

          <h1
            className="
              font-title
              mt-4
              text-5xl
              leading-[0.9]
              text-ayo-cream
              sm:text-6xl
            "
          >
            O QUE VOCÊ QUER CRIAR?
          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              font-sans
              text-sm
              leading-relaxed
              text-white/55
              sm:text-base
            "
          >
            Escolha um dos serviços disponíveis para este profissional.
          </p>
        </header>

        {availableServices.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {availableServices.map(
              ({ service, config }) => (
                <Link
                  key={service}
                  href={config.href(artist.slug)}
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-black/25
                    p-6
                    transition
                    hover:border-ayo-red/40
                    hover:bg-black/35
                    sm:p-7
                  "
                >
                  <p
                    className="
                      font-accent
                      text-xs
                      tracking-[0.12em]
                      text-ayo-red
                      uppercase
                    "
                  >
                    {config.eyebrow}
                  </p>

                  <h2
                    className="
                      font-title
                      mt-3
                      text-4xl
                      leading-none
                      text-ayo-cream
                    "
                  >
                    {config.title}
                  </h2>

                  <p
                    className="
                      mt-5
                      font-sans
                      text-sm
                      leading-relaxed
                      text-white/50
                    "
                  >
                    {config.description}
                  </p>

                  <span
                    className="
                      mt-6
                      inline-flex
                      min-h-11
                      items-center
                      justify-center
                      rounded-full
                      bg-ayo-red
                      px-6
                      font-sans
                      text-xs
                      font-bold
                      text-ayo-cream
                      transition
                      group-hover:-translate-y-0.5
                      group-hover:bg-ayo-red/85
                    "
                  >
                    COMEÇAR PEDIDO
                  </span>
                </Link>
              ),
            )}
          </div>
        ) : (
          <div
            className="
              mt-10
              rounded-3xl
              border
              border-white/10
              bg-black/25
              p-6
              sm:p-8
            "
          >
            <p
              className="
                font-sans
                text-sm
                leading-relaxed
                text-white/55
              "
            >
              Este profissional não possui pedidos personalizados disponíveis no momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}