export type Artwork = {
  id: number;
  slug: string;
  name: string;
  artistName: string;
  image: string;
  type: string;
  price: number | null;
};

export const mockArtworks: Artwork[] = [
  {
    id: 1,
    slug: "noite-vermelha-01",
    name: "NOITE VERMELHA",
    artistName: "Kevin",
    image: "",
    type: "QUADRO",
    price: 450,
  },
  {
    id: 2,
    slug: "obra-02",
    name: "OBRA 02",
    artistName: "ARTISTA 02",
    image: "",
    type: "ILUSTRAÇÃO",
    price: 320,
  },
  {
    id: 3,
    slug: "obra-03",
    name: "OBRA 03",
    artistName: "ARTISTA 03",
    image: "",
    type: "DESENHO",
    price: 280,
  },
  {
    id: 4,
    slug: "obra-04",
    name: "OBRA 04",
    artistName: "ARTISTA 01",
    image: "",
    type: "QUADRO",
    price: 520,
  },
  {
    id: 5,
    slug: "obra-05",
    name: "OBRA 05",
    artistName: "ARTISTA 04",
    image: "",
    type: "ILUSTRAÇÃO",
    price: null,
  },
  {
    id: 6,
    slug: "obra-06",
    name: "OBRA 06",
    artistName: "ARTISTA 02",
    image: "",
    type: "QUADRO",
    price: 390,
  },
  {
    id: 7,
    slug: "obra-07",
    name: "OBRA 07",
    artistName: "ARTISTA 03",
    image: "",
    type: "DESENHO",
    price: 250,
  },
  {
    id: 8,
    slug: "obra-08",
    name: "OBRA 08",
    artistName: "ARTISTA 01",
    image: "",
    type: "ILUSTRAÇÃO",
    price: 310,
  },
  {
    id: 9,
    slug: "obra-09",
    name: "OBRA 09",
    artistName: "ARTISTA 04",
    image: "",
    type: "QUADRO",
    price: 600,
  },
  {
    id: 10,
    slug: "obra-10",
    name: "OBRA 10",
    artistName: "ARTISTA 02",
    image: "",
    type: "DESENHO",
    price: null,
  },
];