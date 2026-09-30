export type Artwork = {
  id: number;
  slug: string;
  name: string;
  artistId: number;
  artistName: string;
  image: string;
  type: string;
  price: number | null;
  available: boolean;
};

export const mockArtworks: Artwork[] = [
  {
    id: 1,
    slug: "noite-vermelha-01",
    name: "NOITE VERMELHA",

    artistId: 1,
    artistName: "Kevin",

    image: "/artworks/artwork-01.jpg",
    type: "QUADRO",
    price: 450,
    available: true,
  },
  {
    id: 2,
    slug: "obra-02",
    name: "OBRA 02",

    artistId: 2,
    artistName: "ARTISTA 02",

    image: "/artworks/artwork-02.jpg",
    type: "ILUSTRAÇÃO",
    price: 320,
    available: true,
  },
  {
    id: 3,
    slug: "obra-03",
    name: "OBRA 03",

    artistId: 3,
    artistName: "ARTISTA 03",

    image: "/artworks/artwork-03.jpg",
    type: "DESENHO",
    price: 280,
    available: true,
  },
  {
    id: 4,
    slug: "obra-04",
    name: "OBRA 04",

    artistId: 1,
    artistName: "ARTISTA 01",

    image: "/artworks/artwork-04.jpg",
    type: "QUADRO",
    price: 520,
    available: true,
  },
  {
    id: 5,
    slug: "obra-05",
    name: "OBRA 05",

    artistId: 4,
    artistName: "ARTISTA 04",

    image: "/artworks/artwork-05.jpg",
    type: "ILUSTRAÇÃO",
    price: null,
    available: true,
  },
  {
    id: 6,
    slug: "obra-06",
    name: "OBRA 06",

    artistId: 2,
    artistName: "ARTISTA 02",

    image: "/artworks/artwork-06.jpg",
    type: "QUADRO",
    price: 390,
    available: true,
  },
  {
    id: 7,
    slug: "obra-07",
    name: "OBRA 07",

    artistId: 3,
    artistName: "ARTISTA 03",

    image: "/artworks/artwork-07.jpg",
    type: "DESENHO",
    price: 250,
    available: true,
  },
  {
    id: 8,
    slug: "obra-08",
    name: "OBRA 08",

    artistId: 1,
    artistName: "ARTISTA 01",

    image: "/artworks/artwork-08.jpg",
    type: "ILUSTRAÇÃO",
    price: 310,
    available: true,
  },
  {
    id: 9,
    slug: "obra-09",
    name: "OBRA 09",

    artistId: 4,
    artistName: "ARTISTA 04",

    image: "/artworks/artwork-09.jpg",
    type: "QUADRO",
    price: 600,
    available: true,
  },
  {
    id: 10,
    slug: "obra-10",
    name: "OBRA 10",

    artistId: 2,
    artistName: "ARTISTA 02",

    image: "/artworks/artwork-10.jpg",
    type: "DESENHO",
    price: null,
    available: false,
  },
];