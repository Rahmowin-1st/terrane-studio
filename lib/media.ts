const DEFAULT_WIDTHS = [480, 720, 960, 1280, 1600, 2000] as const;

export function imageAtWidth(src: string, width: number) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  try {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    return url.toString();
  } catch {
    return src;
  }
}

export function imageSrcSet(src: string, widths: readonly number[] = DEFAULT_WIDTHS) {
  if (!src.startsWith("https://images.unsplash.com/")) return undefined;
  return widths.map((width) => `${imageAtWidth(src, width)} ${width}w`).join(", ");
}
