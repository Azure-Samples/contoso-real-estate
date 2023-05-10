import { notFound } from "next/navigation"
import { fetchAPI } from "./api"

export const loadHomePage = async () => {
  const response = await fetchAPI("/homepage", {
    populate: {
      hero: "*",
      seo: { populate: "*" },
    },
  })
  return response.data
}

export const loadArticle = async (slug: string) => {
  const response = await fetchAPI("/articles", {
    filters: {
      slug: slug,
    },
    populate: "*",
  })
  if (response.data.length === 0) {
    notFound()
  }

  return response.data[0]
}

export const loadArticles = async () => {
  const response = await fetchAPI("/articles", { populate: "*" })
  return response.data
}

export const loadArticlesByCategory = async (params: string) => {
  const response = await fetchAPI("/categories", {
    filters: { slug: params },
    populate: {
      articles: {
        populate: "*",
      },
    },
  })
  if (response.data.length === 0) {
    notFound()
  }

  return response.data[0].attributes.articles.data
}

export const loadCategories = async () => {
  const response = await fetchAPI("/categories", { populate: "*" })
  return response.data
}

export const loadGlobal = async () => {
  const response = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  return response.data
}
