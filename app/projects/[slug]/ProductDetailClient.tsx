'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import { useI18n } from '@/i18n';
import Reveal from '@/components/Reveal';
import AnimatedChart from '@/components/AnimatedChart';
import Timeline, { TimelineItem } from '@/components/Timeline';
import styles from './page.module.css';

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const router = useRouter();
  const { locale } = useI18n();

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className={styles.container}>
        <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center', padding: '0 20px' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-pink)', marginBottom: '20px' }}>
            {locale === 'en' && 'Product Not Found'}
            {locale === 'ru' && 'Продукт не найден'}
            {locale === 'be' && 'Прадукт не знойдзены'}
            {locale === 'pl' && 'Produkt nie znaleziony'}
            {locale === 'uk' && 'Продукт не знайдено'}
          </h1>
          <Link href="/projects" className={styles.linkButton}>
            {locale === 'en' && 'Back to Projects'}
            {locale === 'ru' && 'Назад к проектам'}
            {locale === 'be' && 'Вярнуцца да праектаў'}
            {locale === 'pl' && 'Powrót do projektów'}
            {locale === 'uk' && 'Назад до проектів'}
          </Link>
        </div>
      </div>
    );
  }

  const labels = {
    backToProjects: {
      en: '← Back to Projects',
      ru: '← Назад к проектам',
      be: '← Вярнуцца да праектаў',
      pl: '← Powrót do projektów',
      uk: '← Назад до проектів',
    },
    techStack: {
      en: 'Technology Stack',
      ru: 'Стек технологий',
      be: 'Стэк тэхналогій',
      pl: 'Stos technologiczny',
      uk: 'Стек технологій',
    },
    links: {
      en: 'Links',
      ru: 'Ссылки',
      be: 'Спасылкі',
      pl: 'Linki',
      uk: 'Посилання',
    },
    website: {
      en: 'Visit Website',
      ru: 'Посетить сайт',
      be: 'Наведаць сайт',
      pl: 'Odwiedź stronę',
      uk: 'Відвідати сайт',
    },
    demo: {
      en: 'Try Demo',
      ru: 'Попробовать демо',
      be: 'Паспрабаваць дэма',
      pl: 'Wypróbuj demo',
      uk: 'Спробувати демо',
    },
    github: {
      en: 'View on GitHub',
      ru: 'Смотреть на GitHub',
      be: 'Глядзець на GitHub',
      pl: 'Zobacz na GitHub',
      uk: 'Дивитися на GitHub',
    },
    investmentTitle: {
      en: 'Investment Opportunity',
      ru: 'Инвестиционная возможность',
      be: 'Інвестыцыйная магчымасць',
      pl: 'Możliwość inwestycyjna',
      uk: 'Інвестиційна можливість',
    },
    problem: {
      en: '🎯 The Problem',
      ru: '🎯 Проблема',
      be: '🎯 Праблема',
      pl: '🎯 Problem',
      uk: '🎯 Проблема',
    },
    solution: {
      en: '💡 Our Solution',
      ru: '💡 Наше решение',
      be: '💡 Наша рашэнне',
      pl: '💡 Nasze rozwiązanie',
      uk: '💡 Наше рішення',
    },
    metrics: {
      en: '📊 Key Metrics',
      ru: '📊 Ключевые метрики',
      be: '📊 Ключавыя метрыкі',
      pl: '📊 Kluczowe metryki',
      uk: '📊 Ключові метрики',
    },
    traction: {
      en: '🚀 Traction & Growth',
      ru: '🚀 Трэкшн и рост',
      be: '🚀 Трэкшн і рост',
      pl: '🚀 Wzrost i rozwój',
      uk: '🚀 Трекшн і зростання',
    },
    request: {
      en: '💰 Investment Request',
      ru: '💰 Запрос инвестиций',
      be: '💰 Запыт інвестыцый',
      pl: '💰 Prośba o inwestycję',
      uk: '💰 Запит інвестицій',
    },
    contact: {
      en: 'Contact Us',
      ru: 'Связаться с нами',
      be: 'Звязацца з намі',
      pl: 'Skontaktuj się z nami',
      uk: "Зв'язатися з нами",
    },
  };

  // Check if this is FoodReceipts or CheckTruth project for enhanced view
  const isFoodReceipts = product.slug === 'foodreceipts';
  const isCheckTruth = product.slug === 'checktruth';

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Link href="/projects" className={styles.backLink}>
          {labels.backToProjects[locale]}
        </Link>

        <Reveal>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{product.title[locale]}</h1>
              <p className={styles.description}>{product.description[locale]}</p>

              {product.techStack && product.techStack.length > 0 && (
                <div>
                  <h3 style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '12px' }}>
                    {labels.techStack[locale]}
                  </h3>
                  <div className={styles.techStack}>
                    {product.techStack.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(product.links.website || product.links.demo || product.links.github) && (
                <div className={styles.links}>
                  {product.links.website && (
                    <a
                      href={product.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.linkButton} ${styles.primary}`}
                    >
                      {labels.website[locale]} →
                    </a>
                  )}
                  {product.links.demo && (
                    <a
                      href={product.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkButton}
                    >
                      {labels.demo[locale]}
                    </a>
                  )}
                  {product.links.github && (
                    <a
                      href={product.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkButton}
                    >
                      {labels.github[locale]}
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className={styles.heroImage}>
              {product.thumbnail.src ? (
                <Image
                  src={product.thumbnail.src}
                  alt={product.thumbnail.alt[locale]}
                  fill
                  className={styles.thumbnailImage}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'rgba(255, 20, 147, 0.1)' }} />
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* FoodReceipts: Enhanced Sections */}
      {isFoodReceipts && (
        <>
          {/* Business Model */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '💼 Business Model'}
                {locale === 'ru' && '💼 Бизнес-модель'}
                {locale === 'be' && '💼 Бізнес-мадэль'}
                {locale === 'pl' && '💼 Model biznesowy'}
                {locale === 'uk' && '💼 Бізнес-модель'}
              </h2>
            </Reveal>

            <div className={styles.businessModelGrid}>
              <Reveal delay={0.1}>
                <div className={styles.businessCard}>
                  <h3 className={styles.cardTitle}>
                    {locale === 'en' && 'Revenue Streams'}
                    {locale === 'ru' && 'Источники дохода'}
                    {locale === 'be' && 'Крыніцы даходу'}
                    {locale === 'pl' && 'Źródła przychodów'}
                    {locale === 'uk' && 'Джерела доходу'}
                  </h3>
                  <ul className={styles.featureList}>
                    <li>
                      {locale === 'en' && '💰 Commission from grocery partners (15-20%)'}
                      {locale === 'ru' && '💰 Комиссия от партнеров-магазинов (15-20%)'}
                      {locale === 'be' && '💰 Камісія ад партнёраў-крам (15-20%)'}
                      {locale === 'pl' && '💰 Prowizja od partnerów spożywczych (15-20%)'}
                      {locale === 'uk' && '💰 Комісія від партнерів-магазинів (15-20%)'}
                    </li>
                    <li>
                      {locale === 'en' && '📱 Premium subscriptions ($4.99/mo)'}
                      {locale === 'ru' && '📱 Премиум подписки ($4.99/мес)'}
                      {locale === 'be' && '📱 Прэміум падпіскі ($4.99/мес)'}
                      {locale === 'pl' && '📱 Subskrypcje premium ($4.99/mies)'}
                      {locale === 'uk' && '📱 Преміум підписки ($4.99/міс)'}
                    </li>
                    <li>
                      {locale === 'en' && '🎯 Sponsored recipes from brands'}
                      {locale === 'ru' && '🎯 Спонсируемые рецепты от брендов'}
                      {locale === 'be' && '🎯 Спансаваныя рэцэпты ад брэндаў'}
                      {locale === 'pl' && '🎯 Sponsorowane przepisy od marek'}
                      {locale === 'uk' && '🎯 Спонсоровані рецепти від брендів'}
                    </li>
                    <li>
                      {locale === 'en' && '📊 API access for food tech companies'}
                      {locale === 'ru' && '📊 API-доступ для food tech компаний'}
                      {locale === 'be' && '📊 API-доступ для food tech кампаній'}
                      {locale === 'pl' && '📊 Dostęp API dla firm food tech'}
                      {locale === 'uk' && '📊 API-доступ для food tech компаній'}
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.businessCard}>
                  <h3 className={styles.cardTitle}>
                    {locale === 'en' && 'Target Market'}
                    {locale === 'ru' && 'Целевой рынок'}
                    {locale === 'be' && 'Мэтавы рынак'}
                    {locale === 'pl' && 'Rynek docelowy'}
                    {locale === 'uk' && 'Цільовий ринок'}
                  </h3>
                  <ul className={styles.featureList}>
                    <li>
                      {locale === 'en' && '👨‍👩‍👧‍👦 Families (25-45 yo, 2-4 members)'}
                      {locale === 'ru' && '👨‍👩‍👧‍👦 Семьи (25-45 лет, 2-4 члена)'}
                      {locale === 'be' && '👨‍👩‍👧‍👦 Сем\'і (25-45 год, 2-4 члены)'}
                      {locale === 'pl' && '👨‍👩‍👧‍👦 Rodziny (25-45 lat, 2-4 osoby)'}
                      {locale === 'uk' && '👨‍👩‍👧‍👦 Сім\'ї (25-45 років, 2-4 члени)'}
                    </li>
                    <li>
                      {locale === 'en' && '💼 Working professionals (time-constrained)'}
                      {locale === 'ru' && '💼 Работающие профессионалы (ограничены во времени)'}
                      {locale === 'be' && '💼 Працуючыя прафесіяналы (абмежаваны ў часе)'}
                      {locale === 'pl' && '💼 Pracujący profesjonaliści (ograniczeni czasowo)'}
                      {locale === 'uk' && '💼 Працюючі професіонали (обмежені в часі)'}
                    </li>
                    <li>
                      {locale === 'en' && '🏋️ Health-conscious consumers'}
                      {locale === 'ru' && '🏋️ Потребители, заботящиеся о здоровье'}
                      {locale === 'be' && '🏋️ Спажыўцы, якія клапоцяцца аб здароўі'}
                      {locale === 'pl' && '🏋️ Konsumenci dbający o zdrowie'}
                      {locale === 'uk' && '🏋️ Споживачі, що дбають про здоров\'я'}
                    </li>
                    <li>
                      {locale === 'en' && '🌍 Expats & international food lovers'}
                      {locale === 'ru' && '🌍 Эмигранты и любители международной кухни'}
                      {locale === 'be' && '🌍 Эмігранты і аматары міжнароднай кухні'}
                      {locale === 'pl' && '🌍 Ekspatrianci i miłośnicy kuchni międzynarodowej'}
                      {locale === 'uk' && '🌍 Емігранти та любителі міжнародної кухні'}
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Market Analysis */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '📈 Market Analysis'}
                {locale === 'ru' && '📈 Рыночный анализ'}
                {locale === 'be' && '📈 Рыначны аналіз'}
                {locale === 'pl' && '📈 Analiza rynku'}
                {locale === 'uk' && '📈 Ринковий аналіз'}
              </h2>
            </Reveal>

            <div className={styles.statsGrid}>
              <Reveal delay={0.1}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$12B</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Meal Planning Market'}
                    {locale === 'ru' && 'Рынок планирования питания'}
                    {locale === 'be' && 'Рынак планавання харчавання'}
                    {locale === 'pl' && 'Rynek planowania posiłków'}
                    {locale === 'uk' && 'Ринок планування харчування'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>42%</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Annual Growth (CAGR)'}
                    {locale === 'ru' && 'Годовой рост (CAGR)'}
                    {locale === 'be' && 'Гадавы рост (CAGR)'}
                    {locale === 'pl' && 'Wzrost roczny (CAGR)'}
                    {locale === 'uk' && 'Річний ріст (CAGR)'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>38M</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Poland Population'}
                    {locale === 'ru' && 'Население Польши'}
                    {locale === 'be' && 'Насельніцтва Польшчы'}
                    {locale === 'pl' && 'Populacja Polski'}
                    {locale === 'uk' && 'Населення Польщі'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>68%</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Online Grocery Adoption'}
                    {locale === 'ru' && 'Онлайн-покупки продуктов'}
                    {locale === 'be' && 'Анлайн-пакупкі прадуктаў'}
                    {locale === 'pl' && 'Zakupy spożywcze online'}
                    {locale === 'uk' && 'Онлайн-покупки продуктів'}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Investment Section */}
      <section className={styles.investmentSection}>
        <Reveal>
          <h2 className={styles.sectionTitle}>{labels.investmentTitle[locale]}</h2>
        </Reveal>

        <div className={styles.investmentGrid}>
          {/* Problem */}
          <Reveal delay={0.1}>
            <div className={styles.investmentBlock}>
              <h3 className={styles.blockTitle}>
                <span className={styles.blockIcon}>🎯</span>
                {labels.problem[locale].replace('🎯 ', '')}
              </h3>
              <p className={styles.blockText}>{product.investment.problem[locale]}</p>
            </div>
          </Reveal>

          {/* Solution */}
          <Reveal delay={0.2}>
            <div className={styles.investmentBlock}>
              <h3 className={styles.blockTitle}>
                <span className={styles.blockIcon}>💡</span>
                {labels.solution[locale].replace('💡 ', '')}
              </h3>
              <p className={styles.blockText}>{product.investment.solution[locale]}</p>
            </div>
          </Reveal>

          {/* Metrics */}
          <Reveal delay={0.3}>
            <div className={styles.investmentBlock}>
              <h3 className={styles.blockTitle}>
                <span className={styles.blockIcon}>📊</span>
                {labels.metrics[locale].replace('📊 ', '')}
              </h3>
              <div className={styles.metricsGrid}>
                {product.investment.metrics.map((metric, index) => (
                  <div key={index} className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      {metric.value}
                      {metric.trend === 'up' && <span className={`${styles.metricTrend} ${styles.up}`}>↑</span>}
                    </div>
                    <div className={styles.metricLabel}>{metric.key[locale]}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Traction */}
          <Reveal delay={0.4}>
            <div className={styles.investmentBlock}>
              <h3 className={styles.blockTitle}>
                <span className={styles.blockIcon}>🚀</span>
                {labels.traction[locale].replace('🚀 ', '')}
              </h3>
              <p className={styles.blockText}>{product.investment.traction[locale]}</p>
            </div>
          </Reveal>

          {/* Investment Request */}
          <Reveal delay={0.5}>
            <div className={styles.requestBlock}>
              <h3 className={styles.requestTitle}>{product.investment.request.round[locale]}</h3>
              <div className={styles.requestAmount}>{product.investment.request.amount[locale]}</div>

              <div className={styles.contactInfo}>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 16px' }}>{labels.contact[locale]}:</p>
                <a href={`mailto:${product.investment.contact.email}`} className={styles.contactLink}>
                  📧 {product.investment.contact.email}
                </a>
                {product.investment.contact.telegram && (
                  <a
                    href={`https://t.me/${product.investment.contact.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    💬 {product.investment.contact.telegram}
                  </a>
                )}
                {product.investment.contact.linkedin && (
                  <a
                    href={product.investment.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    🔗 LinkedIn
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CheckTruth: Enhanced Sections */}
      {isCheckTruth && (
        <>
          {/* Business Model */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '💼 Business Model'}
                {locale === 'ru' && '💼 Бизнес-модель'}
                {locale === 'be' && '💼 Бізнес-мадэль'}
                {locale === 'pl' && '💼 Model biznesowy'}
                {locale === 'uk' && '💼 Бізнес-модель'}
              </h2>
            </Reveal>

            <div className={styles.businessModelGrid}>
              <Reveal delay={0.1}>
                <div className={styles.businessCard}>
                  <h3 className={styles.cardTitle}>
                    {locale === 'en' && 'Revenue Streams'}
                    {locale === 'ru' && 'Источники дохода'}
                    {locale === 'be' && 'Крыніцы даходу'}
                    {locale === 'pl' && 'Źródła przychodów'}
                    {locale === 'uk' && 'Джерела доходу'}
                  </h3>
                  <ul className={styles.featureList}>
                    <li>
                      {locale === 'en' && '🎯 Display advertising on free tier'}
                      {locale === 'ru' && '🎯 Медийная реклама на бесплатном уровне'}
                      {locale === 'be' && '🎯 Медыйная рэклама на бясплатным узроўні'}
                      {locale === 'pl' && '🎯 Reklama displayowa na poziomie darmowym'}
                      {locale === 'uk' && '🎯 Медійна реклама на безкоштовному рівні'}
                    </li>
                    <li>
                      {locale === 'en' && '💼 Enterprise API ($500-5,000/mo)'}
                      {locale === 'ru' && '💼 Корпоративный API ($500-5,000/мес)'}
                      {locale === 'be' && '💼 Карпаратыўны API ($500-5,000/мес)'}
                      {locale === 'pl' && '💼 API dla firm ($500-5,000/mies)'}
                      {locale === 'uk' && '💼 Корпоративний API ($500-5,000/міс)'}
                    </li>
                    <li>
                      {locale === 'en' && '📰 Partnerships with media organizations'}
                      {locale === 'ru' && '📰 Партнерства с медиа-организациями'}
                      {locale === 'be' && '📰 Партнёрствы з медыя-арганізацыямі'}
                      {locale === 'pl' && '📰 Partnerstwa z organizacjami medialnymi'}
                      {locale === 'uk' && '📰 Партнерства з медіа-організаціями'}
                    </li>
                    <li>
                      {locale === 'en' && '🔬 Custom AI solutions for platforms'}
                      {locale === 'ru' && '🔬 Кастомные AI-решения для платформ'}
                      {locale === 'be' && '🔬 Кастомныя AI-рашэнні для платформаў'}
                      {locale === 'pl' && '🔬 Niestandardowe rozwiązania AI dla platform'}
                      {locale === 'uk' && '🔬 Кастомні AI-рішення для платформ'}
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.businessCard}>
                  <h3 className={styles.cardTitle}>
                    {locale === 'en' && 'Target Customers'}
                    {locale === 'ru' && 'Целевые клиенты'}
                    {locale === 'be' && 'Мэтавыя кліенты'}
                    {locale === 'pl' && 'Docelowi klienci'}
                    {locale === 'uk' && 'Цільові клієнти'}
                  </h3>
                  <ul className={styles.featureList}>
                    <li>
                      {locale === 'en' && '👥 Individual users (free tools)'}
                      {locale === 'ru' && '👥 Индивидуальные пользователи (бесплатно)'}
                      {locale === 'be' && '👥 Індывідуальныя карыстальнікі (бясплатна)'}
                      {locale === 'pl' && '👥 Użytkownicy indywidualni (za darmo)'}
                      {locale === 'uk' && '👥 Індивідуальні користувачі (безкоштовно)'}
                    </li>
                    <li>
                      {locale === 'en' && '📰 News & media organizations'}
                      {locale === 'ru' && '📰 Новостные и медиа-организации'}
                      {locale === 'be' && '📰 Навінавыя і медыя-арганізацыі'}
                      {locale === 'pl' && '📰 Organizacje informacyjne i medialne'}
                      {locale === 'uk' && '📰 Новинні та медіа-організації'}
                    </li>
                    <li>
                      {locale === 'en' && '🏢 Social media platforms'}
                      {locale === 'ru' && '🏢 Платформы социальных сетей'}
                      {locale === 'be' && '🏢 Платформы сацыяльных сетак'}
                      {locale === 'pl' && '🏢 Platformy mediów społecznościowych'}
                      {locale === 'uk' && '🏢 Платформи соціальних мереж'}
                    </li>
                    <li>
                      {locale === 'en' && '🎓 Educational institutions'}
                      {locale === 'ru' && '🎓 Образовательные учреждения'}
                      {locale === 'be' && '🎓 Адукацыйныя ўстановы'}
                      {locale === 'pl' && '🎓 Instytucje edukacyjne'}
                      {locale === 'uk' && '🎓 Освітні заклади'}
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Market Analysis */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '📈 Market Analysis'}
                {locale === 'ru' && '📈 Рыночный анализ'}
                {locale === 'be' && '📈 Рыначны аналіз'}
                {locale === 'pl' && '📈 Analiza rynku'}
                {locale === 'uk' && '📈 Ринковий аналіз'}
              </h2>
            </Reveal>

            <div className={styles.statsGrid}>
              <Reveal delay={0.1}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$500M+</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Content Moderation Market'}
                    {locale === 'ru' && 'Рынок модерации контента'}
                    {locale === 'be' && 'Рынак мадэрацыі кантэнту'}
                    {locale === 'pl' && 'Rynek moderacji treści'}
                    {locale === 'uk' && 'Ринок модерації контенту'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>6x</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Disinfo Spreads Faster'}
                    {locale === 'ru' && 'Дезинфо быстрее правды'}
                    {locale === 'be' && 'Дэзінфа хутчэй праўды'}
                    {locale === 'pl' && 'Dezinfo szybsza niż prawda'}
                    {locale === 'uk' && 'Дезінфо швидше правди'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>68%</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Share Without Verifying'}
                    {locale === 'ru' && 'Делятся без проверки'}
                    {locale === 'be' && 'Дзеляцца без праверкі'}
                    {locale === 'pl' && 'Udostępniają bez weryfikacji'}
                    {locale === 'uk' && 'Діляться без перевірки'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>8B</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Global Social Media Users'}
                    {locale === 'ru' && 'Пользователей соцсетей'}
                    {locale === 'be' && 'Карыстальнікаў соцсетак'}
                    {locale === 'pl' && 'Użytkowników mediów społecznościowych'}
                    {locale === 'uk' && 'Користувачів соцмереж'}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Growth Projections */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '📊 User Growth Projections (2025-2026)'}
                {locale === 'ru' && '📊 Прогноз роста пользователей (2025-2026)'}
                {locale === 'be' && '📊 Прагноз росту карыстальнікаў (2025-2026)'}
                {locale === 'pl' && '📊 Prognozy wzrostu użytkowników (2025-2026)'}
                {locale === 'uk' && '📊 Прогноз зростання користувачів (2025-2026)'}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <AnimatedChart
                data={[
                  { label: 'Q1 2025', value: 1500 },
                  { label: 'Q2 2025', value: 5000 },
                  { label: 'Q3 2025', value: 12000 },
                  { label: 'Q4 2025', value: 25000 },
                  { label: 'Q2 2026', value: 50000 },
                  { label: 'Q4 2026', value: 100000 },
                ]}
                height={350}
              />
            </Reveal>

            <Reveal delay={0.3}>
              <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                {locale === 'en' && '🚀 Conservative growth: 25K users + 5 API clients EOY 2025 → 100K users + 20 API clients EOY 2026'}
                {locale === 'ru' && '🚀 Консервативный рост: 25K пользователей + 5 API клиентов конец 2025 → 100K пользователей + 20 API клиентов конец 2026'}
                {locale === 'be' && '🚀 Кансерватыўны рост: 25K карыстальнікаў + 5 API кліентаў канец 2025 → 100K карыстальнікаў + 20 API кліентаў канец 2026'}
                {locale === 'pl' && '🚀 Konserwatywny wzrost: 25K użytkowników + 5 klientów API koniec 2025 → 100K użytkowników + 20 klientów API koniec 2026'}
                {locale === 'uk' && '🚀 Консервативне зростання: 25K користувачів + 5 API клієнтів кінець 2025 → 100K користувачів + 20 API клієнтів кінець 2026'}
              </p>
            </Reveal>
          </section>

          {/* Roadmap */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '🗺️ Product Roadmap'}
                {locale === 'ru' && '🗺️ Дорожная карта'}
                {locale === 'be' && '🗺️ Дарожная карта'}
                {locale === 'pl' && '🗺️ Mapa drogowa'}
                {locale === 'uk' && '🗺️ Дорожня карта'}
              </h2>
            </Reveal>

            <Timeline
              locale={locale}
              items={[
                {
                  quarter: {
                    en: 'Q4 2024',
                    ru: 'Q4 2024',
                    be: 'Q4 2024',
                    pl: 'Q4 2024',
                    uk: 'Q4 2024',
                  },
                  title: {
                    en: 'TikTok Platform Launch',
                    ru: 'Запуск платформы для TikTok',
                    be: 'Запуск платформы для TikTok',
                    pl: 'Uruchomienie platformy TikTok',
                    uk: 'Запуск платформи для TikTok',
                  },
                  description: {
                    en: 'Audio transcription (6 languages), claim identification, multi-source fact-checking operational.',
                    ru: 'Транскрипция аудио (6 языков), выявление утверждений, проверка фактов из нескольких источников работает.',
                    be: 'Транскрыпцыя аўдыё (6 моў), выяўленне сцвярджэнняў, праверка фактаў з некалькіх крыніц працуе.',
                    pl: 'Transkrypcja audio (6 języków), identyfikacja twierdzeń, sprawdzanie faktów z wielu źródeł działa.',
                    uk: 'Транскрипція аудіо (6 мов), виявлення тверджень, перевірка фактів з декількох джерел працює.',
                  },
                  status: 'completed',
                },
                {
                  quarter: {
                    en: 'Q1-Q3 2025',
                    ru: 'Q1-Q3 2025',
                    be: 'Q1-Q3 2025',
                    pl: 'Q1-Q3 2025',
                    uk: 'Q1-Q3 2025',
                  },
                  title: {
                    en: 'Multi-Platform Expansion',
                    ru: 'Расширение на платформы',
                    be: 'Пашырэнне на платформы',
                    pl: 'Ekspansja wieloplatformowa',
                    uk: 'Розширення на платформи',
                  },
                  description: {
                    en: 'Add Instagram, YouTube, Twitter/X, Facebook support. Launch AI content detection beta. Target: 15K-25K users.',
                    ru: 'Добавление Instagram, YouTube, Twitter/X, Facebook. Запуск бета AI-детекции. Цель: 15K-25K пользователей.',
                    be: 'Даданне Instagram, YouTube, Twitter/X, Facebook. Запуск бета AI-дэтэкцыі. Мэта: 15K-25K карыстальнікаў.',
                    pl: 'Dodanie Instagram, YouTube, Twitter/X, Facebook. Uruchomienie beta detekcji AI. Cel: 15K-25K użytkowników.',
                    uk: 'Додавання Instagram, YouTube, Twitter/X, Facebook. Запуск бета AI-детекції. Мета: 15K-25K користувачів.',
                  },
                  status: 'in-progress',
                },
                {
                  quarter: {
                    en: 'Q4 2025',
                    ru: 'Q4 2025',
                    be: 'Q4 2025',
                    pl: 'Q4 2025',
                    uk: 'Q4 2025',
                  },
                  title: {
                    en: 'Enterprise API Beta',
                    ru: 'Бета корпоративного API',
                    be: 'Бета карпаратыўнага API',
                    pl: 'Beta API dla firm',
                    uk: 'Бета корпоративного API',
                  },
                  description: {
                    en: 'Launch API beta with 3-5 pilot customers. Refine pricing model based on usage patterns.',
                    ru: 'Запуск бета API с 3-5 пилотными клиентами. Доработка ценовой модели на основе паттернов использования.',
                    be: 'Запуск бета API з 3-5 пілотнымі кліентамі. Дапрацоўка цэнавай мадэлі на аснове патэрнаў выкарыстання.',
                    pl: 'Uruchomienie beta API z 3-5 klientami pilotażowymi. Dopracowanie modelu cenowego na podstawie wzorców użycia.',
                    uk: 'Запуск бета API з 3-5 пілотними клієнтами. Доопрацювання цінової моделі на основі патернів використання.',
                  },
                  status: 'planned',
                },
                {
                  quarter: {
                    en: 'Q1-Q2 2026',
                    ru: 'Q1-Q2 2026',
                    be: 'Q1-Q2 2026',
                    pl: 'Q1-Q2 2026',
                    uk: 'Q1-Q2 2026',
                  },
                  title: {
                    en: 'API v1.0 & Mobile Apps',
                    ru: 'API v1.0 и мобильные приложения',
                    be: 'API v1.0 і мабільныя прыкладанні',
                    pl: 'API v1.0 i aplikacje mobilne',
                    uk: 'API v1.0 та мобільні додатки',
                  },
                  description: {
                    en: 'Full API launch, iOS/Android apps. Enhanced AI detection for deepfakes. Target: 40K-60K users, 10-15 API clients.',
                    ru: 'Полный запуск API, iOS/Android приложения. Улучшенная AI-детекция дипфейков. Цель: 40K-60K пользователей, 10-15 API клиентов.',
                    be: 'Поўны запуск API, iOS/Android прыкладанні. Паляпшаная AI-дэтэкцыя дыпфейкаў. Мэта: 40K-60K карыстальнікаў, 10-15 API кліентаў.',
                    pl: 'Pełne uruchomienie API, aplikacje iOS/Android. Ulepszona detekcja deepfake\'ów AI. Cel: 40K-60K użytkowników, 10-15 klientów API.',
                    uk: 'Повний запуск API, iOS/Android додатки. Покращена AI-детекція дипфейків. Мета: 40K-60K користувачів, 10-15 API клієнтів.',
                  },
                  status: 'planned',
                },
                {
                  quarter: {
                    en: 'Q3-Q4 2026',
                    ru: 'Q3-Q4 2026',
                    be: 'Q3-Q4 2026',
                    pl: 'Q3-Q4 2026',
                    uk: 'Q3-Q4 2026',
                  },
                  title: {
                    en: 'Scale & Partnerships',
                    ru: 'Масштабирование и партнерства',
                    be: 'Маштабаванне і партнёрствы',
                    pl: 'Skalowanie i partnerstwa',
                    uk: 'Масштабування та партнерства',
                  },
                  description: {
                    en: 'Media partnerships, browser extensions. Multi-language expansion. Target: 80K-100K users, 20+ API clients.',
                    ru: 'Партнерства с медиа, браузерные расширения. Расширение языков. Цель: 80K-100K пользователей, 20+ API клиентов.',
                    be: 'Партнёрствы з медыя, браўзерныя пашырэнні. Пашырэнне моў. Мэта: 80K-100K карыстальнікаў, 20+ API кліентаў.',
                    pl: 'Partnerstwa medialne, rozszerzenia przeglądarki. Ekspansja językowa. Cel: 80K-100K użytkowników, 20+ klientów API.',
                    uk: 'Партнерства з медіа, браузерні розширення. Розширення мов. Мета: 80K-100K користувачів, 20+ API клієнтів.',
                  },
                  status: 'planned',
                },
                {
                  quarter: {
                    en: '2027+',
                    ru: '2027+',
                    be: '2027+',
                    pl: '2027+',
                    uk: '2027+',
                  },
                  title: {
                    en: 'Global Expansion',
                    ru: 'Глобальная экспансия',
                    be: 'Глабальная экспансія',
                    pl: 'Ekspansja globalna',
                    uk: 'Глобальна експансія',
                  },
                  description: {
                    en: 'International markets, enterprise white-label solutions, educational programs. Target: 500K+ users, enterprise tier clients.',
                    ru: 'Международные рынки, white-label решения для предприятий, образовательные программы. Цель: 500K+ пользователей, корпоративные клиенты.',
                    be: 'Міжнародныя рынкі, white-label рашэнні для прадпрыемстваў, адукацыйныя праграмы. Мэта: 500K+ карыстальнікаў, карпаратыўныя кліенты.',
                    pl: 'Rynki międzynarodowe, rozwiązania white-label dla firm, programy edukacyjne. Cel: 500K+ użytkowników, klienci korporacyjni.',
                    uk: 'Міжнародні ринки, white-label рішення для підприємств, освітні програми. Мета: 500K+ користувачів, корпоративні клієнти.',
                  },
                  status: 'planned',
                },
              ]}
            />
          </section>

          {/* Financial Projections */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '💎 Financial Projections'}
                {locale === 'ru' && '💎 Финансовые прогнозы'}
                {locale === 'be' && '💎 Фінансавыя прагнозы'}
                {locale === 'pl' && '💎 Prognozy finansowe'}
                {locale === 'uk' && '💎 Фінансові прогнози'}
              </h2>
            </Reveal>

            <div className={styles.statsGrid}>
              <Reveal delay={0.1}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$35-55K</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Projected Revenue 2025'}
                    {locale === 'ru' && 'Прогноз выручки 2025'}
                    {locale === 'be' && 'Прагноз выручкі 2025'}
                    {locale === 'pl' && 'Prognozowane przychody 2025'}
                    {locale === 'uk' && 'Прогноз виручки 2025'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$450-600K</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Projected Revenue 2026'}
                    {locale === 'ru' && 'Прогноз выручки 2026'}
                    {locale === 'be' && 'Прагноз выручкі 2026'}
                    {locale === 'pl' && 'Prognozowane przychody 2026'}
                    {locale === 'uk' && 'Прогноз виручки 2026'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>100K+</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Free Users EOY 2026'}
                    {locale === 'ru' && 'Бесплатных польз. конец 2026'}
                    {locale === 'be' && 'Бясплатных карыст. канец 2026'}
                    {locale === 'pl' && 'Darmowych użytk. koniec 2026'}
                    {locale === 'uk' && 'Безкошт. корист. кінець 2026'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>12-15mo</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Runway with Investment'}
                    {locale === 'ru' && 'Runway с инвестициями'}
                    {locale === 'be' && 'Runway з інвестыцыямі'}
                    {locale === 'pl' && 'Runway z inwestycjami'}
                    {locale === 'uk' && 'Runway з інвестиціями'}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 20, 147, 0.3)' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-pink)', marginBottom: '20px' }}>
                  {locale === 'en' && '💰 Revenue Breakdown (Conservative)'}
                  {locale === 'ru' && '💰 Разбивка доходов (консервативно)'}
                  {locale === 'be' && '💰 Разбіўка даходаў (кансерватыўна)'}
                  {locale === 'pl' && '💰 Podział przychodów (konserwatywnie)'}
                  {locale === 'uk' && '💰 Розбивка доходів (консервативно)'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                  <div>
                    <h4 style={{ color: 'var(--color-pink)', fontSize: '1.1rem', marginBottom: '12px' }}>2025</h4>
                    <ul className={styles.featureList}>
                      <li>📊 {locale === 'en' ? 'Display Ads: $8-12K (avg $0.30/user/mo)' : locale === 'ru' ? 'Медийная реклама: $8-12K ($0.30/польз./мес)' : locale === 'be' ? 'Медыйная рэклама: $8-12K ($0.30/карыст./мес)' : locale === 'pl' ? 'Reklamy: $8-12K ($0.30/użytk./mies)' : 'Медійна реклама: $8-12K ($0.30/корист./міс)'}</li>
                      <li>💼 {locale === 'en' ? 'API Revenue: $27-43K (3-5 clients, $1.5-2K/mo avg)' : locale === 'ru' ? 'API доходы: $27-43K (3-5 клиентов, $1.5-2K/мес)' : locale === 'be' ? 'API даходы: $27-43K (3-5 кліентаў, $1.5-2K/мес)' : locale === 'pl' ? 'Przychody API: $27-43K (3-5 klientów, $1.5-2K/mies)' : 'API доходи: $27-43K (3-5 клієнтів, $1.5-2K/міс)'}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-pink)', fontSize: '1.1rem', marginBottom: '12px' }}>2026</h4>
                    <ul className={styles.featureList}>
                      <li>📊 {locale === 'en' ? 'Display Ads: $180-270K (avg $0.35/user/mo)' : locale === 'ru' ? 'Медийная реклама: $180-270K ($0.35/польз./мес)' : locale === 'be' ? 'Медыйная рэклама: $180-270K ($0.35/карыст./мес)' : locale === 'pl' ? 'Reklamy: $180-270K ($0.35/użytk./mies)' : 'Медійна реклама: $180-270K ($0.35/корист./міс)'}</li>
                      <li>💼 {locale === 'en' ? 'API Revenue: $270-330K (15-20 clients, $1.8-2.5K/mo avg)' : locale === 'ru' ? 'API доходы: $270-330K (15-20 клиентов, $1.8-2.5K/мес)' : locale === 'be' ? 'API даходы: $270-330K (15-20 кліентаў, $1.8-2.5K/мес)' : locale === 'pl' ? 'Przychody API: $270-330K (15-20 klientów, $1.8-2.5K/mies)' : 'API доходи: $270-330K (15-20 клієнтів, $1.8-2.5K/міс)'}</li>
                    </ul>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-pink)', marginBottom: '20px', marginTop: '30px' }}>
                  {locale === 'en' && '🎯 Use of Funds ($200-400K)'}
                  {locale === 'ru' && '🎯 Использование средств ($200-400K)'}
                  {locale === 'be' && '🎯 Выкарыстанне сродкаў ($200-400K)'}
                  {locale === 'pl' && '🎯 Wykorzystanie środków ($200-400K)'}
                  {locale === 'uk' && '🎯 Використання коштів ($200-400K)'}
                </h3>
                <ul className={styles.featureList} style={{ fontSize: '1.05rem' }}>
                  <li>💻 {locale === 'en' ? 'Product Development (45%): Platform expansion, AI improvements, mobile apps' : locale === 'ru' ? 'Разработка продукта (45%): Расширение платформ, улучшение AI, мобильные приложения' : locale === 'be' ? 'Распрацоўка прадукту (45%): Пашырэнне платформаў, паляпшэнне AI, мабільныя прыкладанні' : locale === 'pl' ? 'Rozwój produktu (45%): Ekspansja platform, ulepszenia AI, aplikacje mobilne' : 'Розробка продукту (45%): Розширення платформ, покращення AI, мобільні додатки'}</li>
                  <li>📢 {locale === 'en' ? 'Marketing & Growth (25%): Content marketing, partnerships, PR campaigns' : locale === 'ru' ? 'Маркетинг и рост (25%): Контент-маркетинг, партнерства, PR-кампании' : locale === 'be' ? 'Маркетынг і рост (25%): Кантэнт-маркетынг, партнёрствы, PR-кампаніі' : locale === 'pl' ? 'Marketing i wzrost (25%): Content marketing, partnerstwa, kampanie PR' : 'Маркетинг та зростання (25%): Контент-маркетинг, партнерства, PR-кампанії'}</li>
                  <li>👥 {locale === 'en' ? 'Team & Salaries (20%): 2 developers + part-time roles (design, content)' : locale === 'ru' ? 'Команда и зарплаты (20%): 2 разработчика + part-time роли (дизайн, контент)' : locale === 'be' ? 'Каманда і зарплаты (20%): 2 распрацоўшчыка + part-time ролі (дызайн, кантэнт)' : locale === 'pl' ? 'Zespół i pensje (20%): 2 programistów + role part-time (projekt, treść)' : 'Команда та зарплати (20%): 2 розробники + part-time ролі (дизайн, контент)'}</li>
                  <li>🏢 {locale === 'en' ? 'Infrastructure (10%): Cloud costs, AI APIs, CDN, security, office' : locale === 'ru' ? 'Инфраструктура (10%): Облако, AI API, CDN, безопасность, офис' : locale === 'be' ? 'Інфраструктура (10%): Воблака, AI API, CDN, бяспека, офіс' : locale === 'pl' ? 'Infrastruktura (10%): Chmura, AI API, CDN, bezpieczeństwo, biuro' : 'Інфраструктура (10%): Хмара, AI API, CDN, безпека, офіс'}</li>
                </ul>
                <p style={{ marginTop: '25px', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                  {locale === 'en' && '* Projections based on: 25% organic user growth, 80% ad fill rate, $2-3 CPM, API pricing $1,500-2,500/mo depending on volume. Conservative estimates assume lower conversion rates and slower growth.'}
                  {locale === 'ru' && '* Прогнозы основаны на: 25% органического роста пользователей, 80% fill rate рекламы, $2-3 CPM, цены API $1,500-2,500/мес в зависимости от объема. Консервативные оценки предполагают низкую конверсию и медленный рост.'}
                  {locale === 'be' && '* Прагнозы заснаваны на: 25% арганічнага росту карыстальнікаў, 80% fill rate рэкламы, $2-3 CPM, цэны API $1,500-2,500/мес у залежнасці ад аб\'ёму. Кансерватыўныя ацэнкі прадугледжваюць нізкую канверсію і павольны рост.'}
                  {locale === 'pl' && '* Prognozy oparte na: 25% organicznym wzroście użytkowników, 80% fill rate reklam, $2-3 CPM, cenach API $1,500-2,500/mies w zależności od wolumenu. Konserwatywne szacunki zakładają niższe współczynniki konwersji i wolniejszy wzrost.'}
                  {locale === 'uk' && '* Прогнози засновані на: 25% органічному зростанні користувачів, 80% fill rate реклами, $2-3 CPM, ціни API $1,500-2,500/міс залежно від обсягу. Консервативні оцінки передбачають низьку конверсію та повільне зростання.'}
                </p>
              </div>
            </Reveal>
          </section>
        </>
      )}

      {/* FoodReceipts: Additional Enhanced Sections */}
      {isFoodReceipts && (
        <>
          {/* Growth Metrics */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '📊 Growth Metrics'}
                {locale === 'ru' && '📊 Метрики роста'}
                {locale === 'be' && '📊 Метрыкі росту'}
                {locale === 'pl' && '📊 Metryki wzrostu'}
                {locale === 'uk' && '📊 Метрики зростання'}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <AnimatedChart
                data={[
                  { label: locale === 'en' ? 'Dec' : locale === 'ru' ? 'Дек' : locale === 'be' ? 'Сне' : locale === 'pl' ? 'Gru' : 'Гру', value: 1200 },
                  { label: locale === 'en' ? 'Jan' : locale === 'ru' ? 'Янв' : locale === 'be' ? 'Сту' : locale === 'pl' ? 'Sty' : 'Січ', value: 1850 },
                  { label: locale === 'en' ? 'Feb' : locale === 'ru' ? 'Фев' : locale === 'be' ? 'Лют' : locale === 'pl' ? 'Lut' : 'Лют', value: 2400 },
                  { label: locale === 'en' ? 'Mar' : locale === 'ru' ? 'Мар' : locale === 'be' ? 'Сак' : locale === 'pl' ? 'Mar' : 'Бер', value: 3200 },
                ]}
                height={350}
              />
            </Reveal>

            <Reveal delay={0.3}>
              <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                {locale === 'en' && '🚀 35% Month-over-Month growth in active users'}
                {locale === 'ru' && '🚀 Рост активных пользователей на 35% месяц к месяцу'}
                {locale === 'be' && '🚀 Рост актыўных карыстальнікаў на 35% месяц да месяца'}
                {locale === 'pl' && '🚀 35% wzrost aktywnych użytkowników miesiąc do miesiąca'}
                {locale === 'uk' && '🚀 Зростання активних користувачів на 35% місяць до місяця'}
              </p>
            </Reveal>
          </section>

          {/* Roadmap */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '🗺️ Product Roadmap'}
                {locale === 'ru' && '🗺️ Дорожная карта'}
                {locale === 'be' && '🗺️ Дарожная карта'}
                {locale === 'pl' && '🗺️ Mapa drogowa'}
                {locale === 'uk' && '🗺️ Дорожня карта'}
              </h2>
            </Reveal>

            <Timeline
              locale={locale}
              items={[
                {
                  quarter: {
                    en: 'Q4 2024',
                    ru: 'Q4 2024',
                    be: 'Q4 2024',
                    pl: 'Q4 2024',
                    uk: 'Q4 2024',
                  },
                  title: {
                    en: 'MVP Launch & Lisek Integration',
                    ru: 'Запуск MVP и интеграция с Lisek',
                    be: 'Запуск MVP і інтэграцыя з Lisek',
                    pl: 'Uruchomienie MVP i integracja z Lisek',
                    uk: 'Запуск MVP та інтеграція з Lisek',
                  },
                  description: {
                    en: 'Basic recipe extraction, AI-powered ingredient matching, and first grocery delivery partner integration.',
                    ru: 'Базовое извлечение рецептов, AI-сопоставление ингредиентов и первая интеграция с партнером по доставке.',
                    be: 'Базавае здабыванне рэцэптаў, AI-супастаўленне інгрэдыентаў і першая інтэграцыя з партнёрам па дастаўцы.',
                    pl: 'Podstawowe wyodrębnianie przepisów, dopasowywanie składników AI i pierwsza integracja partnera dostawczego.',
                    uk: 'Базове витягування рецептів, AI-зіставлення інгредієнтів та перша інтеграція з партнером з доставки.',
                  },
                  status: 'completed',
                },
                {
                  quarter: {
                    en: 'Q1 2025',
                    ru: 'Q1 2025',
                    be: 'Q1 2025',
                    pl: 'Q1 2025',
                    uk: 'Q1 2025',
                  },
                  title: {
                    en: 'Uber Eats & Bolt Food Integration',
                    ru: 'Интеграция с Uber Eats и Bolt Food',
                    be: 'Інтэграцыя з Uber Eats і Bolt Food',
                    pl: 'Integracja Uber Eats i Bolt Food',
                    uk: 'Інтеграція з Uber Eats та Bolt Food',
                  },
                  description: {
                    en: 'Expand delivery options, add weekly menu planning, and launch social sharing features.',
                    ru: 'Расширение опций доставки, добавление планирования недельного меню и запуск функций социального обмена.',
                    be: 'Пашырэнне опцый дастаўкі, даданне планавання тыднёвага меню і запуск функцый сацыяльнага абмену.',
                    pl: 'Rozszerzenie opcji dostawy, dodanie planowania tygodniowego menu i uruchomienie funkcji udostępniania społecznościowego.',
                    uk: 'Розширення опцій доставки, додавання планування тижневого меню та запуск функцій соціального обміну.',
                  },
                  status: 'in-progress',
                },
                {
                  quarter: {
                    en: 'Q2 2025',
                    ru: 'Q2 2025',
                    be: 'Q2 2025',
                    pl: 'Q2 2025',
                    uk: 'Q2 2025',
                  },
                  title: {
                    en: 'Mobile Apps & Premium Features',
                    ru: 'Мобильные приложения и премиум-функции',
                    be: 'Мабільныя прыкладанні і прэміум-функцыі',
                    pl: 'Aplikacje mobilne i funkcje premium',
                    uk: 'Мобільні додатки та преміум-функції',
                  },
                  description: {
                    en: 'iOS & Android apps, offline recipe storage, advanced meal planning with AI recommendations.',
                    ru: 'Приложения для iOS и Android, офлайн-хранение рецептов, расширенное планирование питания с AI-рекомендациями.',
                    be: 'Прыкладанні для iOS і Android, афлайн-захаванне рэцэптаў, пашыранае планаванне харчавання з AI-рэкамендацыямі.',
                    pl: 'Aplikacje na iOS i Android, przechowywanie przepisów offline, zaawansowane planowanie posiłków z rekomendacjami AI.',
                    uk: 'Додатки для iOS та Android, офлайн-зберігання рецептів, розширене планування харчування з AI-рекомендаціями.',
                  },
                  status: 'planned',
                },
                {
                  quarter: {
                    en: 'Q3 2025',
                    ru: 'Q3 2025',
                    be: 'Q3 2025',
                    pl: 'Q3 2025',
                    uk: 'Q3 2025',
                  },
                  title: {
                    en: 'European Expansion',
                    ru: 'Европейская экспансия',
                    be: 'Еўрапейская экспансія',
                    pl: 'Ekspansja europejska',
                    uk: 'Європейська експансія',
                  },
                  description: {
                    en: 'Launch in Germany, Czech Republic, and Slovakia. Partner with local grocery delivery services.',
                    ru: 'Запуск в Германии, Чехии и Словакии. Партнерство с местными службами доставки продуктов.',
                    be: 'Запуск у Германіі, Чэхіі і Славакіі. Партнёрства з мясцовымі службамі дастаўкі прадуктаў.',
                    pl: 'Uruchomienie w Niemczech, Czechach i Słowacji. Partnerstwo z lokalnymi usługami dostawy spożywczej.',
                    uk: 'Запуск у Німеччині, Чехії та Словаччині. Партнерство з місцевими службами доставки продуктів.',
                  },
                  status: 'planned',
                },
              ]}
            />
          </section>

          {/* Financial Projections */}
          <section className={styles.enhancedSection}>
            <Reveal>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' && '💎 Financial Projections'}
                {locale === 'ru' && '💎 Финансовые прогнозы'}
                {locale === 'be' && '💎 Фінансавыя прагнозы'}
                {locale === 'pl' && '💎 Prognozy finansowe'}
                {locale === 'uk' && '💎 Фінансові прогнози'}
              </h2>
            </Reveal>

            <div className={styles.statsGrid}>
              <Reveal delay={0.1}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$800K</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Projected Revenue 2025'}
                    {locale === 'ru' && 'Прогноз выручки 2025'}
                    {locale === 'be' && 'Прагноз выручкі 2025'}
                    {locale === 'pl' && 'Prognozowane przychody 2025'}
                    {locale === 'uk' && 'Прогноз виручки 2025'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>$2.5M</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Projected Revenue 2026'}
                    {locale === 'ru' && 'Прогноз выручки 2026'}
                    {locale === 'be' && 'Прагноз выручкі 2026'}
                    {locale === 'pl' && 'Prognozowane przychody 2026'}
                    {locale === 'uk' && 'Прогноз виручки 2026'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>50K+</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Target Users by EOY 2025'}
                    {locale === 'ru' && 'Целевые пользователи к концу 2025'}
                    {locale === 'be' && 'Мэтавыя карыстальнікі да канца 2025'}
                    {locale === 'pl' && 'Docelowi użytkownicy do końca 2025'}
                    {locale === 'uk' && 'Цільові користувачі до кінця 2025'}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>18mo</div>
                  <div className={styles.statLabel}>
                    {locale === 'en' && 'Runway with $1.8M'}
                    {locale === 'ru' && 'Runway с $1.8M'}
                    {locale === 'be' && 'Runway з $1.8M'}
                    {locale === 'pl' && 'Runway z $1.8M'}
                    {locale === 'uk' && 'Runway з $1.8M'}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.5}>
              <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 20, 147, 0.3)' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-pink)', marginBottom: '20px' }}>
                  {locale === 'en' && '🎯 Use of Funds ($1.8M)'}
                  {locale === 'ru' && '🎯 Использование средств ($1.8M)'}
                  {locale === 'be' && '🎯 Выкарыстанне сродкаў ($1.8M)'}
                  {locale === 'pl' && '🎯 Wykorzystanie środków ($1.8M)'}
                  {locale === 'uk' && '🎯 Використання коштів ($1.8M)'}
                </h3>
                <ul className={styles.featureList} style={{ fontSize: '1.05rem' }}>
                  <li>💻 {locale === 'en' ? 'Product Development (40%) - $720K' : locale === 'ru' ? 'Разработка продукта (40%) - $720K' : locale === 'be' ? 'Распрацоўка прадукту (40%) - $720K' : locale === 'pl' ? 'Rozwój produktu (40%) - $720K' : 'Розробка продукту (40%) - $720K'}</li>
                  <li>📢 {locale === 'en' ? 'Marketing & User Acquisition (30%) - $540K' : locale === 'ru' ? 'Маркетинг и привлечение пользователей (30%) - $540K' : locale === 'be' ? 'Маркетынг і прыцягненне карыстальнікаў (30%) - $540K' : locale === 'pl' ? 'Marketing i pozyskiwanie użytkowników (30%) - $540K' : 'Маркетинг та залучення користувачів (30%) - $540K'}</li>
                  <li>👥 {locale === 'en' ? 'Team Expansion (20%) - $360K' : locale === 'ru' ? 'Расширение команды (20%) - $360K' : locale === 'be' ? 'Пашырэнне каманды (20%) - $360K' : locale === 'pl' ? 'Rozszerzenie zespołu (20%) - $360K' : 'Розширення команди (20%) - $360K'}</li>
                  <li>🏢 {locale === 'en' ? 'Operations & Infrastructure (10%) - $180K' : locale === 'ru' ? 'Операции и инфраструктура (10%) - $180K' : locale === 'be' ? 'Аперацыі і інфраструктура (10%) - $180K' : locale === 'pl' ? 'Operacje i infrastruktura (10%) - $180K' : 'Операції та інфраструктура (10%) - $180K'}</li>
                </ul>
              </div>
            </Reveal>
          </section>
        </>
      )}
    </div>
  );
}
