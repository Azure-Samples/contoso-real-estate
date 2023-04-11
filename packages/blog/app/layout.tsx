import { Metadata } from "next"
import { Staatliches } from "next/font/google"
import Script from "next/script"
import "../assets/css/style.css"
import Layout from "../components/layout"
import { getStrapiMedia } from "../lib/media"
import { loadGlobal, loadHomePage } from "./services"

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

const inter = Staatliches({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        />
      </head>
      <body className={inter.className}>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
          strategy="afterInteractive"
        />

        <Layout>
          <header className="header">
            <span>Logo goes here</span>
          </header>
          <main className="main">
            <section className="section homepage inner-wrapper">
              {children}
            </section>
          </main>
          <footer className="footer">
            <section className="inner-wrapper">
              <p className="footer__copy">
                ©2022 - JavaScript @ Contoso HR Rentals App
              </p>
              <span className="spacer"></span>
              <div className="footer__links">
                <a href="/">Portal</a>
                <a href="/">About</a>
                <a href="/">Terms of Service</a>
              </div>
            </section>
            <a href="/" className="logo">
              <span>Logo goes here</span>
            </a>
          </footer>
        </Layout>
      </body>
    </html>
  )
}
