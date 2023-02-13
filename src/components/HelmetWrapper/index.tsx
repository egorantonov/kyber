import { Helmet } from 'react-helmet-async'
import { HOST } from '../../constants'

interface HelmetWrapperProps {
  path: string,
  title: string
}

export function HelmetWrapper({path, title}: HelmetWrapperProps) {
  const url = `${HOST}${path}`
  const structuredDataJson = {
    '@context': 'http://schema.org/',
    'name': title,
    'url': url
    // 'description': description // TODO: pass description?
  }

  return(
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="og:url" property="og:url" content={url} />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <script type="application/ld+json">{JSON.stringify(structuredDataJson)}</script>
    </Helmet>
  )
}