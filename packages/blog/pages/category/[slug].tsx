import Articles from "../../components/articles"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Stage from "../../components/stage"

const Category = ({ category, categories, homepage }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }

  return (
    <Layout categories={categories.data}>
      <Stage homepage={homepage} categories={categories}></Stage>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.attributes.name}</h1>
          <Articles articles={category.attributes.articles.data} />
        </div>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   try {
//     const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

//     return {
//       paths: categoriesRes.data.map((category) => ({
//         params: {
//           slug: category.attributes.slug,
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

export async function getServerSideProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: "*",
      },
    },
  })
  const allCategories = await fetchAPI("/categories")

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
  }
}

// export async function getStaticProps({ params }) {
//   const matchingCategories = await fetchAPI("/categories", {
//     filters: { slug: params.slug },
//     populate: {
//       articles: {
//         populate: "*",
//       },
//     },
//   })
//   const allCategories = await fetchAPI("/categories")

//   return {
//     props: {
//       category: matchingCategories.data[0],
//       categories: allCategories,
//     },
//     revalidate: 1,
//   }
// }

export default Category
