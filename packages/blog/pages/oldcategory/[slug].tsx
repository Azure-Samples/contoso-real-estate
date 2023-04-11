import { fetchAPI } from "../../lib/api"

const Category = ({ category, categories, homepage }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }
  return <div>we</div>
}

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

export default Category
