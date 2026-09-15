import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../constants/routes";
import type { Product } from "../data/products";
import AddToCartButton from "./AddToCartButton";
import LikeButton from "./LikeButton";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  const isPurchasable = ["Đặc sản", "Ẩm thực", "Quà tặng"].includes(product.category);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
        />
      </div>
      <div className="product-content">
        <span className="category-pill">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <strong>{product.price}</strong>
        <div className="product-actions">
          <Link className="detail-link" href={ROUTES.detail(product.id)}>
            {isPurchasable ? "Xem sản phẩm" : "Xem chi tiết"}
          </Link>
          {isPurchasable && <AddToCartButton product={product} />}
          <LikeButton initialLikes={product.likes} />
        </div>
      </div>
    </article>
  );
}
