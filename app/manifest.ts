import type { MetadataRoute } from "next";
import { iconSizes } from "./icon";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Years Progress",
    short_name: "Years Progress",
    description: "A simple year progress tracker",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: iconSizes.map((iconSize) => ({
      src: ``,
      sizes: `${iconSize.size.width}x${iconSize.size.height}`,
      type: "image/png",
    })),
  };
}
