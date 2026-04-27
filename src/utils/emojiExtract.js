export function getTrailingEmoji(str) {
  if (!str) return "";

  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  const segments = [...segmenter.segment(str)];

  return segments.at(-1)?.segment || "";
}