/**
 * Artwork used on the page. All are public domain (CC0) from the Cleveland
 * Museum of Art Open Access collection: free for commercial use, no credit
 * required (we credit anyway in captions and the footer).
 */
export type Art = { src: string; alt: string; caption: string; source: string; width: number; height: number };

export const ART = {
  waitingForMoon: {
    src: "/images/art/waiting-for-the-moon.webp",
    alt: "Tranh thủy mặc: một người đứng giữa rừng thông chờ trăng lên",
    caption: "Tra Sĩ Tiêu, Sĩ Tiêu chờ trăng (1684)",
    source: "https://clevelandart.org/art/1955.37.12",
    width: 1800,
    height: 1421,
  },
  risingClouds: {
    src: "/images/art/scholar-rising-clouds.webp",
    alt: "Tranh quạt tròn: một người nằm bên sườn núi ngắm mây lên",
    caption: "Mã Lân, Nằm ngắm mây lên (khoảng 1256)",
    source: "https://clevelandart.org/art/1961.421.1",
    width: 1100,
    height: 1286,
  },
  mistyScreen: {
    src: "/images/art/misty-landscape-screen.webp",
    alt: "",
    caption: "Bình phong sơn thủy, Nhật Bản (thế kỷ 16)",
    source: "https://clevelandart.org/art/1964.279.2",
    width: 2400,
    height: 1106,
  },
  bambooMoon: {
    src: "/images/art/bamboo-in-moonlight.webp",
    alt: "Tranh trúc dưới trăng tròn",
    caption: "Trúc dưới trăng, Triều Tiên (thế kỷ 16)",
    source: "https://clevelandart.org/art/1987.186",
    width: 700,
    height: 1764,
  },
} satisfies Record<string, Art>;
