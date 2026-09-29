"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiFileText,
  FiHeart,
  FiShield,
} from "react-icons/fi";

import styles from "./WarrantyPage.module.css";

type Locale = "ar" | "en";

const t = (locale: Locale, ar: string, en: string) =>
  locale === "ar" ? ar : en;

export default function WarrantyPage() {
  const params = useParams<{ locale?: string }>();

  const locale: Locale = params.locale === "en" ? "en" : "ar";
  const isArabic = locale === "ar";

  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <main className={styles.page} dir={isArabic ? "rtl" : "ltr"}>
      <nav
        className={styles.breadcrumb}
        aria-label={isArabic ? "مسار التنقل" : "Breadcrumb"}
      >
        <Link href={`/${locale}`}>
          {t(locale, "الرئيسية", "Home")}
        </Link>

        <span>/</span>

        <span>
          {t(locale, "الضمان", "Warranty")}
        </span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>
            WARRANTY
          </span>

          <h1>
            {t(
              locale,
              "ضمان تاتش وود",
              "Touchwood Warranty"
            )}
          </h1>

          <div className={styles.orangeLine} />

          <p>
            {t(
              locale,
              "تقدم تاتش وود ضماناً لمدة سنة واحدة تبدأ من تاريخ استلام المنتج، مع توفير خدمات الصيانة مدى الحياة وقطع الغيار لضمان استمرار منتجك بأفضل حالة ممكنة.",
              "Touchwood provides a one-year warranty starting from the date of product receipt, with lifetime maintenance services and spare parts availability to help keep your product in the best possible condition."
            )}
          </p>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="/images/warranty-hero.png"
            alt={t(
              locale,
              "أثاث مكتبي من تاتش وود",
              "Touchwood office furniture"
            )}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
          />

          <div className={styles.heroImageShade} />

          <div className={styles.shield}>
            <div className={styles.shieldInner}>
              <Image
                src="/images/logo.jpeg"
                alt="Touchwood"
                width={62}
                height={62}
              />

              <FiCheck aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <article className={styles.stat}>
          <div className={styles.statIcon}>
            <FiShield />
          </div>

          <strong>1</strong>

          <h3>
            {t(
              locale,
              "سنة ضمان",
              "Year Warranty"
            )}
          </h3>

          <p>
            {t(
              locale,
              "ضمان لمدة سنة واحدة تبدأ من تاريخ استلام المنتج.",
              "A one-year warranty starting from the date of product receipt."
            )}
          </p>
        </article>

        <article className={styles.stat}>
          <div className={styles.statIcon}>
            <FiHeart />
          </div>

          <strong className={styles.qualityText}>
            {t(locale, "مدة", "LIFETIME")}
          </strong>

          <h3>
            {t(
              locale,
              "الصيانة",
              "Maintenance"
            )}
          </h3>

          <p>
            {t(
              locale,
              "خدمات الصيانة متاحة لعملائنا مدى الحياة.",
              "Maintenance services are available for our customers for a lifetime."
            )}
          </p>
        </article>

        <article className={styles.stat}>
          <div className={styles.statIcon}>
            <FiFileText />
          </div>

          <strong className={styles.dateText}>
            {t(locale, "من تاريخ", "FROM")}
          </strong>

          <h3>
            {t(
              locale,
              "استلام المنتج",
              "Product Receipt"
            )}
          </h3>

          <p>
            {t(
              locale,
              "يبدأ سريان الضمان من تاريخ استلام المنتج.",
              "The warranty starts from the date of product receipt."
            )}
          </p>
        </article>

        <article className={styles.stat}>
          <div className={styles.statIcon}>
            <FiCheck />
          </div>

          <strong className={styles.qualityText}>
            {t(locale, "متاحة", "AVAILABLE")}
          </strong>

          <h3>
            {t(
              locale,
              "قطع الغيار",
              "Spare Parts"
            )}
          </h3>

          <p>
            {t(
              locale,
              "نوفر قطع الغيار للحفاظ على منتجاتك واستمرار استخدامها.",
              "Spare parts are available to help maintain your products and extend their use."
            )}
          </p>
        </article>
      </section>

      <section className={styles.details}>
        <div className={styles.detailsText}>
          <span className={styles.sectionLabel}>
            {t(locale, "تفاصيل الضمان", "WARRANTY DETAILS")}
          </span>

          <h2>
            {t(
              locale,
              "راحة بالك .. هي أولويتنا",
              "Your peace of mind comes first"
            )}
          </h2>

          <div className={styles.smallLine} />

          <p className={styles.detailsParagraph}>
            {t(
              locale,
              "نؤمن في تاتش وود بجودة منتجاتنا، لذلك نقدم لك ضماناً لمدة سنة واحدة تبدأ من تاريخ استلام المنتج، مع توفير خدمات الصيانة مدى الحياة وقطع الغيار لمساعدتك في الحفاظ على منتجك والاستفادة منه لأطول فترة ممكنة.",
              "At Touchwood, we believe in the quality of our products. That is why we provide a one-year warranty starting from the date of product receipt, along with lifetime maintenance services and spare parts availability to help you maintain your product and enjoy it for as long as possible."
            )}
          </p>

          <div className={styles.checkList}>
            <div>
              <span>
                <FiCheck />
              </span>

              <p>
                {t(
                  locale,
                  "ضمان لمدة سنة واحدة من تاريخ استلام المنتج.",
                  "One-year warranty from the date of product receipt."
                )}
              </p>
            </div>

            <div>
              <span>
                <FiCheck />
              </span>

              <p>
                {t(
                  locale,
                  "خدمات الصيانة متاحة مدى الحياة.",
                  "Lifetime maintenance services are available."
                )}
              </p>
            </div>

            <div>
              <span>
                <FiCheck />
              </span>

              <p>
                {t(
                  locale,
                  "قطع الغيار متاحة للحفاظ على منتجاتك.",
                  "Spare parts are available to maintain your products."
                )}
              </p>
            </div>
          </div>

          <Link
            href={`/${locale}/contact`}
            className={styles.contactButton}
          >
            <span>
              {t(locale, "تواصل معنا", "Contact Us")}
            </span>

            <ArrowIcon />
          </Link>
        </div>

        
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaDecoration} />

        <div className={styles.ctaLogo}>
          <Image
            src="/images/logo.jpeg"
            alt="Touchwood"
            width={105}
            height={105}
          />
        </div>

        <div className={styles.ctaContent}>
          <span>TOUCHWOOD</span>

          <h2>
            {t(
              locale,
              "اختيارك الذكي لمكان أفضل",
              "The smart choice for a better space"
            )}
          </h2>

          <p>
            {t(
              locale,
              "اكتشف مجموعتنا من الأثاث المكتبي المصمم ليومك.",
              "Explore our office furniture collection designed for your everyday life."
            )}
          </p>

          <div className={styles.ctaLine} />

          <a
            href={`/${locale}/shop`}
            className={styles.productsButton}
          >
            <span>
              {t(locale, "تصفح المنتجات", "Browse Products")}
            </span>

            <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  );
}