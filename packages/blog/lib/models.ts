export interface ImageResponse {
  id: number
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      large: object
      small: object
      medium: object
      thumbnail: object
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null | string
    provider: string
    provider_metadata: null | object
    createdAt: string
    updatedAt: string
  }
}

export interface HomepageResponse {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    hero?: {
      id: number
      title: string
    }
    seo: {
      id: number
      metaTitle: string
      metaDescription: string
      shareImage: {
        data: ImageResponse
      }
    }
  }
}
