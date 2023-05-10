import Image from "next/image"
import { getStrapiMedia } from "../lib/media"

const CustomImage = ({ image }) => {
  const { alternativeText, width, height } = image.data.attributes
  return (
    <Image
      width={width || "100%"}
      height={height || "100%"}
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  )
}

export default CustomImage
