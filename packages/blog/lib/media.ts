import { getStrapiURL } from "./api"

export function getStrapiMedia(media) {
  if (!media) {
    return ""
  }
  const { url } = media.data.attributes
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}
