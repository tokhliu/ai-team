import type { MetadataRoute } from 'next';
import { TOOLS, getToolPath } from '@/lib/tools-registry';

const BASE_URL = 'https://toolverse.app';
const LOCALES = ['zh-TW', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = TOOLS.flatMap(tool =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}${getToolPath(tool)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  const homeUrls = LOCALES.map(locale => ({
    url: `${BASE_URL}/${locale}`,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  return [...homeUrls, ...toolUrls];
}
