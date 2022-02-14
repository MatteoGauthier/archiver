import Head from 'next/head'
import Script from 'next/script'
import SEO from '../utils/seo'

function HeaderSEO() {
  return (
    <Head>
      <title>{SEO.title}</title>
      <meta name="description" content={SEO.description} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#34D399" />
      <meta name="theme-color" content="#34D399"></meta>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      
    </Head>
  )
}

export default HeaderSEO
