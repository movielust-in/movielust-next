import Head from 'next/head';

interface MetaProps {
  title?: string;
  description?: string;
  url: string;
  image?: string;
  lgImage?: string;
}

const Meta = ({ title, description, url, image, lgImage }: MetaProps) => (
  <Head>
    {/* ================= */}
    {/* Primary Meta tags */}
    {/* ================= */}
    {title ? <title key="title">{title}</title> : null}
    {description ? (
      <meta name="description" content={description} key="description" />
    ) : null}

    {/* ======================== */}
    {/* Open Graph/Facebook tags */}
    {/* ======================== */}
    {title ? (
      <meta
        property="og:title"
        name="og:title"
        content={`${title} - Movielust`}
      />
    ) : null}
    {description ? (
      <meta
        property="og:description"
        content={description}
        key="og_description"
      />
    ) : null}
    <meta property="og:site_name" content="Movielust" key="og_site_name" />
    <meta property="og:url" content={url} key="og_url" />
    {image ? <meta property="og:image" content={image} key="og_image" /> : null}

    {/* ============ */}
    {/* Twitter tags */}
    {/* ============ */}
    {title ? (
      <meta
        name="twitter:title"
        content={`${title} - Movielust`}
        key="twitter_title"
      />
    ) : null}
    {description ? (
      <meta
        name="twitter:description"
        content={description}
        key="twitter_title"
      />
    ) : null}
    <meta
      name="twitter:card"
      content="summary_large_image"
      key="twitter_card"
    />
    <meta name="twitter:site" content="@movielust_in" key="twitter_site" />
    <meta
      name="twitter:url"
      content="https://www.movielust.in"
      key="twitter_url"
    />
    {lgImage || image ? (
      <meta
        name="twitter:image"
        content={lgImage || image}
        key="twitter_image"
      />
    ) : null}
  </Head>
);

export default Meta;
