import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: t('title'), description: t('intro') };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  const sections = ['intro', 'data', 'cookies', 'google', 'optOut', 'thirdParty', 'contact'] as const;
  const titleKey = {
    intro: 'introTitle',
    data: 'dataTitle',
    cookies: 'cookiesTitle',
    google: 'googleTitle',
    optOut: 'optOutTitle',
    thirdParty: 'thirdPartyTitle',
    contact: 'contactTitle',
  } as const;

  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold text-text-primary mb-2">{t('title')}</h1>
      <p className="text-sm text-text-muted mb-8">{t('updated')}</p>
      <div className="space-y-8">
        {sections.map(key => (
          <section key={key}>
            <h2 className="text-lg font-semibold text-text-primary mb-2">{t(titleKey[key])}</h2>
            <p className="text-text-secondary leading-relaxed">{t(key)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
