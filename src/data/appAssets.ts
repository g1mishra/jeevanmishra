import type { ImageMetadata } from "astro";

/**
 * portfolio.ts names an app's icon and screenshots by file name, but Astro
 * needs the imported module to optimise an image. The folder is pulled in once
 * here so both the app layout and the app page can look files up by name.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/apps/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

export function appAsset(file?: string): ImageMetadata | undefined {
  return file ? files[`../assets/apps/${file}`]?.default : undefined;
}
