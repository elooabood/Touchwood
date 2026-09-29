"use client";

import { addToCart } from "@/lib/localStore";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  FiHeart,
  FiShoppingCart,
  FiShuffle,
  FiStar,
  FiCheck,
} from "react-icons/fi";

import styles from "./ProductCard.module.css";

import {
  getDemoProductReviews,
  getProductReviews,
} from "@/services/api";

import type { Product, Localized } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

type Review = {
  rating?: number;
};

type DemoReview = {
  _id?: string;
  rating?: number;
  isDemo?: boolean;
};

const categories: Record<string, Localized> = {
  "computer-desks": {
    ar: "مكاتب وطاولات كمبيوتر",
    en: "Computer Desks",
  },

  chairs: {
    ar: "كراسي",
    en: "Chairs",
  },

  "office-sofas": {
    ar: "انتريهات مكتبية",
    en: "Office Sofas",
  },

  "work-cells": {
    ar: "خلايا العمل",
    en: "Work Cells",
  },

  "reception-counters": {
    ar: "كاونتر استقبال",
    en: "Reception Counters",
  },

  "meeting-tables": {
    ar: "ترابيزات اجتماعات",
    en: "Meeting Tables",
  },

  "office-accessories": {
    ar: "إكسسوارات الأثاث المكتبي",
    en: "Office Accessories",
  },
};

const WISHLIST_KEY = "touchwood_wishlist";
const COMPARE_KEY = "touchwood_compare";

type MessageType =
  | "cart"
  | "favorite"
  | "compare"
  | "";

function getStoredIds(key: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.map(String)
      : [];
  } catch {
    return [];
  }
}

function saveStoredIds(
  key: string,
  ids: string[]
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify(ids)
  );

  window.dispatchEvent(
    new CustomEvent(
      "touchwood-local-list-change",
      {
        detail: {
          key,
          ids,
        },
      }
    )
  );
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const pathname = usePathname();

  const segments =
    pathname?.split("/").filter(Boolean) || [];

  const locale =
    segments[0] === "en" ? "en" : "ar";

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [isCompared, setIsCompared] =
    useState(false);

  const [realReviews, setRealReviews] =
    useState<Review[]>([]);

  const [demoReviews, setDemoReviews] =
    useState<DemoReview[]>([]);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<MessageType>("");

  /*
   * مهم جداً:
   *
   * الـ Portal يجعل رسالة الإشعار خارج:
   *
   * Swiper
   * SwiperSlide
   * featured-products__container
   *
   * وبالتالي لن تتأثر بالـ transform
   * أو overflow:hidden الموجود في القسم.
   */
  const [portalReady, setPortalReady] =
    useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  /*
   * قراءة المفضلة والمقارنة
   */
  useEffect(() => {
    setIsFavorite(
      getStoredIds(WISHLIST_KEY).includes(
        product._id
      )
    );

    setIsCompared(
      getStoredIds(COMPARE_KEY).includes(
        product._id
      )
    );

    const handleLocalListChange = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          key: string;
          ids: string[];
        }>;

      if (
        customEvent.detail?.key ===
        WISHLIST_KEY
      ) {
        setIsFavorite(
          customEvent.detail.ids.includes(
            product._id
          )
        );
      }

      if (
        customEvent.detail?.key ===
        COMPARE_KEY
      ) {
        setIsCompared(
          customEvent.detail.ids.includes(
            product._id
          )
        );
      }
    };

    window.addEventListener(
      "touchwood-local-list-change",
      handleLocalListChange
    );

    return () => {
      window.removeEventListener(
        "touchwood-local-list-change",
        handleLocalListChange
      );
    };
  }, [product._id]);

  /*
   * إخفاء الإشعار تلقائياً
   *
   * مدة الإشعار 3 ثوانٍ.
   */
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId =
      window.setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message]);

  /*
   * تحميل التقييمات
   */
  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      const [
        realResult,
        demoResult,
      ] = await Promise.allSettled([
        getProductReviews(product._id),
        getDemoProductReviews(product._id),
      ]);

      if (!isMounted) {
        return;
      }

      const realReviewsData =
        realResult.status === "fulfilled" &&
        Array.isArray(realResult.value)
          ? realResult.value
          : [];

      const demoReviewsData =
        demoResult.status === "fulfilled" &&
        Array.isArray(demoResult.value)
          ? demoResult.value
          : [];

      setRealReviews(realReviewsData);

      setDemoReviews(
        demoReviewsData.filter(
          (review: DemoReview) =>
            review?.isDemo === true
        )
      );
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [product._id]);

  /*
   * اسم المنتج
   */
  const productName =
    product.name?.[locale] ||
    product.name?.ar ||
    product.name?.en ||
    "منتج";

  /*
   * التصنيف
   */
  const category =
    categories[product.category];

  const categoryName =
    category?.[locale] ||
    category?.ar ||
    product.category;

  /*
   * رابط المنتج
   */
  const productHref =
    `/${locale}/products/${product.slug}`;

  /*
   * الصورة الرئيسية
   */
  const primaryImage = useMemo(() => {
    return (
      product.media?.find(
        (item) => item.isPrimary
      ) ||
      product.media?.find(
        (item) => item.type === "image"
      ) ||
      product.media?.[0]
    );
  }, [product.media]);

  /*
   * التقييمات الحقيقية
   */
  const validRealRatings =
    realReviews
      .map((review) =>
        Number(review.rating)
      )
      .filter(
        (value) =>
          Number.isFinite(value) &&
          value >= 1 &&
          value <= 5
      );

  /*
   * التقييمات التجريبية
   */
  const validDemoRatings =
    demoReviews
      .map((review) =>
        Number(review.rating)
      )
      .filter(
        (value) =>
          Number.isFinite(value) &&
          value >= 1 &&
          value <= 5
      );

  const realReviewsCount =
    validRealRatings.length;

  const demoReviewsCount =
    validDemoRatings.length;

  const reviewsCount =
    realReviewsCount +
    demoReviewsCount;

  const totalRating =
    validRealRatings.reduce(
      (sum, value) => sum + value,
      0
    ) +
    validDemoRatings.reduce(
      (sum, value) => sum + value,
      0
    );

  const rating =
    reviewsCount > 0
      ? totalRating / reviewsCount
      : 0;

  /*
   * الأسعار
   */
  const oldPrice =
    Number(product.oldPrice) || 0;

  const currentPrice =
    Number(product.price) || 0;

  const discount =
    oldPrice > currentPrice
      ? Math.round(
          ((oldPrice - currentPrice) /
            oldPrice) *
            100
        )
      : 0;

  const formattedPrice =
    currentPrice.toLocaleString(
      locale === "ar"
        ? "ar-EG"
        : "en-US"
    );

  const formattedOldPrice =
    oldPrice > currentPrice
      ? oldPrice.toLocaleString(
          locale === "ar"
            ? "ar-EG"
            : "en-US"
        )
      : null;

  /*
   * المفضلة
   */
  const toggleWishlist = () => {
    const current =
      getStoredIds(WISHLIST_KEY);

    const next = current.includes(
      product._id
    )
      ? current.filter(
          (id) => id !== product._id
        )
      : [
          ...current,
          product._id,
        ];

    saveStoredIds(
      WISHLIST_KEY,
      next
    );

    const added =
      next.includes(product._id);

    setIsFavorite(added);

    setMessageType("favorite");

    setMessage(
      added
        ? locale === "ar"
          ? "تمت إضافة المنتج إلى المفضلة"
          : "Product added to wishlist"
        : locale === "ar"
          ? "تمت إزالة المنتج من المفضلة"
          : "Product removed from wishlist"
    );
  };

  /*
   * المقارنة
   */
  const MAX_COMPARE_PRODUCTS = 4;

const toggleCompare = () => {
  const current = getStoredIds(COMPARE_KEY);

  // إذا كان المنتج موجودًا بالفعل → إزالته
  if (current.includes(product._id)) {
    const next = current.filter(
      (id) => id !== product._id
    );

    saveStoredIds(COMPARE_KEY, next);

    setIsCompared(false);
    setMessageType("compare");

    setMessage(
      locale === "ar"
        ? "تمت إزالة المنتج من المقارنة"
        : "Product removed from compare"
    );

    return;
  }

  // منع إضافة المنتج الخامس
  if (current.length >= MAX_COMPARE_PRODUCTS) {
    setIsCompared(false);
    setMessageType("compare");

    setMessage(
      locale === "ar"
        ? "يمكنك مقارنة 4 منتجات فقط"
        : "You can compare up to 4 products only"
    );

    return;
  }

  // إضافة المنتج
  const next = [
    ...current,
    product._id,
  ];

  saveStoredIds(COMPARE_KEY, next);

  setIsCompared(true);
  setMessageType("compare");

  setMessage(
    locale === "ar"
      ? "تمت إضافة المنتج إلى المقارنة"
      : "Product added to compare"
  );
};

  /*
   * إضافة إلى السلة
   */
  const handleAddToCart = () => {
    addToCart(
      product,
      1,
      null
    );

    setMessageType("cart");

    setMessage(
      locale === "ar"
        ? "تمت إضافة المنتج إلى السلة"
        : "Product added to cart"
    );
  };

  /*
   * رسالة الإشعار
   *
   * يتم إخراجها إلى document.body
   * باستخدام Portal.
   */
  const messagePortal =
    portalReady &&
    message &&
    typeof document !== "undefined"
      ? createPortal(
          <p
            className={`${styles.message} ${
              messageType === "cart"
                ? styles.messageCart
                : messageType ===
                    "favorite"
                  ? styles.messageFavorite
                  : styles.messageCompare
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>,
          document.body
        )
      : null;

  return (
    <>
      {messagePortal}

      <article
        className={styles.card}
      >
        <div
          className={
            styles.imageContainer
          }
        >
          {discount > 0 && (
            <div
              className={
                styles.discountBadge
              }
            >
              {discount}%-
            </div>
          )}

          <div
            className={
              styles.topActions
            }
          >
            <button
              type="button"
              className={`${styles.actionButton} ${
                isFavorite
                  ? styles.actionActive
                  : ""
              }`}
              onClick={
                toggleWishlist
              }
              aria-label={
                locale === "ar"
                  ? "إضافة إلى المفضلة"
                  : "Add to wishlist"
              }
              aria-pressed={
                isFavorite
              }
            >
              <FiHeart
                className={
                  isFavorite
                    ? styles.filledIcon
                    : ""
                }
              />
            </button>

            <button
              type="button"
              className={`${styles.actionButton} ${
                isCompared
                  ? styles.actionActive
                  : ""
              }`}
              onClick={
                toggleCompare
              }
              aria-label={
                locale === "ar"
                  ? "إضافة إلى المقارنة"
                  : "Add to compare"
              }
              aria-pressed={
                isCompared
              }
            >
              {isCompared ? (
                <FiCheck />
              ) : (
                <FiShuffle />
              )}
            </button>
          </div>

          <a
            href={productHref}
            className={
              styles.imageLink
            }
            onClick={(event) => {
              event.preventDefault();

              window.location.assign(
                productHref
              );
            }}
          >
            {primaryImage?.url ? (
              <img
                src={primaryImage.url}
                alt={
                  primaryImage.alt?.[
                    locale
                  ] ||
                  productName
                }
                className={
                  styles.image
                }
              />
            ) : (
              <div
                className={
                  styles.noImage
                }
              >
                <span>
                  {locale === "ar"
                    ? "لا توجد صورة"
                    : "No image"}
                </span>
              </div>
            )}
          </a>
        </div>

        <div
          className={styles.content}
        >
          <a
            href={`/${locale}/category/${product.category}`}
            className={
              styles.category
            }
          >
            {categoryName}
          </a>

          <a
            href={productHref}
            className={
              styles.productName
            }
            title={productName}
          >
            {productName}
          </a>

          <div
            className={styles.rating}
          >
            <div
              className={styles.stars}
            >
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <FiStar
                    key={star}
                    className={
                      star <=
                      Math.round(
                        rating
                      )
                        ? styles.starActive
                        : styles.starInactive
                    }
                  />
                )
              )}
            </div>

            <span
              className={
                styles.ratingValue
              }
            >
              {rating.toFixed(1)}
            </span>

            <span
              className={
                styles.reviewsCount
              }
            >
              ({reviewsCount})
            </span>
          </div>

          <div
            className={styles.prices}
          >
            <span
              className={
                styles.currentPrice
              }
            >
              {formattedPrice}{" "}
              {locale === "ar"
                ? "ج.م"
                : "EGP"}
            </span>

            {formattedOldPrice && (
              <span
                className={
                  styles.oldPrice
                }
              >
                {formattedOldPrice}{" "}
                {locale === "ar"
                  ? "ج.م"
                  : "EGP"}
              </span>
            )}
          </div>

          <button
            type="button"
            className={
              styles.cartButton
            }
            onClick={
              handleAddToCart
            }
          >
            <FiShoppingCart />

            <span>
              {locale === "ar"
                ? "إضافة إلى السلة"
                : "Add to cart"}
            </span>
          </button>
        </div>
      </article>
    </>
  );
}