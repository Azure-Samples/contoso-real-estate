import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
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
