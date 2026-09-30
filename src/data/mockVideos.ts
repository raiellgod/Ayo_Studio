export type VideoItem = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;

  video: string;
  thumbnail: string;

  description: string;
};

export const mockVideos: VideoItem[] = [
  {
    id: 1,
    slug: "dublagem-01",
    name: "DUBLAGEM 01",

    artistId: 4,
    artistName: "ARTISTA 04",

    video: "/videos/video-01.mp4",
    thumbnail: "/videos/thumbnails/video-01.jpg",

    description:
      "Trecho de trabalho de dublagem e interpretação realizado pelo artista.",
  },
  {
    id: 2,
    slug: "dublagem-02",
    name: "DUBLAGEM 02",

    artistId: 4,
    artistName: "ARTISTA 04",

    video: "/videos/video-02.mp4",
    thumbnail: "/videos/thumbnails/video-02.jpg",

    description:
      "Trecho de trabalho de dublagem e interpretação realizado pelo artista.",
  },
  {
    id: 3,
    slug: "dublagem-03",
    name: "DUBLAGEM 03",

    artistId: 4,
    artistName: "ARTISTA 04",

    video: "/videos/video-03.mp4",
    thumbnail: "/videos/thumbnails/video-03.jpg",

    description:
      "Trecho de trabalho de dublagem e interpretação realizado pelo artista.",
  },
];