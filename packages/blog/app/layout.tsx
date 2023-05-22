import { Metadata } from "next"
import "uikit/dist/css/uikit.min.css"
import "uikit/dist/js/uikit-icons.min.js"
import "uikit/dist/js/uikit.min.js"

import "../assets/css/style.css"
import Layout from "../components/layout"
import { getStrapiMedia } from "../lib/media"
import { loadGlobal, loadHomePage } from "../lib/services"

export const revalidate = 0

export async function generateMetadata() {
  const global = await loadGlobal()
  const homepage = await loadHomePage()

  const metadata: Metadata = {
    title: homepage.attributes.seo.metaTitle,
    icons: getStrapiMedia(global?.attributes?.favicon),
    description: homepage.attributes.seo.metaDescription,
    openGraph: {
      images: getStrapiMedia(homepage.attributes.seo.shareImage),
    },
  }

  return metadata
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <header className="header">
            <a href="/" className="logo">
              <img
                src="/images/contoso-real-estate-logo.svg"
                alt="Contoso Real Estate Fictional Company Logo"
                width="80"
              />
            </a>
          </header>
          <main className="main">
            <section className="section homepage inner-wrapper">
              {children}
            </section>
          </main>
          <footer className="footer">
            <section className="inner-wrapper">
              <p className="footer__copy">
                ©2023 - JavaScript @ Contoso HR Rentals App
              </p>
              <span className="spacer"></span>
              <div className="footer__links">
                <a href="/">Portal</a>
                <a href="/">About</a>
                <a href="/">Terms of Service</a>
              </div>
            </section>
            <a href="/" className="logo">
              <img
                src="/images/contoso-real-estate-logo.svg"
                alt="Contoso Real Estate Fictional Company Logo"
                width="100px"
                height="50px"
              />
            </a>
          </footer>
        </Layout>
      </body>
    </html>
  )
}
