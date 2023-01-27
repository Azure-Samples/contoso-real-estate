/* eslint-disable @next/next/no-img-element */
import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Staatliches"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
          />
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
          />
          <script
            async
            src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js"
          />
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
          />
        </Head>
        <body>
          <header className="header">
            <a href="/" className="logo">
              <img
                src="/images/contoso-real-estate-logo.svg"
                alt="logo contoso"
                width="80"
              />
            </a>
          </header>
          <main className="main">
            <section className="section homepage inner-wrapper">
              <Main />
            </section>
          </main>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
