import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'http://localhost:3000',
      lastModified: new Date(),
    },
    {
      url: 'http://localhost:3000/login',
      lastModified: new Date(),
    },
    {
      url: 'http://localhost:3000/new-book',
      lastModified: new Date(),
    },
    {
      url: 'http://localhost:3000/update-book',
      lastModified: new Date(),
    },
  ];
}
