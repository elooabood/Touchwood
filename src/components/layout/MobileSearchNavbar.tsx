"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./MobileSearchNavbar.module.css";
import { getProducts } from "@/services/api";
import type { Locale, Localized, Product } from "@/types/product";

type SearchProduct = Product & {
  image?: string;
};

const getLocalizedValue = (
  value: Localized | string | undefined,
  locale: Locale,
): string => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value[locale] || value.en || value.ar || "";
};

const getProductImage = (product: SearchProduct): string => {
  const firstMedia = product?.media?.[0];

  if (!firstMedia) {
    return product?.image || "/images/placeholder-product.jpg";
  }

  return (
    firstMedia.url ||
    "/images/placeholder-product.jpg"
  );
};

function normalizeSearchProducts(response: unknown): Product[] {
  if (Array.isArray(response)) {
    return response as Product[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const data = response as {
    products?: unknown;
    data?: unknown;
  };

  if (Array.isArray(data.products)) {
    return data.products as Product[];
  }

  if (
    data.data &&
    typeof data.data === "object" &&
    !Array.isArray(data.data)
  ) {
    const nestedData = data.data as {
      products?: unknown;
    };

    if (Array.isArray(nestedData.products)) {
      return nestedData.products as Product[];
    }
  }

  if (Array.isArray(data.data)) {
    return data.data as Product[];
  }

  return [];
}

export default function MobileSearchNavbar() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const locale: Locale =
    segments[0] === "en" ? "en" : "ar";

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] =
    useState(false);

  useEffect(() => {
    const searchTerm = search.trim();

    if (!searchTerm) {
      setSearchResults([]);
      setShowSearchResults(false);
      setIsSearching(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        setShowSearchResults(true);

        const response = await getProducts({
          search: searchTerm,
          active: true,
        });

        const products = normalizeSearchProducts(response);

        setSearchResults(products);
      } catch (error) {
        console.error("Mobile search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleProductClick = () => {
    setSearch("");
    setSearchResults([]);
    setShowSearchResults(false);

    window.scrollTo(0, 0);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return (
    <div
      className={styles.searchNavbar}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onFocus={() => {
            if (search.trim()) {
              setShowSearchResults(true);
            }
          }}
          placeholder={
            locale === "ar"
              ? "ابحث عن منتج..."
              : "Search for a product..."
          }
          className={styles.searchInput}
          aria-label={
            locale === "ar"
              ? "البحث عن منتج"
              : "Search for a product"
          }
        />

        {search.trim() && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={clearSearch}
            aria-label={
              locale === "ar"
                ? "مسح البحث"
                : "Clear search"
            }
          >
            <FiX />
          </button>
        )}

        <button
          type="button"
          className={styles.searchButton}
          aria-label={
            locale === "ar" ? "بحث" : "Search"
          }
          onClick={() => {
            if (search.trim()) {
              setShowSearchResults(true);
            }
          }}
        >
          <FiSearch />
        </button>

        {showSearchResults && (
          <div className={styles.searchResults}>
            {isSearching ? (
              <div className={styles.searchMessage}>
                {locale === "ar"
                  ? "جاري البحث..."
                  : "Searching..."}
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((product) => {
                const productName = getLocalizedValue(
                  product.name,
                  locale,
                );

                const productCategory = product.category;

                const productImage = getProductImage(
                  product,
                );

                const productHref = `/${locale}/products/${product.slug}`;

                const formattedPrice = Number(
                  product.price || 0,
                ).toLocaleString(
                  locale === "ar" ? "ar-EG" : "en-US",
                );

                return (
                  <a
                    key={product._id}
                    href={productHref}
                    className={styles.searchResultItem}
                    onClick={handleProductClick}
                  >
                    <div
                      className={
                        styles.searchResultImageWrapper
                      }
                    >
                      <img
                        src={productImage}
                        alt={productName}
                        className={styles.searchResultImage}
                        loading="lazy"
                      />
                    </div>

                    <div
                      className={styles.searchResultInfo}
                    >
                      <span
                        className={styles.searchResultName}
                      >
                        {productName}
                      </span>

                      {productCategory && (
                        <span
                          className={
                            styles.searchResultCategory
                          }
                        >
                          {productCategory}
                        </span>
                      )}

                      <span
                        className={styles.searchResultPrice}
                      >
                        {formattedPrice}{" "}
                        {locale === "ar" ? "ج.م" : "EGP"}
                      </span>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className={styles.searchMessage}>
                {locale === "ar"
                  ? "لم يتم العثور على منتجات"
                  : "No products found"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}