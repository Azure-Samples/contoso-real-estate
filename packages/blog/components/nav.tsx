import Link from "next/link"
import { loadCategories } from "../lib/services"

const Nav = async () => {
  const categories = await loadCategories()
  return (
    <div>
      <nav className="nav" data-uk-navbar>
        <p className="text">
          Welcome to our Blog! Choose your favorite category.
        </p>
        <ul className="uk-navbar-nav">
          {/* TODO Highlight the current nav item */}
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <Link
                  href={`/category/${category.attributes.slug}`}
                  className="category label"
                >
                  {category.attributes.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
