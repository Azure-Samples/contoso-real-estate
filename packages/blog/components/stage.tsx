/* eslint-disable @next/next/no-img-element */
import Nav from "./nav"

const Stage = ({ homepage, categories }) => {
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "/"
  return (
    <div className="stage">
      <img
        src="/images/contoso-real-estate-logo.svg"
        alt="Contoso Real Estate Fictional Company Logo"
        width="200"
      />
      <h1>{homepage.attributes.hero.title}</h1>
      <a href={portalUrl} className="button">
        Visit the portal
      </a>
      <Nav categories={categories} />
    </div>
  )
}

export default Stage
