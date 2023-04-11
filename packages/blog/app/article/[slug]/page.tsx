import moment from "moment"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import CustomImage from "../../../components/image"
import { getStrapiMedia } from "../../../lib/media"
import { loadArticle } from "../../services"

export async function generateMetadata({ params }) {
  const article = await loadArticle(params.slug)
  return {
    title: article.attributes.title,
  }
}

export default async function CategoryPage({ params }) {
  const article = await loadArticle(params.slug)
  const imageUrl = getStrapiMedia(article.attributes.image)
  return (
    <>
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {article.attributes.content}
          </ReactMarkdown>
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.author.picture && (
                <CustomImage
                  image={article.attributes.author.data.attributes.picture}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                {moment(article.attributes.publishedAt).format("MMM Do YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
