import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { TOOLS, CATEGORIES, getToolPath } from '@/lib/tools-registry';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return { title: t('title') };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const navT = await getTranslations({ locale, namespace: 'nav' });
  const toolsT = await getTranslations({ locale, namespace: 'tools' });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">{t('title')}</h1>
        <p className="text-text-secondary">{t('subtitle')}</p>
      </div>

      {CATEGORIES.map(cat => {
        const tools = TOOLS.filter(tool => tool.category === cat.id);
        return (
          <section key={cat.id} className="mb-10">
            <h2 className="text-lg font-semibold text-text-primary mb-4 border-b border-border pb-2">
              {navT(cat.nameKey.replace('nav.', ''))}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tools.map(tool => (
                <Link
                  key={tool.id}
                  href={`/${locale}${getToolPath(tool)}`}
                  className="flex flex-col gap-1 p-4 bg-surface-secondary border border-border rounded hover:border-border-hover hover:bg-surface-hover transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary">
                    {toolsT(`${tool.nameKey.replace('tools.', '').replace('.name', '')}.name`)}
                  </span>
                  <span className="text-xs text-text-muted">
                    {toolsT(`${tool.nameKey.replace('tools.', '').replace('.name', '')}.description`)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
