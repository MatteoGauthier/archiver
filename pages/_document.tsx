import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import HeaderSEO from '../components/HeaderSEO'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html lang="fr">
        <Head />
        <HeaderSEO/>
        <body>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
