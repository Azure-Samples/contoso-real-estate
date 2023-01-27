import React from "react"
import Link from "next/link"
import NextImage from "./image"

const Card = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`} className="card">
      <div className="card-header">
        <div className="card-media">
          <NextImage image={article.attributes.image} />
        </div>
        <div className="card-body">
          <p id="category" className="card-text">
            {article.attributes.category.name}
          </p>
          <h2 id="title" className="card-title">
            {article.attributes.title}
          </h2>
          <p className="card-text">{article.attributes.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
