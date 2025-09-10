import { useLocation } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface Props {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  date?: string;
  children: ReactNode;
}

export default function Page({ children, ...customMeta }: Props) {
  const location = useLocation();
  
  const meta = {
    title: 'Vikas Rathod',
    description:
      'Software engineer with experience in delivering clean, elegant and efficent code.',
    image: `/media/profile.jpeg`,
    type: 'website',
    ...customMeta
  };
  
  const { title, description, image, type, date } = meta;
  const url = `${import.meta.env.VITE_WEBSITE_DOMAIN}${location.pathname}`;

  const metaImage = image
    ? image.startsWith('http') || image.startsWith('https')
      ? image
      : `${import.meta.env.VITE_WEBSITE_DOMAIN}${image}`
    : '';

  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Helper function to set canonical link
    const setCanonicalLink = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]');
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Set meta tags
    setMetaTag('robots', 'follow, index');
    setMetaTag('description', description);
    setMetaTag('og:url', url, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', 'Vikas Rathod ', true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:image', metaImage, true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', '@vikasrathod');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', metaImage);
    
    if (date) {
      setMetaTag('article:published_time', date, true);
    }

    // Set canonical link
    setCanonicalLink(url);

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // Optional: Clean up meta tags if needed
      // This is usually not necessary as they'll be updated by the next page
    };
  }, [title, description, url, metaImage, type, date]);

  return <>{children}</>;
}