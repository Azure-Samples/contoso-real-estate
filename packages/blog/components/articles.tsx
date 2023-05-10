import { notFound } from "next/navigation"
import { loadArticles, loadArticlesByCategory } from "../lib/services"
import Card from "./card"

interface IProp {
  slug?: string
}

async function Articles(props: IProp) {
  const articles = props.slug
    ? await loadArticlesByCategory(props.slug)
    : await loadArticles()

  if (!articles) {
    notFound()
  }

  return (
    <div>
      <div className="grid">
        {articles.map((article) => {
          return (
            <Card
              article={article}
              key={`article__left__${article.attributes.slug}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Articles
