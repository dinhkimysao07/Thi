"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { API_ROUTES, ROUTES } from "../constants/routes";
import type { Product } from "../data/products";
import AddToCartButton from "./AddToCartButton";
import LikeButton from "./LikeButton";

type RelatedProductsProps = {
  currentProductId: string;
};

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string;
};

type ProductAction =
  | { type: "loading" }
  | { type: "success"; payload: Product[] }
  | { type: "error"; payload: string };

const RelatedProductsContext = createContext({
  limit: 3,
});

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
};

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "success":
      return { products: action.payload, loading: false, error: "" };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [state, dispatch] = useReducer(productReducer, initialState);
  const isMounted = useRef(false);
  const { limit } = useContext(RelatedProductsContext);

  const fetchRelatedProducts = useCallback(async () => {
    dispatch({ type: "loading" });

    const response = await fetch(API_ROUTES.relatedProducts(currentProductId));

    if (!response.ok) {
      throw new Error("Không thể lấy danh sách sản phẩm");
    }

    const data: Product[] = await response.json();

    if (isMounted.current) {
      dispatch({ type: "success", payload: data });
    }
  }, [currentProductId]);

  useEffect(() => {
    isMounted.current = true;

    fetchRelatedProducts().catch((error) => {
      if (isMounted.current) {
        dispatch({ type: "error", payload: error.message });
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [fetchRelatedProducts]);

  const categories = useMemo(() => {
    const productCategories = state.products.map((product) => product.category);
    return ["Tất cả", ...Array.from(new Set(productCategories))];
  }, [state.products]);

  const relatedProducts = useMemo(() => {
    const filteredProducts =
      selectedCategory === "Tất cả"
        ? state.products
        : state.products.filter((product) => product.category === selectedCategory);

    return filteredProducts.slice(0, limit);
  }, [limit, selectedCategory, state.products]);

  if (state.loading) {
    return <p className="form-message">Đang tải sản phẩm liên quan...</p>;
  }

  if (state.error) {
    return <p className="form-error">{state.error}</p>;
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products" aria-labelledby="related-products-title">
      <div className="section-heading">
        <p className="eyebrow">Sản phẩm liên quan</p>
        <h2 id="related-products-title">Có thể bạn cũng thích</h2>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <button
            className={
              selectedCategory === category
                ? "category-filter category-filter-active"
                : "category-filter"
            }
            key={category}
            onClick={() => setSelectedCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {relatedProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
            <div className="product-content">
              {(() => {
                const isPurchasable = ["Đặc sản", "Ẩm thực", "Quà tặng"].includes(
                  product.category
                );

                return (
                  <>
              <span className="category-pill">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.shortDescription}</p>
              <strong>{product.price}</strong>
              <div className="product-actions">
                <Link className="detail-link" href={ROUTES.detail(product.id)}>
                  Xem chi tiết
                </Link>
                {isPurchasable && <AddToCartButton product={product} />}
                <LikeButton initialLikes={product.likes} />
              </div>
                  </>
                );
              })()}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
