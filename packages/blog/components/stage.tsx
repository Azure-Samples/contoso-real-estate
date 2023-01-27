/* eslint-disable @next/next/no-img-element */
import React from "react"
import Nav from "./nav"

const Stage = ({ homepage, categories }) => {
  return (
    <div className="stage">
      <img
        src="/images/contoso-real-estate-logo.svg"
        alt="logo contoso"
        width="200"
      />
      <h1>{homepage.attributes.hero.title}</h1>
      <a href="/" className="button">
        Visit the portal
      </a>
      <Nav categories={categories} />
    </div>
  )
}

export default Stage
