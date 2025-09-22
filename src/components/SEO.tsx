import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  productPrice?: number;
  productCurrency?: string;
  productAvailability?: 'in stock' | 'out of stock';
}

const SEO: React.FC<SEOProps> = ({
  title = 'شي إن الذهبي - أفضل متجر للموضة والأناقة',
  description = 'اكتشف مجموعتنا الحصرية من الملابس والإكسسوارات العصرية. جودة عالية، أسعار منافسة، وتوصيل سريع في جميع أنحاء المملكة.',
  keywords = 'ملابس, موضة, أناقة, شي إن الذهبي, تسوق اونلاين, ملابس نسائية, ملابس رجالية, أحذية, شنط, إكسسوارات',
  image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop',
  url = 'https://golden-shein.vercel.app',
  type = 'website',
  productPrice,
  productCurrency = 'SAR',
  productAvailability = 'in stock'
}) => {
  const fullTitle = title.includes('شي إن الذهبي') ? title : `${title} - شي إن الذهبي`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="شي إن الذهبي" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="ar" />
      <meta name="geo.region" content="SA" />
      <meta name="geo.country" content="Saudi Arabia" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="شي إن الذهبي" />
      <meta property="og:locale" content="ar_SA" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Product specific meta tags */}
      {type === 'product' && productPrice && (
        <>
          <meta property="product:price:amount" content={productPrice.toString()} />
          <meta property="product:price:currency" content={productCurrency} />
          <meta property="product:availability" content={productAvailability} />
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'product' ? 'Product' : 'Organization',
          name: type === 'product' ? title : 'شي إن الذهبي',
          description: description,
          image: image,
          url: url,
          ...(type === 'website' && {
            sameAs: [
              "https://www.instagram.com/goldenshein",
              "https://www.facebook.com/goldenshein",
              "https://wa.me/777492635"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+966777492635",
              contactType: "customer service",
              availableLanguage: "Arabic"
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "SA",
              addressRegion: "الرياض"
            }
          }),
          ...(type === 'product' && productPrice && {
            offers: {
              "@type": "Offer",
              price: productPrice,
              priceCurrency: productCurrency,
              availability: `https://schema.org/${productAvailability === 'in stock' ? 'InStock' : 'OutOfStock'}`
            }
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEO;