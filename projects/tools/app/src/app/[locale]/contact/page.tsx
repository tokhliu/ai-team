import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('intro') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const email = t('email');

  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-bold text-text-primary mb-6">{t('title')}</h1>
      <p className="text-text-secondary leading-relaxed mb-6">{t('intro')}</p>
      <div className="rounded-lg border border-border bg-surface-secondary p-5">
        <p className="text-sm text-text-muted mb-1">{t('emailLabel')}</p>
        <a href={`mailto:${email}`} className="text-accent hover:underline font-medium">
          {email}
        </a>
      </div>
      <p className="text-sm text-text-muted mt-6">{t('response')}</p>
    </article>
  );
}
