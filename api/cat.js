import { getRandomImage } from "../utils/utils.js";
import catImages from "../images/cat.json";

export default function handler(req, res) {
  const randomImage = getRandomImage(catImages);

  if (!randomImage) {
    return res.status(404).json({ error: "No se encontraron imágenes de gatos" });
  }

  res.status(200).json({ url: randomImage });
}
