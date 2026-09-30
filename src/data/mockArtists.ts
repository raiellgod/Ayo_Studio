export type Artist = {
  id: number;
  slug: string;

  name: string;
  role: string;

  image: string;
  fullImage: string;
  profileImage: string;

  specialties: string;
  description: string;
};

export const mockArtists: Artist[] = [
  {
    id: 1,
    slug: "artista-01",

    name: "Kevin",
    role: "TATUADOR",

    image: "/artists/artist-01/card.png",
    fullImage: "/artists/artist-01/full.png",
    profileImage: "/artists/artist-01/full.png",

    specialties: "BLACKWORK • FINE LINE • AUTORAL",

    description:
      "Artista focado em trabalhos autorais, desenho e tatuagem. Este espaço recebe um texto curto sobre trajetória, referências, estilo e relação do artista com o estúdio.",
  },

  {
    id: 2,
    slug: "artista-02",

    name: "ARTISTA 02",
    role: "ARTISTA",

    image: "",
    fullImage: "",
    profileImage: "",

    specialties: "",
    description: "",
  },

  {
    id: 3,
    slug: "artista-03",

    name: "ARTISTA 03",
    role: "ARTISTA",

    image: "",
    fullImage: "",
    profileImage: "",

    specialties: "",
    description: "",
  },

  {
    id: 4,
    slug: "artista-04",

    name: "ARTISTA 04",
    role: "DUBLADOR",

    image: "",
    fullImage: "",
    profileImage: "",

    specialties: "",
    description: "",
  },
];