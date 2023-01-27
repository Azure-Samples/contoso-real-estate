import React from "react"
import Link from "next/link"

const Nav = ({ categories }) => {
  return (
    <div>
      <nav className="nav">
        <p className="text">
          Welcome to our Blog! Choose your favorite category.
        </p>
        <ul className="nav-list">
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
