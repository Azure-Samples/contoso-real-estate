import Link from "next/link"
import Image from "next/image"
import { loadHomePage } from "../lib/services"
import Nav from "./nav"

const Stage = async () => {
  const homepage = await loadHomePage()
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "/"
  return (
    <div className="stage">
      <Image
        src="/images/contoso-real-estate-logo.svg"
        alt="Contoso Real Estate Fictional Company Logo"
        width="200"
      />
      <h1>{homepage.attributes.hero.title}</h1>
      <Link href={portalUrl} className="button">
        Visit the portal
      </Link>
      {/* @ts-expect-error Async Server Component */}
      <Nav />
    </div>
  )
}

export default Stage
