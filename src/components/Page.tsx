import { useLocation } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';

interface Props {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  date?: string;
  children: ReactNode;
}

export default function Page({ children, ...customMeta }: Props) {
  const location = useLocation();

  // Base domain (you can set this in .env or fallback for local dev)
  const BASE_URL =
    import.meta.env.VITE_WEBSITE_DOMAIN || 'https://vikasrathod.dev';

  const meta = {
    title: 'Vikas Rathod',
    description:
      'Full-stack developer passionate about creating clean, fast, and modern web experiences.',
    image: '/media/og-default.jpg', // fallback OG image
    type: 'website',
    ...customMeta,
  };

  const { title, description, image, type, date } = meta;
  const url = `${BASE_URL}${location.pathname}`;

  // Ensure the image is an absolute URL
  const metaImage = image?.startsWith('http')
    ? image
    : `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${name}"]`
      );
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      if (!href) return;
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Primary meta
    setMeta('description', description);
    setMeta('robots', 'index, follow');

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', url, true);
    setMeta('og:image', metaImage, true);
    setMeta('og:site_name', 'Vikas Rathod', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', metaImage);
    setMeta('twitter:creator', '@vikasxrathod');

    // Article-specific
    if (date) setMeta('article:published_time', date, true);

    // Canonical
    setLink('canonical', url);

    // Cleanup (avoid stacking duplicate meta tags)
    return () => {};
  }, [title, description, metaImage, url, type, date]);

  return <>{children}</>;
}
