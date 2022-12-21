import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Moment from "react-moment"
import NextImage from "../../components/image"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"
import { getStrapiMedia } from "../../lib/media"

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
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
                <NextImage
                  image={article.attributes.author.data.attributes.picture}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   try {
//     const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

//     return {
//       paths: articlesRes.data.map((article) => ({
//         params: {
//           slug: article.attributes.slug,
//         },
//       })),
//       fallback: false,
//     }
//   } catch (e) {
//     return {
//       paths: [],
//       fallback: "blocking",
//     }
//   }
// }

// export async function getStaticProps({ params }) {
//   const articlesRes = await fetchAPI("/articles", {
//     filters: {
//       slug: params.slug,
//     },
//     populate: "*",
//   })
//   const categoriesRes = await fetchAPI("/categories")

//   return {
//     props: { article: articlesRes.data[0], categories: categoriesRes },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
  }
}

export default Article
