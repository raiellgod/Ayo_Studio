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
    slug: "product-01",
    name: "ECOBAG AYŌ",
    type: "ACESSÓRIO",
    image: "/products/product-01.jpg",
    price: 79.9,
    available: true,
  },
  {
    id: 2,
    slug: "product-02",
    name: "CHAVEIRO AYŌ",
    type: "ACESSÓRIO",
    image: "/products/product-02.jpg",
    price: 35,
    available: true,
  },
  {
    id: 3,
    slug: "product-03",
    name: "CAMISETA AYŌ",
    type: "VESTUÁRIO",
    image: "/products/product-03.jpg",
    price: 89.9,
    available: true,
  },
  {
    id: 4,
    slug: "product-04",
    name: "QUADRO AYŌ",
    type: "DECORAÇÃO",
    image: "/products/product-04.jpg",
    price: 120,
    available: true,
  },
  {
    id: 5,
    slug: "product-05",
    name: "CANECA AYŌ",
    type: "UTILITÁRIO",
    image: "/products/product-05.jpg",
    price: 49.9,
    available: true,
  },

  // Produto de teste para estado indisponível.
  {
    id: 6,
    slug: "product-06",
    name: "PRODUTO 06",
    type: "PRINT",
    image: "/products/product-06.jpg",
    price: 120,
    available: false,
  },
];