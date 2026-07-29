import localFont from "next/font/local";

export const dmSans = localFont({
  src: [
    { path: "../../public/fonts/dmsans-thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/dmsans-thinitalic.ttf", weight: "100", style: "italic" },
    { path: "../../public/fonts/dmsans-extralight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/dmsans-extralightitalic.ttf", weight: "200", style: "italic" },
    { path: "../../public/fonts/dmsans-light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/dmsans-lightitalic.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/dmsans-regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/dmsans-italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/dmsans-medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/dmsans-mediumitalic.ttf", weight: "500", style: "italic" },
    { path: "../../public/fonts/dmsans-semibold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/dmsans-semibolditalic.ttf", weight: "600", style: "italic" },
    { path: "../../public/fonts/dmsans-bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/dmsans-bolditalic.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/dmsans-extrabold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/dmsans-extrabolditalic.ttf", weight: "800", style: "italic" },
    { path: "../../public/fonts/dmsans-black.ttf", weight: "900", style: "normal" },
    { path: "../../public/fonts/dmsans-blackitalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const sora = localFont({
  src: [
    { path: "../../public/fonts/sora-wght--thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/sora-wght--extralight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/sora-wght--light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/sora-wght--regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/sora-wght--medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/sora-wght--semibold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/sora-wght--bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/sora-wght--extrabold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
});