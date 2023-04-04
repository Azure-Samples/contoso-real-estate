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
            <span>Logo goes here</span>
          </header>
          <main className="main">
            <section className="section homepage inner-wrapper">
              <Main />
            </section>
          </main>
          <NextScript />
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
        </body>
      </Html>
    )
  }
}

export default MyDocument
