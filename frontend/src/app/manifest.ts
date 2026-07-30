import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Personal Book Tracker',
    short_name: 'Book Tracker',
    start_url: '/',
    display: 'standalone',
  };
}
