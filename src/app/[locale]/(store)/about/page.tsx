"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiHome,
  FiShield,
} from "react-icons/fi";

import styles from "./AboutPage.module.css";

type Locale = "ar" | "en";

const t = (locale: Locale, ar: string, en: string) =>
  locale === "ar" ? ar : en;

export default function AboutPage() {
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
          {t(locale, "من نحن", "About Us")}
        </span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <div className={styles.heroVisualMain}>
            <div className={styles.heroPattern} />

            <div className={styles.heroLogoWrap}>
              <Image
                src="/images/logo.jpeg"
                alt="Touchwood"
                width={380}
                height={380}
                priority
                className={styles.heroLogo}
              />
            </div>

            <div className={styles.heroBadge}>
              <span>TOUCHWOOD</span>
              <small>
                {t(
                  locale,
                  "الأثاث الذي يصنع الفرق",
                  "Furniture that makes a difference"
                )}
              </small>
            </div>
          </div>

         
        </div>

        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            {t(locale, "من نحن", "ABOUT TOUCHWOOD")}
          </span>

          <h1>
            {t(
              locale,
              "مساحتك تستحق أثاثًا يشبهها.",
              "Your space deserves furniture that feels like you."
            )}
          </h1>

          <p>
            {t(
              locale,
              "في Touchwood نقدم أثاثاً مكتبياً يجمع بين التصميم العملي، التفاصيل الجميلة، والجودة التي تجعل القطعة جزءًا حقيقيًا من منزلك.",
              "At Touchwood, we bring together practical design, beautiful details and lasting quality to create furniture that truly belongs in your home."
            )}
          </p>

          <div className={styles.heroFooter}>
            <Link href={`/${locale}/shop`} className={styles.primaryButton}>
              <span>
                {t(locale, "اكتشف منتجاتنا", "Explore Products")}
              </span>
              <ArrowIcon aria-hidden="true" />
            </Link>

            <div className={styles.heroTrust}>
              <span className={styles.heroTrustIcon}>
                <FiCheck aria-hidden="true" />
              </span>

              <span>
                {t(
                  locale,
                  "تصميم • جودة • راحة",
                  "Design • Quality • Comfort"
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.sectionIndex}>
          
        </div>

        <div className={styles.storyContent}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>
              {t(locale, "قصتنا", "OUR STORY")}
            </span>

            <h2>
              {t(
                locale,
                "نؤمن أن الأثاث ليس مجرد قطعة.",
                "We believe furniture is more than a piece."
              )}
            </h2>
          </div>

          <div className={styles.storyGrid}>
            <p>
              {t(
                locale,
                "كل قطعة أثاث مكتبي تدخل منزلك تصبح جزءًا من يومك. لهذا نهتم بأن تكون القطعة جميلة في شكلها، عملية في استخدامها، ومريحة في حضورها.",
                "Every piece of furniture becomes part of your everyday life. That is why we care about making every piece beautiful, practical and comfortable."
              )}
            </p>

            <p>
              {t(
                locale,
                "هدفنا هو أن نمنحك اختيارات تساعدك على بناء مساحة تحمل طابعك الخاص وتعيش معك لفترة طويلة.",
                "Our goal is to give you choices that help create a space with your own character — a space made to last."
              )}
            </p>
          </div>
        </div>
      </section>
<section className={styles.customSection}>
  <div className={styles.customVisual}>
    <div className={styles.customGrid} />

    <div className={styles.customCard}>
      <span className={styles.customCardNumber}>01</span>

      <div className={styles.customCardIcon}>
        <FiHome aria-hidden="true" />
      </div>

      <strong>
        {t(
          locale,
          "تصميم حسب طلبك",
          "Designed for you"
        )}
      </strong>

      <span>
        {t(
          locale,
          "من الفكرة إلى التنفيذ",
          "From idea to execution"
        )}
      </span>
    </div>

    <div className={styles.customAccent} />
  </div>

  <div className={styles.customContent}>
    <span className={styles.eyebrow}>
      {t(locale, "نصنع حسب طلبك", "MADE TO ORDER")}
    </span>

    <h2>
      {t(
        locale,
        "Touchwood مصنع يصنع لك التصميم الذي يناسبك.",
        "Touchwood is a manufacturer that creates furniture designed around you."
      )}
    </h2>

    <p>
      {t(
        locale,
        "لا نكتفي بتقديم تصميمات جاهزة. في Touchwood نمتلك القدرة على تصنيع قطع أثاث حسب طلب العميل، لنمنحك حرية اختيار التصميم والمقاسات والتفاصيل بما يتناسب مع مساحتك واحتياجاتك.",
        "We do more than offer ready-made designs. At Touchwood, we manufacture furniture according to your requirements, giving you the freedom to choose the design, dimensions and details that fit your space and needs."
      )}
    </p>

    <div className={styles.customFeatures}>
      <div>
        <span>01</span>
        <strong>
          {t(locale, "تصميم مخصص", "Custom Design")}
        </strong>
      </div>

      <div>
        <span>02</span>
        <strong>
          {t(locale, "مقاسات حسب المساحة", "Made to Measure")}
        </strong>
      </div>

      <div>
        <span>03</span>
        <strong>
          {t(locale, "تنفيذ حسب الطلب", "Made to Order")}
        </strong>
      </div>
    </div>
  </div>
</section>
      <section className={styles.statement}>
        <div className={styles.statementDecor}>
          <span />
          <span />
        </div>

        <div className={styles.statementLogo}>
          <Image
            src="/images/logo.jpeg"
            alt=""
            width={180}
            height={180}
            className={styles.statementLogoImage}
          />
        </div>

        <div className={styles.statementContent}>
          <span className={styles.statementEyebrow}>
            {t(locale, "لماذا Touchwood؟", "WHY TOUCHWOOD?")}
          </span>

          <h2>
            {t(
              locale,
              "لأن التفاصيل هي التي تجعل المكان مكانك.",
              "Because details are what make a space yours."
            )}
          </h2>

          <p>
            {t(
              locale,
              "نختار التصميمات بعناية ونضع تجربة الاستخدام في المقدمة، لنقدم لك أثاثًا يناسب الحياة اليومية وليس مجرد صورة جميلة.",
              "We carefully select our designs and put everyday experience first, creating furniture that works for real life — not just for a beautiful picture."
            )}
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.valuesTop}>
          <div className={styles.sectionIndex}>
         
          </div>

          <div className={styles.valuesHeading}>
            <span className={styles.eyebrow}>
              {t(locale, "قيمنا", "OUR VALUES")}
            </span>

            <h2>
              {t(
                locale,
                "ما نهتم به في كل قطعة.",
                "What matters in every piece."
              )}
            </h2>
          </div>
        </div>

        <div className={styles.valuesGrid}>
          <article className={styles.valueCard}>
            <div className={styles.valueTop}>
              <span className={styles.valueIcon}>
                <FiHome aria-hidden="true" />
              </span>

            </div>

            <div className={styles.valueBody}>
              <h3>
                {t(locale, "تصميم عملي", "Practical Design")}
              </h3>

              <p>
                {t(
                  locale,
                  "تصميمات جميلة ومناسبة للاستخدام اليومي.",
                  "Beautiful designs made for everyday living."
                )}
              </p>
            </div>
          </article>

          <article className={styles.valueCard}>
            <div className={styles.valueTop}>
              <span className={styles.valueIcon}>
                <FiShield aria-hidden="true" />
              </span>

            </div>

            <div className={styles.valueBody}>
              <h3>
                {t(locale, "جودة نهتم بها", "Quality First")}
              </h3>

              <p>
                {t(
                  locale,
                  "نركز على التفاصيل التي تجعل القطعة تستحق مكانها في منزلك.",
                  "We focus on details that make every piece worth its place in your home."
                )}
              </p>
            </div>
          </article>

          <article className={styles.valueCard}>
            <div className={styles.valueTop}>
              <span className={styles.valueIcon}>
                <FiHeart aria-hidden="true" />
              </span>

            </div>

            <div className={styles.valueBody}>
              <h3>
                {t(locale, "اختيار بعناية", "Carefully Selected")}
              </h3>

              <p>
                {t(
                  locale,
                  "نختار منتجاتنا بعناية لتناسب مختلف الأذواق والمساحات.",
                  "Our products are carefully selected for different styles and spaces."
                )}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.vision}>
        <div className={styles.visionNumber}>
        </div>

        <div className={styles.visionContent}>
          <span className={styles.eyebrow}>
            {t(locale, "رؤيتنا", "OUR VISION")}
          </span>

          <h2>
            {t(
              locale,
              "أن نصنع مساحات أجمل للحياة.",
              "Creating better spaces for living."
            )}
          </h2>

          <p>
            {t(
              locale,
              "نريد أن تكون Touchwood وجهتك لاختيار الأثاث الذي يجمع بين الشكل الجميل والاستخدام الحقيقي، مع تجربة بسيطة وواضحة من البداية إلى النهاية.",
              "We want Touchwood to be your destination for furniture that combines beautiful design with real functionality, supported by a simple and clear experience from start to finish."
            )}
          </p>
        </div>

        <div className={styles.visionLine} />
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaBrand}>
          <Image
            src="/images/logo.jpeg"
            alt=""
            width={82}
            height={82}
            className={styles.ctaLogo}
          />
        </div>

        <div className={styles.ctaContent}>
          <span>
            {t(locale, "اكتشف Touchwood", "DISCOVER TOUCHWOOD")}
          </span>

          <h2>
            {t(
              locale,
              "جاهز لتجعل مساحتك تشبهك؟",
              "Ready to make your space feel like you?"
            )}
          </h2>
        </div>

        <Link href={`/${locale}/shop`} className={styles.ctaButton}>
          <span>
            {t(locale, "تصفح المنتجات", "Browse Products")}
          </span>

          <ArrowIcon aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}