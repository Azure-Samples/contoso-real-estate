import Link from "next/link"
import { loadHomePage } from "../app/services"
import Nav from "./nav"

const Stage = async () => {
  const homepage = await loadHomePage()
  return (
    <div className="stage">
      <img
        src="/images/contoso-real-estate-logo.svg"
        alt="Contoso Real Estate Fictional Company Logo"
        width="200"
      />
      <h1>{homepage.attributes.hero.title}</h1>

      <Link href="/" className="button">
        Visit the portal
      </Link>
      {/* @ts-expect-error Async Server Component */}
      <Nav />
    </div>
  )
}

export default Stage
