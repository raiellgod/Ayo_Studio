export type Product = {
  id: number;
  slug: string;
  name: string;
  type: string;
  image: string;
  price: number | null;
  available: boolean;
};

export const mockProducts: Product[] = [
  {
    id: 1,
    slug: "pokebola-gs",
    name: "POKÉBOLA GS",
    type: "PEÇA AUTORAL",
    image: "",
    price: 180,
    available: true,
  },
  {
    id: 2,
    slug: "produto-02",
    name: "PRODUTO 02",
    type: "PRINT",
    image: "",
    price: 80,
    available: true,
  },
  {
    id: 3,
    slug: "produto-03",
    name: "PRODUTO 03",
    type: "PEÇA AUTORAL",
    image: "",
    price: 220,
    available: true,
  },
  {
    id: 4,
    slug: "produto-04",
    name: "PRODUTO 04",
    type: "PRINT",
    image: "",
    price: 95,
    available: true,
  },
  {
    id: 5,
    slug: "produto-05",
    name: "PRODUTO 05",
    type: "PEÇA AUTORAL",
    image: "",
    price: null,
    available: true,
  },
  {
    id: 6,
    slug: "produto-06",
    name: "PRODUTO 06",
    type: "PRINT",
    image: "",
    price: 120,
    available: false,
  },
];