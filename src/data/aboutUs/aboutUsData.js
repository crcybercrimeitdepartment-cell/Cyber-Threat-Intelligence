export const aboutUsData = Array.from({ length: 32 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: ["Vision", "Mission", "Integrity", "Excellence", "Innovation", "Protection", "Support", "Awareness"][i % 8],
  description: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu."
}));
